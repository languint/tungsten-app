import { useVolume } from "@/hooks/volume";
import { Slider } from "./ui/slider";

export function VolumeSlider() {
    const { volume, setVolume } = useVolume();
    return (<div className="flex items-center justify-center min-w-35">
        <Slider defaultValue={[volume]} step={1} max={100} onValueCommit={(v) => setVolume(v[0])} />
    </div>)
}