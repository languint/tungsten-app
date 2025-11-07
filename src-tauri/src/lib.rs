use std::sync::Mutex;

use tauri::Manager;

use crate::{
    data::DataManager,
    state::{
        AppState, data_manager::get_data_manager, playing::{get_playing, set_playing}, playlists::{get_current_playlist, get_playlists, set_current_playlist, set_playlists}, song::set_current_song, volume::{get_volume, set_volume}
    },
};

mod data;
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
                current_playlist: None,
                playing: false,
            }));

            Ok(())
        })
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            get_current_song,
            set_current_song,
            get_data_manager,
            get_volume,
            set_volume,
            get_playing,
            set_playing,
            get_playlists,
            set_playlists,
            get_current_playlist,
            set_current_playlist,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
