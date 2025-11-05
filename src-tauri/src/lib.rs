use std::{path::PathBuf, sync::Mutex};

use tauri::Manager;

use crate::{song::Song, state::AppState};

mod album;
mod song;
mod state;

use state::song::get_current_song;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            app.manage(Mutex::new(AppState {
                current_song: Some(Box::new(Song {
                    title: String::from("Test song name"),
                    album: None,
                    artists: vec![String::from("The Test Band"), String::from("Some Other Artist")],
                    audio_path: PathBuf::from("/"),
                    cover_path: None,
                })),
            }));
            Ok(())
        })
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![get_current_song])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
