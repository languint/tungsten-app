import { AppSidebar } from "./components/app-sidebar";
import { BottomBar } from "./components/bottom-bar";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import { useCurrentPlaylist } from "./hooks/playlists";
import { PlaylistView } from "./pages/playlist-view";

export function App() {
    const { currentPlaylist } = useCurrentPlaylist();

    return (
        <div className="App">
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    {currentPlaylist !== null && <PlaylistView />}
                </SidebarInset>
                <BottomBar />
            </SidebarProvider>
        </div>
    )
}