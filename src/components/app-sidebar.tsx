import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarSeparator } from "./ui/sidebar";
import { TooltipProvider } from "./ui/tooltip";
import { DataManager, useDataManager } from "@/hooks/data-manager";
import { convertFileSrc } from "@tauri-apps/api/core";
import { Playlist, Playlists, usePlaylists } from "@/hooks/playlists";
import * as path from '@tauri-apps/api/path';
import { useEffect, useState } from "react";
import { ListMusicIcon } from "lucide-react";

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
            <SidebarContent >
                {AppSidebarPlaylists(playlists, dataManager, localDataDir)}
            </SidebarContent>
        </Sidebar>
    )
}

function AppSidebarPlaylists(playlists: Playlists, dataManager: DataManager | undefined, localDataDir: string | null) {
    return <SidebarGroup>
        <SidebarGroupContent>
            {playlists.map((playlist) => (
                <button className="w-full flex flex-row gap-2 px-2">
                    {AppSidebarPlaylistCover(playlist, dataManager, localDataDir)}
                    <div className="grow flex flex-col items-start">
                        <p>{playlist.name}</p>
                        <p className="text-muted-foreground">Playlist - {playlist.songs.length} track(s)</p>
                    </div>
                </button>
            ))}
        </SidebarGroupContent>
    </SidebarGroup>;
}

function AppSidebarPlaylistCover(playlist: Playlist, dataManager: DataManager | undefined, localDataDir: string | null) {
    return <div className="grow max-w-15 aspect-square border rounded-md bg-muted flex items-center justify-center">
        {playlist.cover ? <img
            className="rounded-md grow max-w-15 aspect-square border"
            src={convertFileSrc(
                `${dataManager?.dataDir ?? `${localDataDir}/tungsten_data`}/covers/${playlist.cover}`
            )} />
            : <ListMusicIcon className="stroke-muted-foreground w-15" />}
    </div>;
}

