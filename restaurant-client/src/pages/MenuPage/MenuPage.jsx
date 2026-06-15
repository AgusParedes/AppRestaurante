import { useState } from "react";
import TopBar from "../../components/TopBar/TopBar";
import CategoryTabs from "../../components/CategoryTabs/CategoryTabs";
import FeaturedBanner from "../../components/FeaturedBanner/FeaturedBanner";
import MenuCard from "../../components/MenuCard/MenuCard";
import Toast from "../../components/Toast/Toast";
import Icon from "../../components/Icon";
import { MENU_ITEMS } from "../../data/menuData";
import "./MenuPage.scss";

/**
 * MenuPage — main screen with category tabs, featured hero and menu grid.
 * @param {Function} onAdd          - adds an item to the cart
 * @param {Function} onSidebarOpen  - opens the sidebar drawer
 */
const MenuPage = ({ onAdd, onSidebarOpen }) => {
  const [activeCategory, setActiveCategory] = useState("Entradas");
  const [toastVisible, setToastVisible] = useState(false);

  const filtered = MENU_ITEMS.filter((i) => i.category === activeCategory);

  const handleAdd = (item) => {
    onAdd(item);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  };

  return (
    <>
      <TopBar onMenuClick={onSidebarOpen} />

      <main className="page-main">
        <CategoryTabs active={activeCategory} onChange={setActiveCategory} />

        <FeaturedBanner />

        <section className="menu-section">
          <h3 className="menu-section__heading">
            {activeCategory === "Entradas" ? "Entradas Populares" : activeCategory}
          </h3>

          {filtered.length > 0 ? (
            <div className="menu-grid">
              {filtered.map((item) => (
                <MenuCard key={item.id} item={item} onAdd={handleAdd} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Icon name="menu_book" className="empty-state__icon" />
              <p>Próximamente</p>
            </div>
          )}
        </section>

        <section className="cta-strip">
          <div>
            <h4 className="cta-strip__title">¿Necesitas algo más?</h4>
            <p className="cta-strip__sub">Estamos a un clic de distancia.</p>
          </div>
          <button className="cta-strip__btn" aria-label="Llamar mesero">
            <Icon name="notifications_active" />
          </button>
        </section>
      </main>

      <Toast message="¡Añadido al pedido!" visible={toastVisible} />
    </>
  );
};

export default MenuPage;
