import { AudioController } from "./audio-controller";

interface Props { }

export function BottomBar() {
    return <div className="absolute bottom-0 w-full h-16 border-t flex flex-row p-2">
        <div className="flex grow" />
        <AudioController />
        <div className="flex grow" />
    </div>
}