import { useUserContext } from "../context/userContext";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const useAuth = () => {
  const { user } = useUserContext();
  return user;
};

function PrivateOutlet() {
  const location = useLocation();
  const isAuth = useAuth();
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
}

export default PrivateOutlet;
