import { Slider } from "./ui/slider";

export function VolumeSlider() {
    return (<div className="flex items-center justify-center min-w-20">
        <Slider defaultValue={[50]} step={1} max={100} />
    </div>)
}