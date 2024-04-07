import logo from "../../assets/images/YOUTIFY.png";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadset, faMoneyBill, faMusic, faPodcast, faTh, faUser, faVideoCamera } from "@fortawesome/free-solid-svg-icons";

export default function AdminSideNav() {
  return (
    <div className="w-25 side-navigation overflow-hidden">
      <aside className="d-flex flex-column">
        <div className="p-3">
          <img src={logo} alt="YOUTIFY" />
        </div>
        <div className="d-flex flex-column vh-50">
          <NavLink
            to="/admin/dashboard"
            className="side-nav-item-selector"
            activeclassname="active"
          >
            <div className="side-nav-item">
              <FontAwesomeIcon icon={faTh} className="side-nav-logo" />{" "}
              Dashboard
            </div>
          </NavLink>
          <NavLink
            to="/admin/artists"
            className="side-nav-item-selector"
            activeclassname="active">
                <div className="side-nav-item">
                    <FontAwesomeIcon icon={faUser} className="side-nav-logo" /> Artists
                </div>
            </NavLink>
            <NavLink to="/admin/listeners" className="side-nav-item-selector"
            activeclassname="active">
                <div className="side-nav-item"><FontAwesomeIcon icon={faHeadset} className="side-nav-logo" /> Listeners</div>
            </NavLink>
            <NavLink to="/admin/music-list" className="side-nav-item-selector"
            activeclassname="active">
                <div className="side-nav-item"><FontAwesomeIcon icon={faMusic} className="side-nav-logo" /> Music List</div>
            </NavLink>
            <NavLink to="/admin/podcasts-list" className="side-nav-item-selector"
            activeclassname="active">
                <div className="side-nav-item"><FontAwesomeIcon icon={faPodcast} className="side-nav-logo" /> Podcast List</div>
            </NavLink>
            <NavLink to="/admin/videocasts-list" className="side-nav-item-selector"
            activeclassname="active">
                <div className="side-nav-item"><FontAwesomeIcon icon={faVideoCamera} className="side-nav-logo" /> Videocast List</div>
            </NavLink>
            <NavLink to="/admin/pricing-settings" className="side-nav-item-selector"
            activeclassname="active">
                <div className="side-nav-item"><FontAwesomeIcon icon={faMoneyBill} className="side-nav-logo" /> Pricing Adjustment</div>
            </NavLink>
        </div>
      </aside>
    </div>
  );
}
