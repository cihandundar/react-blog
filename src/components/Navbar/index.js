import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);

  const onLogout = async () => {
    await dispatch(logout());
    await dispatch(reset());
    navigate("/signin");
  };
  console.log(user?.user);
  return (
    <nav className="nav">
      <div className="nav__container">
        <div className="nav__logo">
          <h1>WARCRAFT</h1>
        </div>
        {user?.user ? (
          <ul className="nav__list">
            <li className="nav__list__link">
              <NavLink to="/addpost">Add Post</NavLink>
            </li>
            <li className="nav__list__link">
              <button onClick={onLogout} className="btn">
                Logout
              </button>
            </li>
            <li></li>
          </ul>
        ) : (
          <ul className="nav__list">
            <li className="nav__list__link">
              <NavLink to="/signin">Sign In</NavLink>
            </li>
            <li className="nav__list__link">
              <NavLink to="/signup">Sign Up</NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Sidebar;
