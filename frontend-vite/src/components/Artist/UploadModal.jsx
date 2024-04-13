import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import Select from "react-select";
import H5AudioPlayer from "react-h5-audio-player";
import PropTypes from "prop-types";
import axiosClient from "../../axios-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import albumPhotoPlaceholder from "../../assets/images/no-image.jpg";
import { faFileUpload, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useStateContext } from "../../contexts/ContextProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UploadModal({ show, handleClose }) {
  const { user } = useStateContext();

  const [songs, setSongs] = useState([]);
  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);
  const [album, setAlbum] = useState({
    title: "",
    description: "",
    photo: null,
  });

  useEffect(() => {
    axiosClient
      .get("/genres")
      .then((response) => {
        setGenres(response.data);
      })
      .catch((error) => {
        toast.error("Error fetching genres:", error);
      });

    axiosClient
      .get("/artists")
      .then((response) => {
        const artistOptions = response.data.map((artist) => ({
          value: artist.id,
          label: artist.name,
        }));
        setArtists(artistOptions);
      })
      .catch((error) => {
        toast.error("Error fetching artists", error);
      });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: [],
    onDrop: (acceptedFiles) => {
      handleSongUpload(acceptedFiles);
    },
  });

  const genreOptions = genres?.map((genre) => ({
    value: genre.id,
    label: genre.name,
  }));

  const handleAlbumTitleChange = (e) => {
    setAlbum({ ...album, title: e.target.value });
  };

  const handleAlbumDescriptionChange = (e) => {
    setAlbum({ ...album, description: e.target.value });
  };

  const handleAlbumPhotoChange = (e) => {
    setAlbum({ ...album, photo: e.target.files[0] });
  };

  const handleGenreChange = (index, selectedOptions) => {
    const newSongs = [...songs];
    newSongs[index].genre = selectedOptions.map((option) => option.value);
    setSongs(newSongs);
  };

  const handleTitleChange = (index, event) => {
    const newSongs = [...songs];
    newSongs[index].title = event.target.value;
    setSongs(newSongs);
  };

  const handleRemoveSong = (index) => {
    const newSongs = [...songs];
    newSongs.splice(index, 1); // Remove the song at the specified index
    setSongs(newSongs);
  };

  const handleSongUpload = (acceptedFiles) => {
    // Create new song objects from the accepted audio files
    const newSongs = acceptedFiles
      .filter((file) => {
        // Check if the file type is audio
        const fileType = file.type.split("/")[0];
        return fileType === "audio";
      })
      .map((file) => ({
        title: file.name,
        genre: [],
        artists: [],
        file: file,
        preview: URL.createObjectURL(file),
      }));

    // Append the new songs to the existing songs state
    setSongs((prevSongs) => [...prevSongs, ...newSongs]);
  };

  const handleArtistChange = (index, selectedOptions) => {
    const newSongs = [...songs];
    newSongs[index].artists = selectedOptions.map((option) => option.value);
    setSongs(newSongs);
  };

  const createAlbum = async () => {
    const formData = new FormData();
    formData.append("title", album.title);
    formData.append("description", album.description);
    formData.append("photo", album.photo);
    formData.append("artist_id", user.id);

    try {
      const response = await axiosClient.post(
        "/albums/create-album",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const uploadSongs = async (albumId, songs) => {
    const uploadedSongs = [];

    for (const song of songs) {
      const formData = new FormData();

      formData.append("title", song.title);
      song.genre.forEach((genre, index) => {
        formData.append(`genres[${index}]`, genre);
      });
      song.artists.forEach((artist, index) => {
        formData.append(`artists[${index}]`, artist);
      });

      formData.append("artist_id", user.id);
      formData.append("file", song.file, song.file.name);

      try {
        const response = await axiosClient.post(
          `/albums/${albumId}/songs/upload-songs`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        uploadedSongs.push(response.data);
      } catch (error) {
        toast.error(error);
        throw error;
      }
    }

    return uploadedSongs;
  };

  const createAlbumAndUploadSongs = async () => {
    try {
      const albumResponse = await createAlbum();
      const albumId = albumResponse.data.id;

      const uploadedSongs = await uploadSongs(albumId, songs);
      console.log("Uploaded songs:", uploadedSongs);

      // Show toast notification
      toast.success("Songs uploaded successfully!");

      // Reset state and close modal
      setAlbum({
        title: "",
        description: "",
        photo: null,
      });
      setSongs([]);
      handleClose();
    } catch (error) {
      toast.error("Error uploading songs");
      throw error;
    }
  };

  return (
    <>
      <ToastContainer />
      <Modal show={show} onHide={handleClose} className="text-white" size="lg">
        <Modal.Header closeButton className="upload-music-modal">
          <Modal.Title>Upload Music</Modal.Title>
        </Modal.Header>
        <Modal.Body className="upload-music-modal">
          <div className="d-flex flex-column mb-5">
            <div className="d-flex flex-row ">
              <div className="d-flex flex-column h-100 album-photo-container mr-4">
                <img
                  src={
                    album.photo
                      ? URL.createObjectURL(album.photo)
                      : albumPhotoPlaceholder
                  }
                  alt="ALBUM PHOTO"
                  className="album-photo mb-2"
                />
                <div className="custom-file-input-container">
                  <label
                    htmlFor="fileInput"
                    className="btn btn-primary"
                    style={{
                      background: "#00C700",
                      border: "#1e1e1e solid 1px",
                    }}
                  >
                    Select Album Photo
                    <Form.Control
                      type="file"
                      onChange={handleAlbumPhotoChange}
                      className="custom-file-input"
                      id="fileInput"
                    />
                  </label>
                </div>
              </div>
              <div className="d-flex flex-column w-100 mb-5">
                <Form.Group controlId="albumTitle" className="mb-2">
                  <Form.Label>Album Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter album title"
                    onChange={handleAlbumTitleChange}
                    className="modal-custom-input text-white"
                  />
                </Form.Group>
                <Form.Group controlId="albumDescription" className="mb-2">
                  <Form.Label>Album Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={8}
                    onChange={handleAlbumDescriptionChange}
                    className="modal-custom-input text-white"
                  />
                </Form.Group>
              </div>
            </div>
            <div
              className="dropzone-container"
              {...getRootProps({ className: "dropzone" })}
            >
              <input {...getInputProps()} />
              <p>Drop your songs here, or click to select.</p>
              <FontAwesomeIcon icon={faFileUpload} />
            </div>
          </div>
          {songs.map((song, index) => (
            <div key={index} className="d-flex flex-column">
              <div className="d-flex w-100 align-items-center">
                <div className="d-flex flex-column w-50 mr-3">
                  <label htmlFor="title">Song Title</label>
                  <input
                    type="text"
                    id="title"
                    value={song.title}
                    onChange={(event) => handleTitleChange(index, event)}
                    className="form-control mb-2"
                    placeholder="Title"
                  />
                  <label htmlFor="genres">Genres</label>
                  <Select
                    inputId="genres"
                    isMulti
                    options={genreOptions}
                    className="mb-2"
                    onChange={(selectedOptions) =>
                      handleGenreChange(index, selectedOptions)
                    }
                  />
                  <label htmlFor="artists">Featured Artists</label>
                  <Select
                    isMulti
                    inputId="artists"
                    options={artists}
                    onChange={(selectedOptions) =>
                      handleArtistChange(index, selectedOptions)
                    }
                  />
                </div>
                <div className="d-flex flex-column w-50 h-25 align-items-between">
                  <div className="d-flex justify-content-end">
                    <button
                      onClick={() => handleRemoveSong(index)}
                      className="btn btn-danger"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                  <H5AudioPlayer src={song.preview} />
                </div>
              </div>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer className="upload-music-modal">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={createAlbumAndUploadSongs}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

UploadModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
