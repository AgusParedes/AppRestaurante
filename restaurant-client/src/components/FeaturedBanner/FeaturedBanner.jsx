import { IMG } from "../../data/menuData";
import "./FeaturedBanner.scss";

const FeaturedBanner = () => (
  <section className="featured-banner">
    <div className="featured-banner__inner">
      <img
        src={IMG.featured}
        alt="Carpaccio de Res Ahumado"
        className="featured-banner__img"
      />
      <div className="featured-banner__overlay">
        <span className="featured-banner__chip">Sugerencia del Chef</span>
        <h2 className="featured-banner__title">Carpaccio de Res Ahumado</h2>
        <p className="featured-banner__sub">
          Láminas de solomillo, trufa negra, parmesano de 24 meses.
        </p>
      </div>
    </div>
  </section>
);

export default FeaturedBanner;
