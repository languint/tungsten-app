use std::{fs, path::PathBuf};

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Default, Serialize)]
pub struct DataManager {
    pub music_dir: PathBuf,
    pub data_dir: PathBuf,
}

const TUNGSTEN_MUSIC_DIR: &str = "tungsten_music/";
const TUNGSTEN_DATA_DIR: &str = "tungsten_data/";

const PLAYLISTS_FILE_NAME: &str = "playlists.json";

impl DataManager {
    pub fn new() -> Result<Self, String> {
        let user_data_dir = dirs::data_dir().ok_or(format!("Failed to get user data_dir!"))?;
        let user_audio_dir = dirs::audio_dir().ok_or(format!("Failed to get user audio_dir!"))?;

        let data_dir = Self::create_tungsten_dir(&user_data_dir, TUNGSTEN_DATA_DIR)?;
        let music_dir = Self::create_tungsten_dir(&user_audio_dir, TUNGSTEN_MUSIC_DIR)?;

        Ok(Self {
            data_dir,
            music_dir,
        })
    }
}

impl DataManager {
    fn create_tungsten_dir(dir_path: &PathBuf, dir_name: &str) -> Result<PathBuf, String> {
        let dir = dir_path.join(dir_name);
        if let Ok(exists) = fs::exists(&dir)
            && exists
        {
            return Ok(dir);
        }
        fs::DirBuilder::new()
            .recursive(true)
            .create(&dir)
            .map_err(|e| format!("Failed to build directory: {e}"))?;
        Ok(dir)
    }
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct FileSong {
    /// The display name of the song
    pub name: String,
    /// The artists of the song
    pub artists: Vec<String>,
    /// How long the song is, in seconds
    pub duration: u32,
    /// The file location of the song, relative to the `music_dir`
    pub track: PathBuf,
    /// The file location of the cover, relative to the `data_dir/covers/`
    pub cover: PathBuf,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct FilePlaylist {
    pub name: String,
    /// The file location of the cover, relative to the `data_dir/covers/`
    pub cover: Option<PathBuf>,
    pub songs: Vec<FileSong>,
}

pub type FilePlaylists = Vec<FilePlaylist>;

impl DataManager {
    pub fn read_playlists(&self) -> Result<FilePlaylists, String> {
        let file_path = &self.data_dir.join(PLAYLISTS_FILE_NAME);

        if let Ok(exists) = fs::exists(&self.data_dir)
            && !exists
        {
            if let Err(e) = fs::File::create(&file_path)
                .map_err(|e| format!("Failed to create playlists file: {e}"))
            {
                return Err(e);
            }
        }

        let file_contents = fs::read_to_string(&file_path)
            .map_err(|e| format!("Failed to read playlists file: {e}"))?;

        serde_json::from_str(&file_contents)
            .map_err(|e| format!("Failed to parse playlists file: {e}"))
    }
}
