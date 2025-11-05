use crate::song::Song;

#[derive(Debug, Clone)]
pub struct Album<'a> {
    pub songs: Vec<Song<'a>>,
    pub artist: Vec<String>,
}