import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar/TopBar";
import Icon from "../../components/Icon";
import { PAYMENT_METHODS } from "../../data/menuData";
import "./PaymentPage.scss";

/**
 * PaymentPage — order summary, payment method selector and confirm button.
 * @param {Array}    cartItems    - items in cart
 * @param {Function} setCartItems - clears cart after payment
 */
const PaymentPage = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();

  const [selectedMethod, setSelectedMethod] = useState("card");
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderCode, setOrderCode] = useState("");

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const tip = subtotal * 0.1;
  const total = subtotal + tip;

  const handleConfirm = async () => {
    if (cartItems.length === 0 || loading) return;

    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://localhost:3001/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethod: selectedMethod,
          items: cartItems,
        }),
      });

      if (!res.ok) {
        throw new Error("No se pudo guardar el pedido");
      }

      const savedOrder = await res.json();

      setOrderCode(savedOrder.code);
      setConfirmed(true);

      setTimeout(() => {
        setCartItems([]);
        navigate("/menu");
      }, 3000);
    } catch (err) {
      setError(err.message || "Ocurrió un error al confirmar el pedido");
    } finally {
      setLoading(false);
    }
  };

  if (confirmed) {
    return (
      <div className="confirmation-screen">
        <div className="confirmation-screen__circle">
          <Icon name="check_circle" className="confirmation-screen__icon" />
        </div>

        <h2 className="confirmation-screen__title">¡Pedido Confirmado!</h2>

        <p className="confirmation-screen__sub">
          Tu pedido está siendo preparado. Tiempo estimado: 20–25 min.
        </p>

        <span className="confirmation-screen__order">
          Pedido #{orderCode}
        </span>
      </div>
    );
  }

  return (
    <>
      <TopBar showBack onBackClick={() => navigate("/cart")} />

      <main className="page-main">
        <section className="payment-summary">
          <h2 className="page-heading__title">Resumen de tu pedido</h2>

          <div className="payment-summary__card">
            {cartItems.length === 0 ? (
              <p className="payment-summary__empty">
                No hay productos en el carrito.
              </p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="payment-summary__row">
                  <div className="payment-summary__item">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="payment-summary__img"
                    />

                    <div>
                      <p className="payment-summary__name">{item.name}</p>
                      <p className="payment-summary__qty">x{item.qty}</p>
                    </div>
                  </div>

                  <span className="payment-summary__price">
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              ))
            )}

            <div className="payment-summary__divider" />

            <div className="payment-summary__totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>Propina sugerida</span>
                <span>${tip.toFixed(2)}</span>
              </div>

              <div className="summary-row summary-row--total">
                <span>Total</span>
                <span className="summary-row__amount">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="payment-methods">
          <h2 className="page-heading__title">Método de Pago</h2>

          <div className="payment-methods__list">
            {PAYMENT_METHODS.map((m) => (
              <button
                key={m.id}
                type="button"
                className={`payment-method ${
                  selectedMethod === m.id ? "payment-method--active" : ""
                }`}
                onClick={() => setSelectedMethod(m.id)}
              >
                <div className="payment-method__icon-wrap">
                  <Icon name={m.icon} />
                </div>

                <div className="payment-method__text">
                  <p className="payment-method__label">{m.label}</p>
                  <p className="payment-method__sub">{m.sub}</p>
                </div>

                {selectedMethod === m.id && (
                  <Icon name="check_circle" className="payment-method__check" />
                )}
              </button>
            ))}
          </div>
        </section>

        {error && <p className="payment-error">{error}</p>}

        <div className="payment-confirm">
          <button
            type="button"
            className="btn btn--primary btn--lg"
            onClick={handleConfirm}
            disabled={loading || cartItems.length === 0}
          >
            <Icon name="lock" className="btn__icon" />
            {loading
              ? "Procesando..."
              : `Confirmar y Pagar $${total.toFixed(2)}`}
          </button>
        </div>
      </main>
    </>
  );
};

export default PaymentPage;