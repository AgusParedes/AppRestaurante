import React, { useState } from 'react';
import './LiveKitchen.scss';

export default function LiveKitchen({ orders, onMarkReady }) {
  const [readyIds, setReadyIds] = useState([]);

  const handleReady = (id) => {
    setReadyIds((prev) => [...prev, id]);
    setTimeout(() => {
      onMarkReady(id);
      setReadyIds((prev) => prev.filter((x) => x !== id));
    }, 800);
  };

  const active = orders.filter((o) => o.status !== 'done');

  return (
    <aside className="live-kitchen">
      <div className="live-kitchen__header">
        <span className="live-kitchen__title">LIVE KITCHEN</span>
        {active.filter((o) => o.priority).length > 0 && (
          <span className="live-kitchen__badge">
            {active.filter((o) => o.priority).length} Priority
          </span>
        )}
      </div>

      <div className="live-kitchen__list">
        {active.length === 0 && (
          <div className="live-kitchen__empty">Sin órdenes activas</div>
        )}
        {active.map((order) => (
          <div
            key={order.id}
            className={`kitchen-card ${order.priority ? 'kitchen-card--priority' : ''} ${readyIds.includes(order.id) ? 'kitchen-card--marking' : ''}`}
          >
            <div className="kitchen-card__top">
              <span className="kitchen-card__table">TABLE {order.tableNumber}</span>
              <span className="kitchen-card__timer">
                <span className="kitchen-card__timer-icon">⏱</span>
                {order.timer}
              </span>
            </div>
            <ul className="kitchen-card__items">
              {order.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <button
              className="kitchen-card__btn"
              onClick={() => handleReady(order.id)}
              disabled={readyIds.includes(order.id)}
            >
              {readyIds.includes(order.id) ? '✓ Listo' : 'Mark Ready'}
            </button>
          </div>
        ))}
      </div>

      <div className="live-kitchen__footer">
        <div className="live-kitchen__stat">
          <span className="live-kitchen__stat-num">{orders.filter((o) => o.status === 'ready').length + 14}</span>
          <span className="live-kitchen__stat-label">READY</span>
        </div>
        <div className="live-kitchen__stat">
          <span className="live-kitchen__stat-num">{active.length + 4}</span>
          <span className="live-kitchen__stat-label">PENDING</span>
        </div>
      </div>
    </aside>
  );
}
