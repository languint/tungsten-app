import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";


export interface DataManager {
    dataDir: string,
    musicDir: string,
}

export function useDataManager() {
    const [dataManager, setDataManager] = useState<DataManager>();

    useEffect(() => {
        invoke<DataManager>("get_data_manager").then(setDataManager);

        const unlisten = listen<DataManager>("data_manager_changed", (event) => {
            setDataManager(event.payload);
        });

        return () => {
            unlisten.then((f) => f());
        };
    }, []);

    return { dataManager };
}

