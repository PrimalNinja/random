package com.example.singlebuttonapp

import android.content.Context

/**
 * Holds the 4 configurable values. Defaults are the original constants;
 * once the user saves changes on the Settings screen, the SharedPreferences-
 * stored value takes over.
 */
object Config {

    // ---------------- Defaults for the 4 configurable values ----------------
    const val DEFAULT_BUTTON_LABEL = "Ping"
    const val DEFAULT_WEBSERVICE_URL = "https://example.com/api/ping"
    const val DEFAULT_TIMER_TICK_INTERVAL_MS = 1000L
    // (the last-success timestamp itself is data, not a "setting" - see PREFS_KEY_LAST_SUCCESS_MILLIS)
    // --------------------------------------------------------------------------

    const val PREFS_NAME = "single_button_app_prefs"

    // SharedPreferences keys
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
