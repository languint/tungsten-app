import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useDataManager } from "@/hooks/data-manager";
import { useCurrentPlaylist, usePlaylists } from "@/hooks/playlists"
import { convertFileSrc } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import * as path from "@tauri-apps/api/path";
import { Music3Icon } from "lucide-react";

export function PlaylistView() {
    const { playlists } = usePlaylists();
    const { currentPlaylist } = useCurrentPlaylist();

    const currentPlaylistData =
        currentPlaylist == null ? undefined : playlists[currentPlaylist];

    const durationSeconds = currentPlaylistData?.songs.reduce((acc, current) => acc + current.duration, 0) ?? 0;
    const durationString = (durationSeconds >= 3600 ? `${durationSeconds % 3600} h` : ``) + `${durationSeconds % 60} m`;

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
    }, [])


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
                    {currentPlaylistData?.songs.map((s) => (<div className="flex flex-row">
                        <div className={`w-12 aspect-square border rounded-md bg-muted flex items-center justify-center`}>
                            {!s.cover ? <img
                                className={`rounded-md max-w-12 aspect-square border`}
                                src={convertFileSrc(
                                    `${dataManager?.dataDir ?? `${localDataDir}/tungsten_data`}/covers/${s.cover}`
                                )} />
                                : <Music3Icon className="stroke-muted-foreground w-12" />}
                        </div>
                        <div></div>
                    </div>))}
                </div>
            </CardContent>
        </Card >
    );
}

