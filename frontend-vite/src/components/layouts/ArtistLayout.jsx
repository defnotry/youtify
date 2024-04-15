import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";
import { Outlet } from "react-router-dom";
import ArtistSideNav from "../SideNavs/ArtistSideNav";
import { Dropdown } from "react-bootstrap";
import UploadModal from "../Artist/UploadModal";

import "../../assets/styles/custom.css";
import ArtistProfileCard from "../Cards/ArtistProfileCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMusic,
  faPlusCircle,
  faPodcast,
  faVideoCamera,
} from "@fortawesome/free-solid-svg-icons";

export default function ArtistLayout() {
  const { user, token, setUser } = useStateContext();

  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleShowUploadModal = () => setShowUploadModal(true);
  const handleCloseUploadModal = () => setShowUploadModal(false);

  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, [setUser]);

  if (!token) {
    return <Navigate to="/welcome" />;
  }

  if (!user.user_type == "artist") {
    return <Navigate to="/access-denied" />;
  }

  return (
    <div className="d-flex text-white vh-100 mw-100">
      <ArtistSideNav />
      <div className="d-flex flex-column w-100 page-bg flex-grow-1">
        <header className="d-flex justify-content-end align-items-center p-2 z">
          <div className="d-flex profile-card rounded-4">
            <Dropdown className="bg-dark">
              <Dropdown.Toggle className="d-flex border-success bg-success align-items-center">
                <div className="d-flex justify-content-between align-items-center">
                  <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
                  <div>Upload</div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item className="mb-2" onClick={handleShowUploadModal}>
                  <FontAwesomeIcon icon={faMusic} /> Music
                </Dropdown.Item>

                <Dropdown.Item className="mb-2">
                  <FontAwesomeIcon icon={faPodcast} /> Podcast
                </Dropdown.Item>

                <Dropdown.Item className="mb-2">
                  <FontAwesomeIcon icon={faVideoCamera} /> Videocast
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <ArtistProfileCard username={user?.name || "Guest"} />
        </header>

        <div className="d-flex flex-column flex-grow-1 position-relative">
          <Outlet />
          <UploadModal
            show={showUploadModal}
            handleClose={handleCloseUploadModal}
          />
        </div>
      </div>
    </div>
  );
}
