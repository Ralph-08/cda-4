import { NavLink } from "react-router-dom";
import "./Header.scss";

function Header() {
  return (
    <header className="header">
      <nav className="header__nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            "header__nav-link" + (isActive ? " header__nav-link--active" : "")
          }
        >
          Ordenar
        </NavLink>
        <NavLink
          to="/warehouses"
          className={({ isActive }) =>
            "header__nav-link" + (isActive ? " header__nav-link--active" : "")
          }
        >
          Ordenes
        </NavLink>
        <NavLink
          to="/inventory"
          className={({ isActive }) =>
            "header__nav-link" + (isActive ? " header__nav-link--active" : "")
          }
        >
          Historial
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
