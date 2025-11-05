import { AudioController } from "./audio-controller";
import { VolumeSlider } from "./volume-slider";

interface Props { }

export function BottomBarSongDisplay() {
    
}

export function BottomBar() {
    return <div className="absolute bottom-0 w-full h-16 border-t flex flex-row p-2 items-center justify-center">
        <div className="flex grow" />
        <VolumeSlider />
        <div className="flex grow" />

        <AudioController />
        <div className="flex grow" />
        <VolumeSlider />

    </div>
}