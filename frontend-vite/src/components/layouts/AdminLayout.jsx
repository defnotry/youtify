import { useStateContext } from "../../contexts/ContextProvider";
import { Navigate, Outlet } from "react-router-dom";
import "../../assets/styles/custom.css";
import "../../assets/styles/admin.css";
import ProfileCard from "../Cards/ProfileCard";
import AdminSideNav from "../SideNavs/AdminSideNav";
import axiosClient from "../../axios-client";
import { useEffect } from "react";

export default function AdminLayout() {
  const { user, token, setUser } = useStateContext();

  
  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  },[setUser]);

  if (!token) {
    return <Navigate to="/welcome" />;
  }
  

  if (!user.user_type == "admin")  {
    return <Navigate to="/access-denied" />;
  }

  return (
    <div className="d-flex text-white vh-100">
      {/**side nav */}
      <AdminSideNav />
      <div className="d-flex flex-column w-100 page-bg">
        <header className="d-flex justify-content-end align-items-center p-2 z">
          <ProfileCard username={user?.name || "Guest"} />
        </header>
        <div className="vh-100 p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
