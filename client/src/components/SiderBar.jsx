import { FiUsers, FiPieChart } from "react-icons/fi";
// import { BiTable } from "react-icons/bi";

import { Link } from "react-router-dom";

function SideBar() {
  return (
    <aside className="column is-2 sidebar section is-hidden-mobile is-dark-3 is-shadow has-shadow">
      <p className="menu-label is-size-5 m-5 is-hidden-touch has-text-danger has-text-weight-semibold">
        Iron Panel
      </p>

      <ul className="menu-list p-3">
        <li>
          <Link to="/">
            <span className="icon-text">
              <span className="icon">
                <FiPieChart />
              </span>
              <span>Dashboard</span>
            </span>
          </Link>
        </li>

        <li>
          <Link  to="/clientes">
            <span className="icon-text">
              <span className="icon">
                {/* <BiTable /> */}
                <FiUsers />
              </span>
              <span>Clientes</span>
            </span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default SideBar;
