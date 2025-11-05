use serde::{Deserialize, Serialize};

use crate::song::Song;

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Album {
    pub songs: Vec<Box<Song>>,
    pub artist: Vec<String>,
}