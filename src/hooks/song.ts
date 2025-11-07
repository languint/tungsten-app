import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { useEffect, useState } from "react";
import { PlaylistSong } from "./playlists";

export function useCurrentSong() {
    const [currentSong, setCurrentSong] = useState<PlaylistSong | null>(null);

    useEffect(() => {
        invoke<PlaylistSong | null>("get_current_song").then(setCurrentSong);

        const unlisten = listen<PlaylistSong | null>("current_song_changed", (event) => {
            setCurrentSong(event.payload);
        });

        return () => {
            unlisten.then((f) => f());
        };
    }, []);

    const updateCurrentSong = async (song: PlaylistSong | null) => {
        setCurrentSong(song);
        await invoke("set_current_song", { song });
    };

    return { currentSong, setCurrentSong: updateCurrentSong };
}