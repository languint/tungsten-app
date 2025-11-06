use std::sync::Mutex;

use tauri::{AppHandle, Emitter, Runtime};

use crate::{
    data::{FilePlaylist, FilePlaylists},
    state::AppState,
};

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

#[tauri::command]
pub async fn get_current_playlist(
    state: tauri::State<'_, Mutex<AppState>>,
) -> Result<Option<u8>, String> {
    Ok(state
        .lock()
        .or(Err(String::from("Failed to achieve lock on AppState!")))?
        .current_playlist
        .clone())
}

#[tauri::command]
pub async fn set_current_playlist<R: Runtime>(
    app: AppHandle<R>,
    state: tauri::State<'_, Mutex<AppState>>,
    playlist: Option<u8>,
) -> Result<(), String> {
    state
        .lock()
        .or(Err(String::from("Failed to achieve lock on AppState!")))?
        .current_playlist = playlist.clone();

    app.emit("current_playlist_changed", &playlist)
        .or(Err(format!(
            "Failed to emit 'current_playlist_changed' to {playlist:?}"
        )))?;

    Ok(())
}
