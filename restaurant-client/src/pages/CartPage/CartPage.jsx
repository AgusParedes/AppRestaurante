import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar/TopBar";
import QtyControl from "../../components/QtyControl/QtyControl";
import Icon from "../../components/Icon";
import { CART_EXTRAS } from "../../data/menuData";
import "./CartPage.scss";

/**
 * CartPage — shows cart items, order summary and suggested extras.
 * @param {Array}    cartItems    - array of { ...item, qty }
 * @param {Function} setCartItems - cart state setter
 */
const CartPage = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();

  const updateQty = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const tip      = subtotal * 0.1;
  const total    = subtotal + tip;

  return (
    <>
      <TopBar showBack onBackClick={() => navigate("/menu")} />

      <main className="page-main">
        <div className="page-heading">
          <h2 className="page-heading__title">Tu Carrito</h2>
          <p className="page-heading__sub">Revisa tu selección antes de confirmar.</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-state">
            <Icon name="shopping_bag" className="empty-state__icon" />
            <p>Tu carrito está vacío</p>
          </div>
        ) : (
          <>
            {/* ── Cart items ── */}
            <div className="cart-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.img} alt={item.name} className="cart-item__img" />
                  <div className="cart-item__info">
                    <h3 className="cart-item__name">{item.name}</h3>
                    <p className="cart-item__unit-price">${item.price.toFixed(2)}</p>
                    <div className="cart-item__controls">
                      <QtyControl
                        value={item.qty}
                        onInc={() => updateQty(item.id, +1)}
                        onDec={() => updateQty(item.id, -1)}
                      />
                      <span className="cart-item__subtotal">
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Order summary ── */}
            <section className="order-summary">
              <h3 className="order-summary__title">Resumen del Pedido</h3>
              <div className="order-summary__rows">
                <div className="order-summary__row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="order-summary__row"><span>Propina sugerida</span><span>${tip.toFixed(2)}</span></div>
              </div>
              <div className="order-summary__total">
                <span>Total</span>
                <span className="order-summary__total-amount">${total.toFixed(2)}</span>
              </div>
              <button className="btn btn--primary btn--lg" onClick={() => navigate("/payment")}>
                <Icon name="payments" className="btn__icon" />
                Pagar ahora
              </button>
            </section>
          </>
        )}

        {/* ── Suggested extras ── */}
        <div className="extras">
          <h4 className="extras__title">¿Algo más?</h4>
          <div className="extras__scroll">
            {CART_EXTRAS.map((e) => (
              <div key={e.label} className="extras__card">
                <Icon name={e.icon} className="extras__icon" />
                <span className="extras__label">{e.label}</span>
                <span className="extras__price">+${e.price}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default CartPage;
