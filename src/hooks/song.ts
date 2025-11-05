import { Song } from "@/song";
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { useEffect, useState } from "react";

export function useCurrentSong() {
    const [currentSong, setCurrentSong] = useState<Song | null>(null);

    useEffect(() => {
        invoke<Song | null>("get_current_song").then(setCurrentSong);

        const unlisten = listen<Song | null>("current_song_changed", (event) => {
            setCurrentSong(event.payload);
        });

        return () => {
            unlisten.then((f) => f());
        };
    }, []);

    const updateCurrentSong = async (song: Song | null) => {
        setCurrentSong(song);
        await invoke("set_current_song", { song });
    };

    return { currentSong, setCurrentSong: updateCurrentSong };
}