import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Playlist, useCurrentPlaylist, usePlaylists } from "@/hooks/playlists"
import { useEffect, useState } from "react";

export function PlaylistView() {
    const { playlists } = usePlaylists();
    const { currentPlaylist } = useCurrentPlaylist();

    const [currentPlaylistData, setCurrentPlaylistData] = useState<Playlist>();

    useEffect(() => {
        if (currentPlaylist && playlists[currentPlaylist]) {
            setCurrentPlaylistData(playlists[currentPlaylist]);
        }
    }, [currentPlaylist, playlists])

    return <Card >
        <CardHeader>
            <CardTitle>{currentPlaylistData?.name ?? "Playlist"}</CardTitle>
        </CardHeader>
    </Card>
}