import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";

export interface PlaylistSong {
    name: string,
    artists: string[],
    duration: number,
    track: string,
    cover: string,
}

export interface Playlist {
    name: string,
    cover?: string,
    songs: PlaylistSong[]
}

export type Playlists = Playlist[];

export function usePlaylists() {
    const [playlists, setPlaylists] = useState<Playlists>([]);

    useEffect(() => {
        invoke<Playlists>("get_playlists").then(setPlaylists);

        const unlisten = listen<Playlists>("playlists_changed", (event) => {
            setPlaylists(event.payload);
        });

        return () => {
            unlisten.then((f) => f());
        };
    }, []);

    const updatePlaylists = async (playlists: Playlists) => {
        setPlaylists(playlists);
        await invoke("set_playlists", { volume: playlists });
    };

    return { playlists, setPlaylists: updatePlaylists };
}

