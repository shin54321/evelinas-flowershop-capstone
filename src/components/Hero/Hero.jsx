import "./hero.css";

function Hero() {
    return (

        <section className="hero">

            <div className="container-fluid px-lg-5 px-3">

                <div className="row align-items-center">

                    {/* Left Side */}

                    <div className="col-lg-6">

                        <span className="hero-tag">
                            🌸 Fresh Flowers Everyday
                        </span>

                        <h1 className="hero-title">

                            Beautiful Bouquets

                            <br />

                            Crafted With Love

                        </h1>

                        <p className="hero-description">

                            Surprise someone special with beautifully
                            handcrafted bouquets. Explore our AI-powered
                            recommendations and enjoy fast delivery.

                        </p>

                        <div className="hero-buttons">

                            <button className="btn btn-shop">

                                Shop Now

                            </button>

                            <button className="btn btn-ai">

                                AI Recommendation

                            </button>

                        </div>

                    </div>

                    {/* Right Side */}

                    <div className="col-lg-6 text-center">

                        <img
                            src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=900"
                            alt="Flower Bouquet"
                            className="hero-image"
                        />

                    </div>

                </div>

            </div>

        </section>

    );
}

export default Hero;