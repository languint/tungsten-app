import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";

export function usePlaying() {
    const [playing, setPlaying] = useState<boolean>(false);

    useEffect(() => {
        invoke<boolean>("get_playing").then(setPlaying);

        const unlisten = listen<boolean>("playing_changed", (event) => {
            setPlaying(event.payload);
        });

        return () => {
            unlisten.then((f) => f());
        };
    }, []);

    const updatePlaying = async (proj: boolean) => {
        setPlaying(proj);
        await invoke("set_playing", { project: proj });
    };

    return { playing, setPlaying: updatePlaying };
}