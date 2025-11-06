use std::sync::Mutex;

use tauri::Manager;

use crate::{
    data::DataManager,
    state::{
        AppState, playlists::{get_playlists, set_playlists}, volume::{get_volume, set_volume}
    },
};

mod album;
mod data;
mod song;
mod state;

use state::song::get_current_song;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let data_manager = DataManager::new().expect("Expected construction to succeed!");

            let playlists = data_manager
                .read_playlists()
                .expect("Expected read to succeed!");

            app.manage(Mutex::new(AppState {
                current_song: None,
                volume_percent: 50,
                playlists: Box::new(playlists),
                data_manager,
            }));

            Ok(())
        })
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            get_current_song,
            get_volume,
            set_volume,
            get_playlists,
            set_playlists,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
