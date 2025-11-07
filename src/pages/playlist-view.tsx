import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useDataManager } from "@/hooks/data-manager";
import { useCurrentPlaylist, usePlaylists } from "@/hooks/playlists"
import { convertFileSrc } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import * as path from "@tauri-apps/api/path";
import { Music3Icon } from "lucide-react";
import { useCurrentSong } from "@/hooks/song";
import { usePlaying } from "@/hooks/playing";

export function PlaylistView() {
    const { playlists } = usePlaylists();
    const { currentPlaylist } = useCurrentPlaylist();
    const { setCurrentSong } = useCurrentSong();
    const { setPlaying} = usePlaying();

    const currentPlaylistData =
        currentPlaylist == null ? undefined : playlists[currentPlaylist];

    const durationSeconds = currentPlaylistData?.songs.reduce((acc, current) => acc + current.duration, 0) ?? 0;
    const durationString = `${durationSeconds >= 3600 ? `${Math.floor(durationSeconds / 3600)}` : `00`}:${durationSeconds >= 60 && `${String(Math.floor(durationSeconds / 60)).padStart(2, '0')}`}:${String(durationSeconds % 60).padStart(2, '0')}`;

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

    const setCurrentPlaylistSong = (index: number) => {
        if (currentPlaylistData !== undefined) {
            setCurrentSong(currentPlaylistData.songs[index]);
            setPlaying(true);
        }
    }

    return (
        <Card className="flex grow max-h-[calc(100%-6rem)] m-4">
            <CardHeader>
                <CardTitle>
                    {currentPlaylistData?.name ?? "unknown playlist"}
                </CardTitle>
                <CardDescription>Playlist - {durationString}</CardDescription>
                <Separator />
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-2">
                    {currentPlaylistData?.songs.map((s, index) => (<button className="flex flex-row gap-4 items-center" onClick={() => setCurrentPlaylistSong(index)}>
                        <div className={`w-12 aspect-square border rounded-md bg-muted flex items-center justify-center`}>
                            {s.cover ? <img
                                className={`rounded-md max-w-12 aspect-square border`}
                                src={convertFileSrc(
                                    `${dataManager?.dataDir ?? `${localDataDir}/tungsten_data`}/covers/${s.cover}`
                                )} />
                                : <Music3Icon className="stroke-muted-foreground w-12" />}
                        </div>

                        <div className="flex flex-col items-start">
                            <p>{s.name}</p>
                            <p className="text-muted-foreground text-sm">{s.artists.join(", ")}</p>
                        </div>
                        <div className="flex grow" />
                        <p className="text-muted-foreground">{`${s.duration > 60 && `${Math.floor(s.duration / 60)}`}:${String(s.duration % 60).padStart(2, '0')}`}</p>
                    </button>))}
                </div>
            </CardContent>
        </Card >
    );
}

