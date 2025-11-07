import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrentPlaylist, usePlaylists } from "@/hooks/playlists"

export function PlaylistView() {
    const { playlists } = usePlaylists();
    const { currentPlaylist } = useCurrentPlaylist();

    const currentPlaylistData =
        currentPlaylist == null ? undefined : playlists[currentPlaylist];

    const durationSeconds = currentPlaylistData?.songs.reduce((acc, current) => acc + current.duration, 0) ?? 0;
    const durationString = (durationSeconds >= 3600 ? `${durationSeconds % 3600} h` : ``) + `${durationSeconds % 60} m`;
    return (
        <Card className="flex grow max-h-[calc(100%-6rem)] m-4">
            <CardHeader>
                <CardTitle>
                    {currentPlaylistData?.name ?? "unknown playlist"}
                </CardTitle>
                <CardDescription>Playlist - {durationString}</CardDescription>
            </CardHeader>
        </Card>
    );
}

