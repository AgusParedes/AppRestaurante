import "./Toast.scss";

/**
 * Toast — brief notification that slides up from above the bottom nav.
 * @param {string}  message - text to display
 * @param {boolean} visible - controls show/hide animation
 */
const Toast = ({ message, visible }) => (
  <div className={`toast ${visible ? "toast--visible" : ""}`} role="status" aria-live="polite">
    {message}
  </div>
);

export default Toast;
