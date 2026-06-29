import React, { useState } from 'react';
import { kitchenOrders as initial, menuItems } from '../data/mockData';
import './KitchenPage.scss';

const CATEGORIES = ['Todos', 'Mains', 'Starters', 'Drinks', 'Desserts'];

export default function KitchenPage() {
  const [orders, setOrders] = useState(initial);

  const markReady = (id) =>
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: 'ready' } : o)));

  const markDone = (id) =>
    setOrders((prev) => prev.filter((o) => o.id !== id));

  const cooking = orders.filter((o) => o.status === 'cooking');
  const ready   = orders.filter((o) => o.status === 'ready');

  return (
    <div className="kitchen-page">
      {/* Header */}
      <div className="kitchen-page__header">
        <div>
          <h2 className="kitchen-page__title">Vista de Cocina</h2>
          <p className="kitchen-page__sub">{cooking.length} en preparación · {ready.length} listas para servir</p>
        </div>
        <div className="kitchen-page__stats">
          <div className="kitchen-stat kitchen-stat--cooking">
            <span>{cooking.length}</span>
            <label>Cocinando</label>
          </div>
          <div className="kitchen-stat kitchen-stat--ready">
            <span>{ready.length}</span>
            <label>Listas</label>
          </div>
        </div>
      </div>

      {/* Boards */}
      <div className="kitchen-page__boards">
        {/* Cooking */}
        <div className="kitchen-board">
          <div className="kitchen-board__title cooking">
            <span className="kitchen-board__dot" />
            EN PREPARACIÓN ({cooking.length})
          </div>
          <div className="kitchen-board__cards">
            {cooking.map((order) => (
              <div key={order.id} className={`kitchen-ticket kitchen-ticket--cooking ${order.priority ? 'kitchen-ticket--priority' : ''}`}>
                <div className="kitchen-ticket__top">
                  <span className="kitchen-ticket__table">MESA {order.tableNumber}</span>
                  {order.priority && <span className="kitchen-ticket__priority">PRIORITY</span>}
                  <span className="kitchen-ticket__timer">⏱ {order.timer}</span>
                </div>
                <ul className="kitchen-ticket__items">
                  {order.items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
                <button className="kitchen-ticket__btn" onClick={() => markReady(order.id)}>
                  Marcar Listo ✓
                </button>
              </div>
            ))}
            {cooking.length === 0 && <p className="kitchen-board__empty">Sin órdenes en preparación</p>}
          </div>
        </div>

        {/* Ready */}
        <div className="kitchen-board">
          <div className="kitchen-board__title ready">
            <span className="kitchen-board__dot" />
            LISTO PARA SERVIR ({ready.length})
          </div>
          <div className="kitchen-board__cards">
            {ready.map((order) => (
              <div key={order.id} className="kitchen-ticket kitchen-ticket--ready">
                <div className="kitchen-ticket__top">
                  <span className="kitchen-ticket__table">MESA {order.tableNumber}</span>
                  <span className="kitchen-ticket__timer ready">⏱ {order.timer}</span>
                </div>
                <ul className="kitchen-ticket__items">
                  {order.items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
                <button className="kitchen-ticket__btn delivered" onClick={() => markDone(order.id)}>
                  Entregado →
                </button>
              </div>
            ))}
            {ready.length === 0 && <p className="kitchen-board__empty">Sin platos listos</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
