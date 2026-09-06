# SingleButtonApp

Minimal Android app: one button, one unlabeled timer, success/failure feedback
for a webservice call, with the last-success time persisted locally, and a
Settings screen to edit the 4 configurable values at runtime.

## The 4 configurable values (`Config.kt`)

| Value | Default | Purpose |
|---|---|---|
| Button label | `Ping` | Text shown on the single button |
| Webservice URL | `https://example.com/api/ping` | Endpoint hit when the button is pressed |
| Timer tick interval (ms) | `1000` | How often the on-screen timer refreshes |
| (last-success timestamp) | none until first success | Not user-editable — it's data, written automatically on each successful call |

The first 3 are editable from the in-app **Settings** screen and persist in
`SharedPreferences` (file `single_button_app_prefs`), so they survive app
restarts. Defaults live in `Config.kt` and are only used until the user saves
something different.

## Behaviour

- Main screen: [Button] → [timer, no caption] → [status text] → [Settings button].
- Button press calls the configured URL (HTTP GET) on a background thread.
- On success: status shows "Success", timestamp is saved, timer resets to 00:00:00.
- On failure (bad status code or exception): status shows "Failed", timer keeps
  counting from the last real success.
- The timer TextView has no caption/label by design — just `HH:MM:SS` elapsed
  since the last success, or `--:--:--` if there's never been one.
- Settings screen: 3 text fields (label, URL, tick interval) + Save. Save
  validates the tick interval is a positive number, writes to
  SharedPreferences, and returns to the main screen, which re-reads the
  values in `onResume()` — so a changed button label or tick rate takes
  effect immediately.

## Building

Standard Gradle Android project (UI built in code, no XML layouts).

1. Open the `SingleButtonApp` folder in Android Studio (Giraffe or later).
2. Let it sync Gradle.
3. Run on a device/emulator with API 24+.

Or from the command line, once you've generated the Gradle wrapper
(`gradle wrapper` if you have Gradle installed locally):

```
./gradlew assembleDebug
```

APK output: `app/build/outputs/apk/debug/app-debug.apk`.

## Notes

- Uses plain `HttpURLConnection`, no networking library dependency.
- Requires the `INTERNET` permission, already declared in the manifest.
- `SettingsActivity` is a plain `AppCompatActivity`, not a `PreferenceFragment`
  — kept as simple EditTexts so it's easy to restyle or extend.
