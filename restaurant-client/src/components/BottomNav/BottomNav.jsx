import { Link, useLocation } from "react-router-dom";
import Icon from "../Icon";
import "./BottomNav.scss";

const NAV_ITEMS = [
  { path: "/menu",   icon: "restaurant_menu",     label: "Menú" },
  { path: "/cart",   icon: "shopping_bag",         label: "Carrito" },
  { path: "/waiter", icon: "notifications_active", label: "Mesero" },
];

/**
 * BottomNav — fixed dark navigation bar at the bottom.
 * Uses React Router Link for navigation and useLocation to detect active route.
 * @param {number} cartCount - number of items in cart (shows badge)
 */
const BottomNav = ({ cartCount }) => {
  const { pathname } = useLocation();

  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map(({ path, icon, label }) => {
        const isActive = pathname === path;
        return (
          <Link
            key={path}
            to={path}
            className={`bottom-nav__item ${isActive ? "bottom-nav__item--active" : ""}`}
            aria-label={label}
          >
            <Icon name={icon} filled={isActive} />
            <span>{label}</span>
            {path === "/cart" && cartCount > 0 && (
              <span className="bottom-nav__badge">{cartCount}</span>
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
