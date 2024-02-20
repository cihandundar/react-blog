import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const user = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  console.log(user?.user);

  return user?.user ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: pathname }} replace />
  );
};

export default PrivateRoute;
