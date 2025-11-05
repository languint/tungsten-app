use std::path::PathBuf;

use serde::{Deserialize, Serialize};

use crate::album::Album;

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Song {
    pub title: String,
    pub artists: Vec<String>,
    pub cover_path: Option<PathBuf>,
    pub audio_path: PathBuf,
    pub album: Option<Box<Album>>,
}
