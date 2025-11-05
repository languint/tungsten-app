import { useCurrentSong } from "@/hooks/song";
import { AudioController } from "./audio-controller";
import { VolumeSlider } from "./volume-slider";
import { Music3Icon } from "lucide-react";


export function BottomBarSongDisplay() {
    const { currentSong } = useCurrentSong();

    return <div className="flex flex-row gap-2 h-full grow">
        <div className="h-full aspect-square border rounded-md bg-muted flex items-center justify-center">
            {currentSong?.coverPath ? <img className="h-full w-full rounded-md" src={currentSong.coverPath} /> : <Music3Icon className="stroke-muted-foreground" />}
        </div>
        <div className="h-full grow flex flex-col">
            <p className="text-md font-medium">{currentSong?.title}</p>
            <p className="text-muted-foreground text-sm">{currentSong?.artists.join(", ")}</p>
        </div>
    </div>
}

export function BottomBar() {
    return <div className="absolute bottom-0 w-full h-16 border-t flex flex-row p-2 items-center justify-center">
        <BottomBarSongDisplay />
        <AudioController />
        <div className="flex grow" />
        <VolumeSlider />

    </div>
}