use std::sync::Mutex;

use crate::{data::DataManager, state::AppState};

#[tauri::command]
pub async fn get_data_manager(
    state: tauri::State<'_, Mutex<AppState>>,
) -> Result<DataManager, String> {
    Ok(state
        .lock()
        .or(Err(String::from("Failed to achieve lock on AppState!")))?
        .data_manager
        .clone())
}
