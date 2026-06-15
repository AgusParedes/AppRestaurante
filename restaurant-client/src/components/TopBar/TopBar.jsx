import Icon from "../Icon";
import "./TopBar.scss";
import Logo from "../../assets/Logo_Sofita.png";

/**
 * TopBar — fixed header with title and left/right icon buttons.
 * @param {Function} onMenuClick  - handler for menu (hamburger) button
 * @param {Function} onBackClick  - handler for back arrow button
 * @param {boolean}  showBack     - show back arrow instead of hamburger
 */
const TopBar = ({ onMenuClick, onBackClick, showBack = false }) => (
  <header className="top-bar">

    <img src={Logo} alt="Lumiere Dining" className="top-bar__logo" />

  </header>
);

export default TopBar;
