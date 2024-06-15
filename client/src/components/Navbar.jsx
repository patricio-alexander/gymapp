import { useState } from "react";
import { BiExit } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function NavBar() {
  const [isActive, setActive] = useState(false);
  const { logout, isAuthenticated } = useAuth();

  return !isAuthenticated ? (
    ""
  ) : (
    <nav className="navbar is-transparent">
      <div className="navbar-brand">
        <div
          data-target="navbarExampleTransparentExample"
          onClick={() => setActive(!isActive)}
          className={`navbar-burger ${isActive ? "is-active" : ""}`}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div
        id="navbarExampleTransparentExample"
        className={`navbar-menu ${isActive ? "is-active" : ""}`}
      >
        <div className="navbar-start">
          <Link to="/clientes" className="navbar-item">
            <span className="icon-text">
              <span className="icon">
                <FiUser />
              </span>
              <span>Clientes</span>
            </span>
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="field is-grouped">
              <p className="control">
                <Link to="/" onClick={() => logout()}>
                  <button className="button is-link">
                    <span className="icon">
                      <i className="fab fa-github"></i>
                      <BiExit />
                    </span>
                    <span>Salir</span>
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
