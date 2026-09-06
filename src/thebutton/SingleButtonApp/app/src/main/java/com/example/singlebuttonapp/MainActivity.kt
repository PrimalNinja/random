package com.example.singlebuttonapp

import android.content.Context
import android.content.Intent
import android.content.SharedPreferences
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.Gravity
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import java.net.HttpURLConnection
import java.net.URL
import java.util.Locale
import java.util.concurrent.Executors

class MainActivity : AppCompatActivity() {

    private lateinit var prefs: SharedPreferences
    private lateinit var button: Button
    private lateinit var timerTextView: TextView
    private lateinit var statusTextView: TextView
    private val handler = Handler(Looper.getMainLooper())
    private val executor = Executors.newSingleThreadExecutor()

    // Current tick interval, re-read from Config whenever the screen resumes
    // (so a change made in Settings takes effect immediately).
    private var tickIntervalMs = Config.DEFAULT_TIMER_TICK_INTERVAL_MS

    private val tickRunnable = object : Runnable {
        override fun run() {
            updateTimerDisplay()
            handler.postDelayed(this, tickIntervalMs)
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        prefs = getSharedPreferences(Config.PREFS_NAME, Context.MODE_PRIVATE)

        val root = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            gravity = Gravity.CENTER
            setPadding(64, 64, 64, 64)
        }

        button = Button(this)

        // Timer TextView: deliberately no label/caption next to it,
        // it just displays elapsed time since last successful push.
        timerTextView = TextView(this).apply {
            textSize = 32f
            gravity = Gravity.CENTER
            setPadding(0, 64, 0, 32)
        }

        statusTextView = TextView(this).apply {
            textSize = 18f
            gravity = Gravity.CENTER
        }

        val settingsButton = Button(this).apply {
            text = "Settings"
            setPadding(0, 64, 0, 0)
        }

        root.addView(button)
        root.addView(timerTextView)
        root.addView(statusTextView)
        root.addView(settingsButton)
        setContentView(root)

        button.setOnClickListener { invokeWebservice() }
        settingsButton.setOnClickListener {
            startActivity(Intent(this, SettingsActivity::class.java))
        }
    }

    override fun onResume() {
        super.onResume()
        // Pick up any changes made on the Settings screen.
        button.text = Config.getButtonLabel(this)
        tickIntervalMs = Config.getTimerTickIntervalMs(this)

        updateTimerDisplay()
        handler.post(tickRunnable)
    }

    override fun onPause() {
        super.onPause()
        handler.removeCallbacks(tickRunnable)
    }

    private fun invokeWebservice() {
        statusTextView.text = "Calling..."
        val url = Config.getWebserviceUrl(this)
        executor.execute {
            val success = try {
                val connection = URL(url).openConnection() as HttpURLConnection
                connection.requestMethod = "GET"
                connection.connectTimeout = 10_000
                connection.readTimeout = 10_000
                val code = connection.responseCode
                val ok = code in 200..299
                connection.inputStream.use { it.readBytes() } // drain, not otherwise used
                connection.disconnect()
                ok
            } catch (e: Exception) {
                false
            }

            handler.post {
                if (success) {
                    prefs.edit()
                        .putLong(Config.PREFS_KEY_LAST_SUCCESS_MILLIS, System.currentTimeMillis())
                        .apply()
                    statusTextView.text = "Success"
                    updateTimerDisplay()
                } else {
                    statusTextView.text = "Failed"
                }
            }
        }
    }

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
}
