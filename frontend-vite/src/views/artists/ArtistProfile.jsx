import profileImg from "../../assets/images/People.png";
import "../../assets/styles/custom.css";
import { useStateContext } from "../../contexts/ContextProvider";
export default function ArtistProfile() {

  const {user} = useStateContext();

  return (
    <div className="d-flex flex-column p-5">
      <div className="d-flex w-100 p-2">
        <div className="">
          <img src={profileImg} alt="" className="artist-profile" />
        </div>
        <div className="d-flex flex-column justify-content-center ml-4">
          <h1>{user.name}</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
            metus justo. Fusce hendrerit odio ac magna malesuada, a bibendum
            purus vestibulum. Phasellus eget ipsum sit amet justo vestibulum
            viverra. Nullam nec odio nec risus ultricies ultrices vel nec est.
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia Curae; Pellentesque nec ipsum eget est efficitur
            interdum. Duis id libero eu lacus eleifend vulputate. Nulla in
            tempor ex. Etiam at orci fermentum, vulputate nulla id, viverra
            justo. Donec ac justo eu nisi efficitur placerat. Integer accumsan
            ipsum vitae fringilla aliquet. Nam lacinia, ligula eget venenatis
            fermentum, ipsum metus tristique lacus, a vehicula magna dolor id
            orci.
          </p>
        </div>
      </div>
    </div>
  );
}
