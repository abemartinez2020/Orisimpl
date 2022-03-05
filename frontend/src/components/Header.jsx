import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
function Header() {
  return (
    <header className="header">
      <div>
        <Link to="/">
          <h1>
            <img src="./Orisimpl_logo.png" width="20px" />
            Orisimpl
          </h1>
        </Link>
      </div>

      <ul>
        <li>
          <Link to="/login">
            <FaSignInAlt />
            Login
          </Link>
        </li>
        <li>
          <Link to="/register">
            <FaUser />
            Register
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
