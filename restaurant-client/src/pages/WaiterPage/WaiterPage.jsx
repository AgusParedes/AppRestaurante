import { useState } from "react";
import TopBar from "../../components/TopBar/TopBar";
import Icon from "../../components/Icon";
import { IMG, WAITER_OPTIONS } from "../../data/menuData";
import "./WaiterPage.scss";

/**
 * WaiterPage — asymmetric food grid + call-waiter modal with quick options.
 */
const WaiterPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast]         = useState(null);

  const handleRequest = (label) => {
    setModalOpen(false);
    setTimeout(() => {
      setToast(label);
      setTimeout(() => setToast(null), 4000);
    }, 300);
  };

  return (
    <>
      <TopBar />

      <main className="page-main">
        {/* ── Table status ── */}
        <div className="waiter-status">
          <div className="waiter-status__row">
            <span className="waiter-status__table">Mesa 12</span>
            <span className="waiter-status__dot" />
            <span className="waiter-status__active">En curso</span>
          </div>
          <h2 className="page-heading__title">Experiencia Gastronómica</h2>
        </div>

        {/* ── Asymmetric food grid ── */}
        <div className="waiter-grid">
          <div className="waiter-grid__hero">
            <img src={IMG.pulpo} alt="Pulpo al Olivo" className="waiter-grid__hero-img" />
            <div className="waiter-grid__hero-body">
              <div className="waiter-grid__hero-row">
                <h3 className="waiter-grid__hero-name">Pulpo al Olivo</h3>
                <span className="waiter-grid__hero-price">$32.00</span>
              </div>
              <p className="waiter-grid__hero-desc">
                Pulpo tierno cocido a baja temperatura, aceite de oliva premium y aceituna botija.
              </p>
            </div>
          </div>

          <div className="waiter-grid__side">
            <div className="waiter-grid__small-card">
              <img src={IMG.remolacha} alt="Remolacha" className="waiter-grid__small-img" />
              <div>
                <h4 className="waiter-grid__small-name">Ensalada de Remolacha</h4>
                <p className="waiter-grid__small-desc">Nueces caramelizadas y queso de cabra artesanal.</p>
                <span className="waiter-grid__small-price">$18.00</span>
              </div>
            </div>

            <div className="waiter-grid__promo">
              <h4 className="waiter-grid__promo-title">¿Listo para el Postre?</h4>
              <button className="waiter-grid__promo-btn">Ver Carta</button>
            </div>
          </div>
        </div>

        {/* ── Call waiter button ── */}
        <button className="call-waiter-btn" onClick={() => setModalOpen(true)}>
          <Icon name="notifications_active" className="call-waiter-btn__icon" />
          Llamar al Mesero
        </button>
      </main>

      {/* ── Modal ── */}
      {modalOpen && (
        <div className="waiter-overlay" onClick={() => setModalOpen(false)}>
          <div className="waiter-modal" onClick={(e) => e.stopPropagation()}>
            <div className="waiter-modal__header">
              <div className="waiter-modal__icon-wrap">
                <Icon name="notifications_active" className="waiter-modal__icon" />
              </div>
              <h3 className="waiter-modal__title">Llamar al Mesero</h3>
              <p className="waiter-modal__sub">Selecciona una opción para agilizar tu pedido</p>
            </div>

            <div className="waiter-modal__options">
              {WAITER_OPTIONS.map(({ icon, label }) => (
                <button key={label} className="waiter-option" onClick={() => handleRequest(label)}>
                  <div className="waiter-option__left">
                    <Icon name={icon} className="waiter-option__icon" />
                    <span className="waiter-option__label">{label}</span>
                  </div>
                  <Icon name="chevron_right" className="waiter-option__arrow" />
                </button>
              ))}
            </div>

            <button className="waiter-modal__cancel" onClick={() => setModalOpen(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* ── Confirmation toast ── */}
      {toast && (
        <div className="waiter-toast-container">
          <div className="waiter-toast">
            <Icon name="check_circle" className="waiter-toast__icon" />
            <span>Mesero notificado:<strong>{toast}</strong></span>
          </div>
        </div>
      )}
    </>
  );
};

export default WaiterPage;
