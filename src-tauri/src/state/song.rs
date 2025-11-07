use std::{fs::File, sync::Mutex};

use tauri::{AppHandle, Emitter, Runtime};

use crate::{data::FileSong, state::AppState};

#[tauri::command]
pub async fn get_current_song(
    state: tauri::State<'_, Mutex<AppState>>,
) -> Result<Option<FileSong>, String> {
    Ok(state
        .lock()
        .or(Err(String::from("Failed to achieve lock on AppState!")))?
        .current_song
        .clone())
}

#[tauri::command]
pub async fn set_current_song<R: Runtime>(
    app: AppHandle<R>,
    state: tauri::State<'_, Mutex<AppState>>,
    song: Option<FileSong>,
) -> Result<(), String> {
    state
        .lock()
        .or(Err(String::from("Failed to achieve lock on AppState!")))?
        .current_song = song.clone();

    app.emit("current_song_changed", &song)
        .or(Err(format!(
            "Failed to emit 'current_song_changed' to {song:?}"
        )))?;

    Ok(())
}