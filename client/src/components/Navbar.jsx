import { useState } from "react";
import { BiExit } from "react-icons/bi";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function NavBar() {
  const [isActive, setActive] = useState(false);
  const { logout, isAuthenticated } = useAuth();

  return !isAuthenticated ? (
    ""
  ) : (
    <nav
      className="navbar is-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        {/* <a className="navbar-item" href="https://bulma.io">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
            height="28"
          />
        </a> */}

        <a
          onClick={() => setActive(!isActive)}
          role="button"
          className={`navbar-burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        className={`navbar-menu ${isActive ? "is-active" : ""}`}
      >
        <div className="navbar-start">
          {/* <a className="navbar-item">Home</a> */}

          {/* <a className="navbar-item">Documentation</a> */}

          {/* <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">More</a>

            <div className="navbar-dropdown">
              <a className="navbar-item">About</a>
              <a className="navbar-item">Jobs</a>
              <a className="navbar-item">Contact</a>
              <hr className="navbar-divider" />
              <a className="navbar-item">Report an issue</a>
            </div>
          </div> */}
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link to="/" onClick={() => logout()}>
                <button className="button is-link">
                  <span className="icon">
                    <i className="fab fa-github"></i>
                    <BiExit />
                  </span>
                  <span>Salir</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
