use crate::song::Song;

pub mod song;

#[derive(Default)]
pub struct AppState {
    pub current_song: Option<Box<Song>>,
}