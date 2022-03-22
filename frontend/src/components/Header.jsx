import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-md bg-light navbar-light py-3 fixed-top">
      <div className="container">
        <Link className="links" to="/">
          <h1 className="navbar-brand">
            <img
              src="./imgs/Orisimpl_logo.png"
              width="30px"
              style={{ paddingRight: "10px" }}
            />
            Orisimpl
          </h1>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navmenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse text-sm-end" id="navmenu">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <button className="btn btn-logout" onClick={handleLogout}>
                    <FaSignOutAlt />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="links" to="/login">
                    <FaSignInAlt />
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="links" to="/register">
                    <FaUser />
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
