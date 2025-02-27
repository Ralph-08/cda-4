import { useState } from "react";
import "./SideMenu.scss";
import { NavLink } from "react-router-dom";

const SideMenu = ({ setShowMenu }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowMenu(false);
    }, 300);
  };

  return (
    <section className={!isClosing ? "menu" : "menu menu--fadeOut"}>
      <section
        className={
          !isClosing ? "menu__right" : "menu__right menu__right--closing"
        }
      >
        <button className="menu__button" onClick={handleClose}>
          {"< Cerrar"}
        </button>
        <ul className="menu__list">
          <li className="menu__item">
            <NavLink className="menu__link" to="/order-history">
              Historial
            </NavLink>
          </li>
          <li className="menu__item">
            <NavLink className="menu__link" to="/productos">
              Productos
            </NavLink>
          </li>
        </ul>
      </section>
    </section>
  );
};

export default SideMenu;
