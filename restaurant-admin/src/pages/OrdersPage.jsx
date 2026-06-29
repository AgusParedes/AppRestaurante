import React, { useState } from 'react';
import { tables, menuItems } from '../data/mockData';
import './OrdersPage.scss';

const CATEGORIES = ['Todos', 'Mains', 'Starters', 'Drinks', 'Desserts'];

export default function OrdersPage() {
  const [selectedTable, setSelectedTable] = useState(tables[2]); // default table 03
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState('Todos');

  const filtered = category === 'Todos' ? menuItems : menuItems.filter((m) => m.category === category);

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((c) => c.id === item.id);
      if (exists) return prev.map((c) => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const exists = prev.find((c) => c.id === id);
      if (exists.qty === 1) return prev.filter((c) => c.id !== id);
      return prev.map((c) => c.id === id ? { ...c, qty: c.qty - 1 } : c);
    });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const sendOrder = () => {
    if (cart.length === 0) return;
    alert(`Orden enviada a cocina para Mesa ${selectedTable.number} ✓`);
    setCart([]);
  };

  return (
    <div className="orders-page">
      {/* Table Selector */}
      <aside className="orders-page__sidebar">
        <div className="orders-sidebar__header">Seleccionar Mesa</div>
        {tables.map((t) => (
          <button
            key={t.id}
            className={`orders-table-btn orders-table-btn--${t.status} ${selectedTable?.id === t.id ? 'orders-table-btn--active' : ''}`}
            onClick={() => setSelectedTable(t)}
          >
            <span className="orders-table-btn__num">Mesa {t.number}</span>
            <span className="orders-table-btn__sub">{t.status === 'available' ? 'Libre' : t.server ?? 'Pendiente'}</span>
            {t.subtotal > 0 && (
              <span className="orders-table-btn__total">${t.subtotal.toFixed(0)}</span>
            )}
          </button>
        ))}
      </aside>

      {/* Menu */}
      <main className="orders-page__menu">
        <div className="orders-menu__header">
          <h2>Menú</h2>
          <div className="orders-menu__cats">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`orders-menu__cat ${category === cat ? 'orders-menu__cat--active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="orders-menu__grid">
          {filtered.map((item) => {
            const inCart = cart.find((c) => c.id === item.id);
            return (
              <button key={item.id} className="menu-item" onClick={() => addToCart(item)}>
                <span className="menu-item__cat">{item.category}</span>
                <span className="menu-item__name">{item.name}</span>
                <div className="menu-item__bottom">
                  <span className="menu-item__price">${item.price.toFixed(2)}</span>
                  {inCart && <span className="menu-item__qty">×{inCart.qty}</span>}
                </div>
              </button>
            );
          })}
        </div>
      </main>

      {/* Cart */}
      <aside className="orders-page__cart">
        <div className="orders-cart__header">
          <span>Orden Actual</span>
          {selectedTable && (
            <span className={`orders-cart__table orders-cart__table--${selectedTable.status}`}>
              Mesa {selectedTable.number}
            </span>
          )}
        </div>

        <div className="orders-cart__items">
          {cart.length === 0 && (
            <p className="orders-cart__empty">Agrega ítems del menú</p>
          )}
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item__info">
                <span className="cart-item__name">{item.name}</span>
                <span className="cart-item__price">${(item.price * item.qty).toFixed(2)}</span>
              </div>
              <div className="cart-item__controls">
                <button onClick={() => removeFromCart(item.id)}>−</button>
                <span>{item.qty}</span>
                <button onClick={() => addToCart(item)}>+</button>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="orders-cart__summary">
            <div className="orders-cart__total">
              <span>Total</span>
              <strong>${total.toFixed(2)}</strong>
            </div>
            <button className="orders-cart__send" onClick={sendOrder}>
              Enviar a Cocina 🍳
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
