import { NavLink } from "react-router-dom";
import logo from "../../assets/images/YOUTIFY.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faUser } from "@fortawesome/free-solid-svg-icons";

export default function ArtistSideNav() {
  return (
    <div className="w-25 side-navigation overflow-hidden">
      <aside className="d-flex flex-column">
        <div className="p-3">
          <img src={logo} alt="YOUTIFY" />
        </div>
        <div className="d-flex flex-column vh-50">
        <NavLink
            to="/artist/profile"
            className="side-nav-item-selector"
            activeclassname="active"
          >
            <div className="side-nav-item">
              <FontAwesomeIcon icon={faUser} className="side-nav-logo" />{" "}
              Profile
            </div>
          </NavLink>
          <NavLink
            to="/artist/all-songs"
            className="side-nav-item-selector"
            activeclassname="active"
          >
            <div className="side-nav-item">
              <FontAwesomeIcon icon={faMusic} className="side-nav-logo" />{" "}
              All Songs
            </div>
          </NavLink>
        </div>
      </aside>
    </div>
  );
}
