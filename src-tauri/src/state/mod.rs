use crate::{data::{DataManager, FilePlaylists}, song::Song};

pub mod volume;
pub mod song;
pub mod playlists;

#[derive(Default)]
pub struct AppState {
    pub current_song: Option<Box<Song>>,
    pub volume_percent: u8,
    pub playlists: Box<FilePlaylists>,
    pub data_manager: DataManager,
}