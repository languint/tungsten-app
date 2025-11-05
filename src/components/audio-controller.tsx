import { Button } from "@/components/ui/button"
import { usePlaying } from "@/hooks/playing"
import { ArrowLeftToLineIcon, ArrowRightToLineIcon, PauseIcon, PlayIcon } from "lucide-react"
export function AudioController() {
    const { playing, setPlaying } = usePlaying();

    return <div className="flex flex-row gap-4 justify-center items-center">
        <ArrowLeftToLineIcon />
        <Button className="h-full aspect-square rounded-full" onClick={() => setPlaying(!playing)}>
            {playing ? <PauseIcon className="fill-background" /> : <PlayIcon className="fill-background" />}
        </Button>
        <ArrowRightToLineIcon />
    </div>
}