import { BottomBar } from "./components/bottom-bar";
import { usePlaylists } from "./hooks/playlists";

export function App() {
    const { playlists, setPlaylists } = usePlaylists();

    return (
        <div className="App">
            <div className="flex flex-col">
                {playlists.map((p) => <div className="flex flex-col"><p>{p.name}</p>
                    {p.songs.map((s) => (
                        <div className="flex flex-col">
                            <p>title - {s.name}</p>
                            <p>artists - {s.artists.join(", ")}</p>
                            <p>duration - {s.duration}</p>
                            <p>track - {s.track}</p>
                            <p>cover - {s.cover}</p>
                        </div>
                    ))}</div>)}
            </div>
            <BottomBar />
        </div>
    )
}