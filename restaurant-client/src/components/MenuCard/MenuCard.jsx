import Icon from "../Icon";
import "./MenuCard.scss";

/**
 * MenuCard — displays a single menu item with image, name, price and add button.
 * @param {{ id, name, price, description, img, badge }} item
 * @param {Function} onAdd - called with the item when "Añadir" is clicked
 */
const MenuCard = ({ item, onAdd }) => (
  <article className="menu-card">
    <div className="menu-card__img-wrap">
      <img src={item.img} alt={item.name} className="menu-card__img" />
      {item.badge && <span className="menu-card__badge">{item.badge}</span>}
    </div>

    <div className="menu-card__body">
      <div className="menu-card__top-row">
        <h4 className="menu-card__name">{item.name}</h4>
        <span className="menu-card__price">${item.price.toFixed(2)}</span>
      </div>

      <p className="menu-card__desc">{item.description}</p>

      <button className="btn btn--primary" onClick={() => onAdd(item)}>
        <Icon name="add_shopping_cart" className="btn__icon" />
        Añadir al carrito
      </button>
    </div>
  </article>
);

export default MenuCard;
