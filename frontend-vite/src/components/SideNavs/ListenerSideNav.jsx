import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSearch,
  faMusic,
  faPodcast,
  faVideo,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/images/YOUTIFY.png";
import PlaylistItem from "../Listener/PlaylistItem";

function ListenerSideNav() {
  return (
    <div className="w-25 side-navigation overflow-hidden">
      <aside className="d-flex flex-column">
        <div className="p-3">
          <img src={logo} alt="YOUTIFY" />
        </div>
        <div className="d-flex flex-column vh-50">
          <NavLink
            to="/home"
            className="side-nav-item-selector"
            activeclassname="active"
          >
            <div className="side-nav-item">
              <FontAwesomeIcon icon={faHome} className="side-nav-logo" /> Home
            </div>
          </NavLink>
          <NavLink
            to="/search"
            className="side-nav-item-selector"
            activeclassname="active"
          >
            <div className="side-nav-item">
              <FontAwesomeIcon icon={faSearch} className="side-nav-logo" />{" "}
              Search
            </div>
          </NavLink>
          <NavLink
            to="/music"
            className="side-nav-item-selector"
            activeclassname="active"
          >
            <div className="side-nav-item">
              <FontAwesomeIcon icon={faMusic} className="side-nav-logo" /> Music
            </div>
          </NavLink>
          <NavLink
            to="/podcast"
            className="side-nav-item-selector"
            activeclassname="active"
          >
            <div className="side-nav-item">
              <FontAwesomeIcon icon={faPodcast} className="side-nav-logo" />{" "}
              Podcast
            </div>
          </NavLink>
          <NavLink
            to="/videocast"
            className="side-nav-item-selector"
            activeclassname="active"
          >
            <div className="side-nav-item">
              <FontAwesomeIcon icon={faVideo} className="side-nav-logo" />{" "}
              Videocast
            </div>
          </NavLink>
        </div>
        <div className="d-flex justify-content-around align-items-center">
          <p className=" your-playlist-title">YOUR PLAYLIST</p>
          <button className="d-flex btn btn-danger add-playlist-button"><FontAwesomeIcon icon={faPlus} /></button>
        </div>
        <div className="d-flex flex-column bottom-side-nav-container">
          <div className="d-flex flex-column overflow-auto align-items-center">
            <div className="d-flex flex-column flex-grow-1 playlist-container rounded-4 p-3">
              {/* Playlist Container*/}
              {/* Add Playlists here */}
              <PlaylistItem playlistName="Test Playlist 1" />
              <PlaylistItem playlistName="Test Playlist 2" />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default ListenerSideNav;
