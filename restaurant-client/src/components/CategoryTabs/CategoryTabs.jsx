import { CATEGORIES } from "../../data/menuData";
import "./CategoryTabs.scss";

/**
 * CategoryTabs — sticky horizontal scrollable category filter.
 * @param {string}   active   - currently selected category
 * @param {Function} onChange - callback when a category is clicked
 */
const CategoryTabs = ({ active, onChange }) => (
  <div className="category-tabs">
    {CATEGORIES.map((cat) => (
      <button
        key={cat}
        className={`category-tabs__item ${active === cat ? "category-tabs__item--active" : ""}`}
        onClick={() => onChange(cat)}
      >
        {cat}
      </button>
    ))}
  </div>
);

export default CategoryTabs;
