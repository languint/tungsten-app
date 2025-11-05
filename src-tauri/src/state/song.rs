use std::sync::Mutex;

use crate::{song::Song, state::AppState};

#[tauri::command]
pub async fn get_current_song(
    state: tauri::State<'_, Mutex<AppState>>,
) -> Result<Option<Box<Song>>, String> {
    Ok(state
        .lock()
        .or(Err(String::from("Failed to achieve lock on AppState!")))?
        .current_song
        .clone())
}
