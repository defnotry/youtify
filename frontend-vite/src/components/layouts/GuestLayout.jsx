import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";

export default function GuestLayout() {
  const { user, token } = useStateContext();

  if (token) {
    if (user.user_type === "listener") {
      return <Navigate to="/home" />;
    } else if (user.user_type === 'artist') {
      return <Navigate to="/artist/profile" />
    }
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
