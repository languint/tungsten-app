import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";

export function useVolume() {
    const [volume, setVolume] = useState<number>(100);

    useEffect(() => {
        invoke<number>("get_volume").then(setVolume);

        const unlisten = listen<number>("volume_changed", (event) => {
            setVolume(event.payload);
        });

        return () => {
            unlisten.then((f) => f());
        };
    }, []);

    const updateVolume = async (volume: number) => {
        setVolume(volume);
        await invoke("set_volume", { volume });
    };

    return { volume, setVolume: updateVolume };
}

