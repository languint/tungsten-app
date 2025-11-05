use crate::song::Song;

#[derive(Default)]
pub struct AppState {
    pub current_song: Option<Song<'static>>
}