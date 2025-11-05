use crate::song::Song;

pub mod volume;
pub mod song;

#[derive(Default)]
pub struct AppState {
    pub current_song: Option<Box<Song>>,
    pub volume_percent: u8,
}