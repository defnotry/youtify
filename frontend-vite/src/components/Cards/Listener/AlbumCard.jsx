import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const AlbumCard = ({ imageUrl, title, description, onClick }) => {
 const [imageSrc, setImageSrc] = useState(null);

 useEffect(() => {
    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        setImageSrc(url);
      })
      .catch(error => console.error('Error fetching image:', error));
 }, [imageUrl]);

 return (
    <div className="album-card overflow-hidden" onClick={onClick}>
      <div className="d-flex w-100 h-75 justify-content-center align-items-center">
        {imageSrc && <img src={imageSrc} alt="Album Cover" className="album-image" loading="lazy" />}
      </div>
      <div className="p-2 overflow-hidden album-description">
        <h3>{title}</h3>
        <div className="h-100 w-100 justify-content-center align-items-center">
          <p className="text-center">{description}</p>
        </div>
      </div>
    </div>
 );
};

AlbumCard.propTypes = {
 imageUrl: PropTypes.string.isRequired,
 title: PropTypes.string.isRequired,
 description: PropTypes.string.isRequired,
 onClick: PropTypes.func.isRequired,
};

export default AlbumCard;
