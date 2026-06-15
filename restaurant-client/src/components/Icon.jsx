/**
 * Icon — thin wrapper around Material Symbols Outlined font.
 * @param {string}  name      - Material Symbol name (e.g. "search")
 * @param {boolean} filled    - Whether to use the filled variant
 * @param {string}  className - Extra CSS classes
 */
const Icon = ({ name, filled = false, className = "" }) => (
  <span
    className={`material-symbols-outlined ${className}`}
    style={{
      fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
    }}
  >
    {name}
  </span>
);

export default Icon;
