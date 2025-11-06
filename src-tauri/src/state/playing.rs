use std::sync::Mutex;

use tauri::{AppHandle, Emitter, Runtime};

use crate::state::AppState;

#[tauri::command]
pub async fn get_playing(state: tauri::State<'_, Mutex<AppState>>) -> Result<bool, String> {
    Ok(state
        .lock()
        .or(Err(String::from("Failed to achieve lock on AppState!")))?
        .playing
        .clone())
}

#[tauri::command]
pub async fn set_playing<R: Runtime>(
    app: AppHandle<R>,
    state: tauri::State<'_, Mutex<AppState>>,
    playing: bool,
) -> Result<(), String> {
    state
        .lock()
        .or(Err(String::from("Failed to achieve lock on AppState!")))?
        .playing = playing;

    app.emit("playing_changed", playing)
        .or(Err(format!("Failed to emit 'playing_changed' to {playing}%")))?;

    Ok(())
}
