import PropTypes from "prop-types";
import { Dropdown } from "react-bootstrap";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

function ArtistProfileCard() {

  const { setUser, setToken } = useStateContext();
  const handleLogout = () => {
  
    axiosClient.post('/logout')
      .then(() => {
        // Clear user and token from context or local storage
        setUser(null);
        setToken(null);
      })
      .catch(error => {
        // Handle error, if any
        console.error('Logout error:', error);
      });
  }


  return (
    <div className="d-flex profile-card rounded-4">
      <Dropdown className="bg-dark">
        <Dropdown.Toggle className="d-flex bg-dark border-danger align-items-center">
          <div className="d-flex justify-content-between align-items-center">
            <div><FontAwesomeIcon icon={faGear} /></div>
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

ArtistProfileCard.propTypes = {
  username: PropTypes.string.isRequired,
};

export default ArtistProfileCard;
