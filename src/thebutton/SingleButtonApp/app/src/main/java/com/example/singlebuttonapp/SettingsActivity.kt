package com.example.singlebuttonapp

import android.os.Bundle
import android.view.Gravity
import android.widget.Button
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class SettingsActivity : AppCompatActivity() {

    private lateinit var buttonLabelField: EditText
    private lateinit var webserviceUrlField: EditText
    private lateinit var tickIntervalField: EditText

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val root = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(48, 48, 48, 48)
        }

        fun label(text: String) = TextView(this).apply {
            this.text = text
            setPadding(0, 32, 0, 8)
        }

        buttonLabelField = EditText(this).apply {
            setText(Config.getButtonLabel(this@SettingsActivity))
        }
        webserviceUrlField = EditText(this).apply {
            setText(Config.getWebserviceUrl(this@SettingsActivity))
        }
        tickIntervalField = EditText(this).apply {
            inputType = android.text.InputType.TYPE_CLASS_NUMBER
            setText(Config.getTimerTickIntervalMs(this@SettingsActivity).toString())
        }

        val saveButton = Button(this).apply {
            text = "Save"
        }

        root.addView(label("Button label"))
        root.addView(buttonLabelField)
        root.addView(label("Webservice URL"))
        root.addView(webserviceUrlField)
        root.addView(label("Timer tick interval (ms)"))
        root.addView(tickIntervalField)
        root.addView(saveButton)
        setContentView(root)

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
        Toast.makeText(this, "Saved", Toast.LENGTH_SHORT).show()
        finish()
    }
}
