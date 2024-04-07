
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types"; // Import PropTypes

function PlaylistItem({ playlistName }) {
  return (
    <div className="mb-4">
      <FontAwesomeIcon icon={faList} className="side-nav-logo" />
      {playlistName}
    </div>
  );
}

// PropTypes validation
PlaylistItem.propTypes = {
    playlistName: PropTypes.string.isRequired // Ensure playlistName is a string and is required
  };

export default PlaylistItem;
