import "./QtyControl.scss";

/**
 * QtyControl — circular +/- quantity selector for cart items.
 * @param {number}   value    - current quantity
 * @param {Function} onInc   - increment handler
 * @param {Function} onDec   - decrement handler (removes item at 0)
 */
const QtyControl = ({ value, onInc, onDec }) => (
  <div className="qty-control">
    <button className="qty-control__btn" onClick={onDec} aria-label="Reducir cantidad">−</button>
    <span className="qty-control__val">{value}</span>
    <button className="qty-control__btn" onClick={onInc} aria-label="Aumentar cantidad">+</button>
  </div>
);

export default QtyControl;
