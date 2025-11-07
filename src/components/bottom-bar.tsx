import { useCurrentSong } from "@/hooks/song";
import { AudioController } from "./audio-controller";
import { VolumeSlider } from "./volume-slider";
import { Music3Icon } from "lucide-react";
import { useDataManager } from "@/hooks/data-manager";
import { useEffect, useState } from "react";
import * as path from "@tauri-apps/api/path";
import { convertFileSrc } from "@tauri-apps/api/core";

export function BottomBarSongDisplay() {
    const { currentSong } = useCurrentSong();
    const { dataManager } = useDataManager();
    const [localDataDir, setLocalDataDir] = useState<string | null>(null);

    useEffect(() => {
        const getLocalDataDir = async () => {
            const home = await path.localDataDir();
            setLocalDataDir(home);
        }

        if (!localDataDir) {
            getLocalDataDir();
        }
    }, []);

    return <div className="flex flex-row gap-2 h-full w-[calc(50%-40px)]">
        <div className="h-full aspect-square border rounded-md bg-muted flex items-center justify-center">
            {currentSong?.cover ? <img className="h-full w-full rounded-md" src={convertFileSrc(`${dataManager?.dataDir ?? localDataDir + "/tungsten_data"}/covers/${currentSong.cover}`)} /> : <Music3Icon className="stroke-muted-foreground" />}
        </div>
        <div className="h-full grow flex flex-col">
            <p className="text-sm">{currentSong?.name}</p>
            <p className="text-muted-foreground text-xs">{currentSong?.artists.join(", ")}</p>
        </div>
    </div>
}

export function BottomBar() {
    return <div className="absolute bottom-0 w-full h-16 border-t flex flex-row p-2 items-center justify-center">
        <BottomBarSongDisplay />
        <AudioController />
        <div className="flex grow" />
    </div>
}