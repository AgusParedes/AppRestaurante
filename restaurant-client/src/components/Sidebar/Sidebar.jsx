import Icon from "../Icon";
import { SIDEBAR_LINKS } from "../../data/menuData";
import "./Sidebar.scss";

/**
 * Sidebar — slide-in drawer with navigation links.
 * @param {boolean}  open    - whether the sidebar is open
 * @param {Function} onClose - close handler
 */
const Sidebar = ({ open, onClose }) => (
  <>
    {open && <div className="sidebar-backdrop" onClick={onClose} aria-hidden="true" />}

    <nav className={`sidebar ${open ? "sidebar--open" : ""}`} aria-hidden={!open}>
      <div className="sidebar__profile">
        <div className="sidebar__avatar">
          <Icon name="person" />
        </div>
        <div>
          <p className="sidebar__name">Welcome back</p>
          <p className="sidebar__table">Mesa 12</p>
        </div>
      </div>

      {SIDEBAR_LINKS.map(({ icon, label }) => (
        <button key={label} className="sidebar__item">
          <Icon name={icon} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  </>
);

export default Sidebar;
