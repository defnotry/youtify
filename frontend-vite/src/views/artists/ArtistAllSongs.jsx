import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axiosClient from "../../axios-client";
import ReactAudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export default function ArtistAllSongs() {
 const [songs, setSongs] = useState([]);
 const [first, setFirst] = useState(0);
 const [selectedSong, setSelectedSong] = useState(null);

 useEffect(() => {
    axiosClient
      .get(`/songs`)
      .then((response) => {
        setSongs(response.data.songs);
      })
      .catch(console.error);
 }, []);

 const playSong = (songId) => {
    axiosClient
      .get(`/songs/${songId}/play`, { responseType: "blob" })
      .then((response) => {
        const blob = new Blob([response.data], { type: "audio/mp3" });
        const url = URL.createObjectURL(blob);
        setSelectedSong(url); // Update the selected song URL
      })
      .catch(console.error);
 };

 return (
    <div className="d-flex flex-column w-100 h-100">
      <div className="p-5" style={{ maxHeight: "calc(100vh - 300px)", overflow: "auto" }}>
        <DataTable
          value={songs}
          selectionMode="single"
          first={first}
          paginator
          rows={10}
          totalRecords={songs.length}
          onPage={(e) => setFirst(e.first)}
        >
          <Column field="id" header="ID" sortable />
          <Column field="title" header="Title" sortable />
          <Column
            header="Play"
            body={(rowData) => (
              <button onClick={() => playSong(rowData.id)}>Play Audio</button>
            )}
          />
        </DataTable>
      </div>
      <div className="position-absolute bottom-0 w-100 audio-player">
        {selectedSong && (
          <ReactAudioPlayer
            autoPlay
            controls
            src={selectedSong}
          />
        )}
      </div>
    </div>
 );
}
