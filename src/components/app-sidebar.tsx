import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader } from "./ui/sidebar";
import { DataManager, useDataManager } from "@/hooks/data-manager";
import { convertFileSrc } from "@tauri-apps/api/core";
import { Playlist, Playlists, useCurrentPlaylist, usePlaylists } from "@/hooks/playlists";
import * as path from '@tauri-apps/api/path';
import { useEffect, useState } from "react";
import { ListMusicIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { ScrollArea } from "./ui/scroll-area";
import Marquee from "react-fast-marquee";

export function AppSidebar() {
    const { playlists } = usePlaylists();
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
        <Sidebar className="h-[calc(100%-4rem)]">
            <SidebarHeader></SidebarHeader>
            <SidebarContent className="p-0 m-0">
                {AppSidebarPlaylists(playlists, dataManager, localDataDir)}
            </SidebarContent>
        </Sidebar>
    )
}

function AppSidebarPlaylists(playlists: Playlists, dataManager: DataManager | undefined, localDataDir: string | null) {
    const { setCurrentPlaylist } = useCurrentPlaylist();

    const playlistArtists = (playlist: Playlist) => {
        let artists: Set<string> = new Set();
        playlist.songs.forEach((s) => {
            s.artists.forEach((a) => {
                if (!(a in artists)) {
                    artists.add(a);
                }
            })
        })

        return [...artists]
    }

    return <SidebarGroup>
        <SidebarGroupContent>
            <TooltipProvider>
                <ScrollArea>
                    {playlists.map((playlist, index) => (
                        <Tooltip>
                            <TooltipTrigger>
                                <button className="w-full flex p-2 flex-row gap-2" onClick={(() => setCurrentPlaylist(index))} key={index}>
                                    {AppSidebarPlaylistCover(playlist, dataManager, localDataDir)}
                                    <div className="flex flex-col items-start">
                                        <p>{playlist.name}</p>
                                        <Marquee speed={8} delay={1}>
                                            {playlistArtists(playlist).map((a) => (
                                                <p className="text-muted-foreground pr-2">{a}</p>))}
                                        </Marquee>
                                    </div>
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>{playlist.name}</TooltipContent>
                        </Tooltip>
                    ))}

                </ScrollArea>
            </TooltipProvider>
        </SidebarGroupContent>
    </SidebarGroup>;
}

function AppSidebarPlaylistCover(playlist: Playlist, dataManager: DataManager | undefined, localDataDir: string | null) {

    return <div className={`grow aspect-square border rounded-md bg-muted flex items-center justify-center`}>
        {playlist.cover ? <img
            className={`rounded-md grow max-w-12 aspect-square border`}
            src={convertFileSrc(
                `${dataManager?.dataDir ?? `${localDataDir}/tungsten_data`}/covers/${playlist.cover}`
            )} />
            : <ListMusicIcon className="stroke-muted-foreground w-12" />}
    </div>;
}

