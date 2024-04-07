import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import ListenerSideNav from "../SideNavs/ListenerSideNav";
import ProfileCard from "../Cards/ProfileCard";
import "../../assets/styles/custom.css";
import { useEffect } from "react";
import axiosClient from "../../axios-client";

export default function ListenerLayout() {
  const { user, token, setUser } = useStateContext();

  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, [setUser]);

  if (!token) {
    return <Navigate to="/welcome" />;
  }

  if (user.user_type == "admin")  {
    return <Navigate to="/admin/dashboard" />;
  }

  if (user.user_type == "artist")  {
    return <Navigate to="/artist/profile" />;
  }

  return (
    <div className="d-flex text-white vh-100">
      {/*Left Side navigation*/}
      <ListenerSideNav />

      <div className="d-flex flex-column w-100 page-bg">
        <header className="d-flex justify-content-end align-items-center p-2 z">
          <div>
            <button className="btn btn-danger rounded-pill">
              Explore Premium
            </button>
          </div>
          <ProfileCard username={user?.name || "Guest"} />
        </header>
        <div className="vh-100 p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
