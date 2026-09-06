# Tutorial: Building a Single-Button Webservice-Ping App with a Config Screen

This walks through building the `SingleButtonApp` project from nothing —
one button, an unlabeled elapsed-time timer, success/failure feedback for a
webservice call, local persistence of the last success time, and a settings
screen to edit the configurable values. No XML layouts, no third-party
libraries — just the Android SDK.

## What you're building

- A button that calls a URL.
- A timer with no caption, showing `HH:MM:SS` since the last successful call.
- Text that says "Success" or "Failed" after each call.
- The last-success time is saved to disk, so the timer survives an app restart.
- A second screen where the button label, URL, and timer refresh rate can be
  edited and saved.

## Prerequisites

- Android Studio (Giraffe or later).
- Basic familiarity with Kotlin.
- A device or emulator running API 24+.

## Step 1 — Create the project

In Android Studio: **New Project → Empty Views Activity**. Language: Kotlin.
Minimum SDK: API 24. This scaffolds `MainActivity.kt`, a manifest, and
`res/layout/activity_main.xml`.

You can delete `activity_main.xml` — this tutorial builds the UI in code
instead of XML, which keeps everything in one file and easier to follow when
the UI is this small. Either approach works; XML layouts are usually better
once a screen has more than a handful of views.

## Step 2 — Add the INTERNET permission

Any network call needs this in `AndroidManifest.xml`, inside `<manifest>` but
outside `<application>`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

Without it, every network call fails with a `SecurityException`, and it's an
easy thing to forget until you're debugging a mysterious crash.

## Step 3 — Decide what's configurable

Four things vary between "hardcoded constant" and "user-editable setting":

1. Button label
2. Webservice URL
3. Timer tick interval (how often the display refreshes)
4. Last-success timestamp (this one is *data*, not a setting — it's written
   automatically, not typed in by the user)

Putting the first three behind getter functions instead of `const val` from
the start makes it trivial to add a settings screen later — the rest of the
app doesn't care whether a value came from a hardcoded default or something
the user typed in.

## Step 4 — Build the config layer

Create `Config.kt`. It owns the defaults, the `SharedPreferences` keys, and
the read/write logic — nothing else in the app touches `SharedPreferences`
directly for these values.

```kotlin
object Config {
    const val DEFAULT_BUTTON_LABEL = "Ping"
    const val DEFAULT_WEBSERVICE_URL = "https://example.com/api/ping"
    const val DEFAULT_TIMER_TICK_INTERVAL_MS = 1000L

    const val PREFS_NAME = "single_button_app_prefs"

    private const val KEY_BUTTON_LABEL = "cfg_button_label"
    private const val KEY_WEBSERVICE_URL = "cfg_webservice_url"
    private const val KEY_TIMER_TICK_INTERVAL_MS = "cfg_timer_tick_interval_ms"
    const val PREFS_KEY_LAST_SUCCESS_MILLIS = "last_success_millis"

    private fun prefs(context: Context) =
        context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)

    fun getButtonLabel(context: Context): String =
        prefs(context).getString(KEY_BUTTON_LABEL, DEFAULT_BUTTON_LABEL) ?: DEFAULT_BUTTON_LABEL

    fun getWebserviceUrl(context: Context): String =
        prefs(context).getString(KEY_WEBSERVICE_URL, DEFAULT_WEBSERVICE_URL) ?: DEFAULT_WEBSERVICE_URL

    fun getTimerTickIntervalMs(context: Context): Long =
        prefs(context).getLong(KEY_TIMER_TICK_INTERVAL_MS, DEFAULT_TIMER_TICK_INTERVAL_MS)

    fun save(context: Context, buttonLabel: String, webserviceUrl: String, tickIntervalMs: Long) {
        prefs(context).edit()
            .putString(KEY_BUTTON_LABEL, buttonLabel)
            .putString(KEY_WEBSERVICE_URL, webserviceUrl)
            .putLong(KEY_TIMER_TICK_INTERVAL_MS, tickIntervalMs)
            .apply()
    }
}
```

`SharedPreferences` is Android's built-in key-value store for small amounts
of persistent data — perfect for a handful of settings and a timestamp. It's
not for large data or anything sensitive (it's plain text on disk unless you
add encryption yourself).

## Step 5 — Build the main screen

In `MainActivity.onCreate`, build the view tree by hand instead of inflating
XML:

```kotlin
val root = LinearLayout(this).apply {
    orientation = LinearLayout.VERTICAL
    gravity = Gravity.CENTER
    setPadding(64, 64, 64, 64)
}

val button = Button(this)
val timerTextView = TextView(this).apply { textSize = 32f }
val statusTextView = TextView(this).apply { textSize = 18f }
val settingsButton = Button(this).apply { text = "Settings" }

root.addView(button)
root.addView(timerTextView)
root.addView(statusTextView)
root.addView(settingsButton)
setContentView(root)
```

Note the timer `TextView` has no sibling label describing what it measures —
that's a deliberate design choice carried over from the spec, not an
oversight.

## Step 6 — Wire up the timer

Use a `Handler` loop that reschedules itself every tick:

```kotlin
private val handler = Handler(Looper.getMainLooper())
private var tickIntervalMs = Config.DEFAULT_TIMER_TICK_INTERVAL_MS

private val tickRunnable = object : Runnable {
    override fun run() {
        updateTimerDisplay()
        handler.postDelayed(this, tickIntervalMs)
    }
}
```

Start it in `onResume()` and stop it in `onPause()` — this avoids updating a
UI that's not visible, which wastes battery and can cause crashes if the
Activity is destroyed while a callback is still queued.

```kotlin
override fun onResume() {
    super.onResume()
    tickIntervalMs = Config.getTimerTickIntervalMs(this)
    updateTimerDisplay()
    handler.post(tickRunnable)
}

override fun onPause() {
    super.onPause()
    handler.removeCallbacks(tickRunnable)
}
```

`updateTimerDisplay()` reads the persisted timestamp and formats the delta:

```kotlin
private fun updateTimerDisplay() {
    val lastSuccess = prefs.getLong(Config.PREFS_KEY_LAST_SUCCESS_MILLIS, -1L)
    if (lastSuccess < 0) {
        timerTextView.text = "--:--:--"
        return
    }
    val elapsedSeconds = (System.currentTimeMillis() - lastSuccess) / 1000
    val hours = elapsedSeconds / 3600
    val minutes = (elapsedSeconds % 3600) / 60
    val seconds = elapsedSeconds % 60
    timerTextView.text = String.format(Locale.getDefault(), "%02d:%02d:%02d", hours, minutes, seconds)
}
```

## Step 7 — Call the webservice off the main thread

Android will crash the app (`NetworkOnMainThreadException`) if you make a
network call on the UI thread. A single-thread `ExecutorService` is enough
for an app that only ever has one call in flight:

```kotlin
private val executor = Executors.newSingleThreadExecutor()

private fun invokeWebservice() {
    statusTextView.text = "Calling..."
    val url = Config.getWebserviceUrl(this)
    executor.execute {
        val success = try {
            val connection = URL(url).openConnection() as HttpURLConnection
            connection.requestMethod = "GET"
            connection.connectTimeout = 10_000
            connection.readTimeout = 10_000
            val ok = connection.responseCode in 200..299
            connection.inputStream.use { it.readBytes() }
            connection.disconnect()
            ok
        } catch (e: Exception) {
            false
        }

        handler.post {
            if (success) {
                prefs.edit().putLong(Config.PREFS_KEY_LAST_SUCCESS_MILLIS, System.currentTimeMillis()).apply()
                statusTextView.text = "Success"
                updateTimerDisplay()
            } else {
                statusTextView.text = "Failed"
            }
        }
    }
}
```

Two things worth noting:

- All exceptions are caught and treated as failure — a timeout, a DNS
  failure, and a non-2xx response all just mean "Failed" to the user. If you
  need to distinguish them later, that's the place to add detail.
- `handler.post { ... }` hops back onto the main thread before touching any
  view — background threads can never update UI directly.

## Step 8 — Build the settings screen

`SettingsActivity` is a second, plain `AppCompatActivity` with three
`EditText` fields pre-filled from `Config`, and a Save button:

```kotlin
class SettingsActivity : AppCompatActivity() {
    private lateinit var buttonLabelField: EditText
    private lateinit var webserviceUrlField: EditText
    private lateinit var tickIntervalField: EditText

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // build a LinearLayout with the 3 EditTexts + Save button,
        // pre-filling each field from Config.getX(this)
        // ...
        saveButton.setOnClickListener { saveAndClose() }
    }

    private fun saveAndClose() {
        val label = buttonLabelField.text.toString().ifBlank { Config.DEFAULT_BUTTON_LABEL }
        val url = webserviceUrlField.text.toString().ifBlank { Config.DEFAULT_WEBSERVICE_URL }
        val tickIntervalMs = tickIntervalField.text.toString().toLongOrNull()
            ?: Config.DEFAULT_TIMER_TICK_INTERVAL_MS

        if (tickIntervalMs <= 0) {
            Toast.makeText(this, "Tick interval must be a positive number of ms", Toast.LENGTH_SHORT).show()
            return
        }

        Config.save(this, label, url, tickIntervalMs)
        finish()
    }
}
```

Validate before saving — an empty URL or a zero/negative tick interval would
otherwise silently break the main screen.

Register it in the manifest (it doesn't need a `LAUNCHER` intent-filter,
since you navigate to it from within the app):

```xml
<activity
    android:name=".SettingsActivity"
    android:exported="false"
    android:label="Settings" />
```

## Step 9 — Navigate to it, and pick up changes on return

From `MainActivity`:

```kotlin
settingsButton.setOnClickListener {
    startActivity(Intent(this, SettingsActivity::class.java))
}
```

The key detail: `MainActivity.onResume()` already re-reads `Config` every
time the screen becomes visible (Step 6). Since `startActivity` pauses
`MainActivity` and returning from `SettingsActivity` resumes it, any saved
change is picked up automatically — no extra plumbing needed.

## Step 10 — Run it

Build and run on a device or emulator. Note that `example.com` (the default
URL) won't return a real success response for most GET requests in the way
you'd want to test against — swap in a real endpoint, or point it at
something like `https://httpbin.org/get` while testing, either by editing
`Config.DEFAULT_WEBSERVICE_URL` or by using the Settings screen once the app
is running.

## Where to go from here

- **Distinguish failure types.** Right now any exception or non-2xx response
  is just "Failed". You could catch `SocketTimeoutException` separately, or
  show the HTTP status code.
- **POST instead of GET**, with a body, if your webservice needs one —
  `connection.requestMethod = "POST"`, `connection.doOutput = true`, then
  write to `connection.outputStream`.
- **Retry logic.** A single failed call currently requires the user to press
  the button again; you could add automatic retries with backoff.
- **`PreferenceFragmentCompat`.** For a more "native-feeling" settings screen
  with less boilerplate, Android's Preference library replaces the hand-built
  `EditText` layout with a declarative XML preference screen.
- **WorkManager**, if you want the ping to happen on a schedule in the
  background rather than only on a button press.
