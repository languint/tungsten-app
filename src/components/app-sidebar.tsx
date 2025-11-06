import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader } from "./ui/sidebar";
import { Tooltip, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { useDataManager } from "@/hooks/data-manager";
import { convertFileSrc } from "@tauri-apps/api/core";
import { usePlaylists } from "@/hooks/playlists";
import * as path from '@tauri-apps/api/path';
import { useEffect, useState } from "react";
import { Music3Icon } from "lucide-react";

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
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Playlists</SidebarGroupLabel>
                    <SidebarGroupContent >
                        <TooltipProvider>
                            {playlists.map((playlist) => (
                                <button className="w-full h-50 border-none">
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <div className="h-full aspect-square border rounded-md bg-muted flex items-center justify-center">
                                                {playlist.cover ? <img
                                                    className="rounded-md grow max-w-lg aspect-square"
                                                    src={convertFileSrc(
                                                        `${dataManager?.dataDir ?? `${localDataDir}/tungsten_data`}/covers/${playlist.cover}`
                                                    )}
                                                />
                                                    : <Music3Icon className="stroke-muted-foreground" />}
                                            </div>
                                        </TooltipTrigger>
                                    </Tooltip>
                                </button>
                            ))}
                        </TooltipProvider>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}