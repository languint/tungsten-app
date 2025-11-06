use crate::{
    data::{DataManager, FilePlaylists},
    song::Song,
};

pub mod data_manager;
pub mod playlists;
pub mod song;
pub mod volume;
pub mod playing;

#[derive(Default)]
pub struct AppState {
    pub current_song: Option<Box<Song>>,
    pub volume_percent: u8,
    pub playlists: Box<FilePlaylists>,
    pub current_playlist: Option<u8>,
    pub data_manager: DataManager,
    pub playing: bool,
}
