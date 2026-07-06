import "./hero.css";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">

      <div className="container">

        <div className="hero-content">

          <span className="hero-badge">
            ✨ AI Powered Floristry
          </span>

          <h1>
            Fresh Flowers,
            <br />
            <span>Delivered with Love</span>
          </h1>

          <p>
            Discover the perfect bouquet for every moment.
            Personalized recommendations powered by AI.
          </p>

          <div className="hero-buttons">

            <Link to="/catalog" className="btn btn-light">
              Shop Now
            </Link>

            <Link to="/recommendation" className="btn btn-outline-light">
              Get AI Picks
            </Link>

          </div>

          <div className="hero-features">

            <span>
              🚚 Same Day Delivery
            </span>

            <span>
              🌸 Freshness Guaranteed
            </span>

            <span>
              ⭐ 4.9 Rated
            </span>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;