use std::sync::Mutex;

use tauri::{AppHandle, Emitter, Runtime};

use crate::{data::FilePlaylists, state::AppState};

#[tauri::command]
pub async fn get_playlists(
    state: tauri::State<'_, Mutex<AppState>>,
) -> Result<FilePlaylists, String> {
    Ok(*state
        .lock()
        .or(Err(String::from("Failed to achieve lock on AppState!")))?
        .playlists
        .clone())
}

#[tauri::command]
pub async fn set_playlists<R: Runtime>(
    app: AppHandle<R>,
    state: tauri::State<'_, Mutex<AppState>>,
    playlists: FilePlaylists,
) -> Result<(), String> {
    state
        .lock()
        .or(Err(String::from("Failed to achieve lock on AppState!")))?
        .playlists = Box::new(playlists.clone());

    app.emit("playlists_changed", &playlists).or(Err(format!(
        "Failed to emit 'playlists_changed' to {playlists:?}"
    )))?;

    Ok(())
}
