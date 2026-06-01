import "./Navbar.scss";

import logo from "../../assets/SOFI.png";

function Navbar() {

  const now = new Date();

  const day = now.toLocaleDateString("es-AR", {
    weekday: "long",
    month: "long",
    day: "numeric"
  });

  const time = now.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <nav className="navbar">

      <div className="navbar__left">

        <img
          src={logo}
          alt="SOFIA Restaurant"
          className="navbar__logo"
        />

        <div className="navbar__info">

          <span className="navbar__date">
            {day}
          </span>

          <p className="navbar__subtitle">
            Restaurant Management System
          </p>

        </div>

      </div>

      <div className="navbar__right">

        <h2>{time}</h2>

      </div>

    </nav>
  );
}

export default Navbar;