use std::{path::PathBuf, sync::Mutex};

use tauri::Manager;

use crate::{data::DataManager, song::Song, state::{AppState, volume::{get_volume, set_volume}}};

mod album;
mod song;
mod state;
mod data;

use state::song::get_current_song;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {

            let data_manager = DataManager::new().expect("Expected construction to succeed!");

            println!("music_dir = {:#?}", &data_manager.music_dir);
            println!("data_dir = {:#?}", &data_manager.data_dir);

            let playlists = data_manager.read_playlists().expect("Expected read to succeed!");

            dbg!(playlists);

            app.manage(Mutex::new(AppState {
                current_song: None,
                volume_percent: 50,
            }));
            Ok(())
        })
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![get_current_song, get_volume, set_volume])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
