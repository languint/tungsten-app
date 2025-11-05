use std::path::PathBuf;

use crate::album::Album;

#[derive(Debug, Clone)]
pub struct Song<'a> {
    pub title: String,
    pub artists: Vec<String>,
    pub cover_path: Option<PathBuf>,
    pub audio_path: PathBuf,
    pub album: Option<&'a Album<'a>>,
}
