import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.scss';

const NAV_ITEMS = [
  { to: '/', label: 'Salón', icon: '⊞' },
  { to: '/kitchen', label: 'Cocina', icon: '🍳' },
  { to: '/orders', label: 'Órdenes', icon: '📋' },
];

export default function Navbar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const fmt = (d) =>
    d.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: true });

  const fmtDate = (d) =>
    d.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <span className="navbar__logo">SOFITA</span>
        <span className="navbar__sub">Restaurant Management</span>
      </div>

      <div className="navbar__links">
        {NAV_ITEMS.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
          >
            <span className="navbar__link-icon">{icon}</span>
            <span className="navbar__link-label">{label}</span>
          </NavLink>
        ))}
      </div>

      <div className="navbar__right">
        <div className="navbar__date">{fmtDate(time)}</div>
        <div className="navbar__time">{fmt(time)}</div>
      </div>
    </nav>
  );
}
