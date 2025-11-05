use std::sync::Mutex;

use tauri::{AppHandle, Emitter, Runtime};

use crate::state::AppState;

#[tauri::command]
pub async fn get_volume(state: tauri::State<'_, Mutex<AppState>>) -> Result<u8, String> {
    Ok(state
        .lock()
        .or(Err(String::from("Failed to achieve lock on AppState!")))?
        .volume_percent
        .clone())
}


#[tauri::command]
pub async fn set_volume<R: Runtime>(
    app: AppHandle<R>,
    state: tauri::State<'_, Mutex<AppState>>,
    volume: u8,
) -> Result<(), String> {
    state
        .lock()
        .or(Err(String::from("Failed to achieve lock on AppState!")))?
        .volume_percent = volume;

    app.emit("volume_changed", volume).or(Err(format!("Failed to emit 'volume_changed' to {volume}%")))?;

    Ok(())
}
