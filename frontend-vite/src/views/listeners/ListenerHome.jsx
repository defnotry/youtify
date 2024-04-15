import { useStateContext } from "../../contexts/ContextProvider";
import AlbumCard from "../../components/Cards/Listener/AlbumCard";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import ReactAudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faTimes } from "@fortawesome/free-solid-svg-icons";

const BASE_URL = "http://localhost/storage/";

export default function ListenerHome() {
  const { user } = useStateContext();
  const [albums, setAlbums] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null); // State to store selected album details
  const [selectedSong, setSelectedSong] = useState(null);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/albums")
      .then((response) => {
        setAlbums(response.data);
      })
      .catch((error) => console.error("Error fetching albums:", error));
  }, []);

  useEffect(() => {
    if (selectedAlbum) {
      axiosClient
        .get(`/albums/${selectedAlbum.id}/songs`)
        .then((response) => {
          setSongs(response.data.songs);
        })
        .catch((error) => console.error("Error fetching songs:", error));
    }
  }, [selectedAlbum]);

  const openSidebar = (album) => {
    setSelectedAlbum(album);
    setShowSidebar(true);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const playSong = (songId) => {
    console.log(songId);
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
      <div className="p-5">
        <h1>Welcome back {user.name}</h1>
        <div className="d-flex">
          <div className="d-flex relative w-100 album-section-1">
            {albums.map((album) => (
              <AlbumCard
                key={album.id}
                imageUrl={BASE_URL + album.photo}
                title={album.title}
                description={album.description}
                onClick={() => openSidebar(album)} // Pass album details to openSidebar
              />
            ))}
          </div>
        </div>
        <div className={`sidebar ${showSidebar ? "open" : ""}`}>
          <button className="close-btn btn btn-danger" onClick={closeSidebar}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          {/* Display album details in the sidebar */}
          {selectedAlbum && (
            <div className="d-flex flex-column p-5 ">
              <div className="sidebar-image align-self-center">
                <img src={BASE_URL + selectedAlbum.photo} alt="Album Cover" />
              </div>
              <h3>{selectedAlbum.title}</h3>
              <p>{selectedAlbum.description}</p>
              <div>
                <DataTable value={songs}>
                  <Column field="title" header="Song Title" />
                  <Column
                    header="Actions"
                    body={(rowData) => (
                      <button onClick={() => playSong(rowData.id)} className="btn btn-success"><FontAwesomeIcon icon={faPlay}/></button>
                    )}
                  />
                </DataTable>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="position-absolute w-100 bottom-0 audio-player">

      <ReactAudioPlayer autoPlay controls src={selectedSong} />
      </div>
    </div>
  );
}
