import { Link } from "react-router-dom";
import { getRecommendations } from "./recommendationUtils";

function RecommendationResults({ products, answers, onStartOver }) {
    const recommendations = getRecommendations(products, answers);

    const budgetLabels = {
        under280: "Under ₱280",
        range280to300: "₱280-₱300",
        range301to350: "₱301-₱350",
        noLimit: "No limit",
    };

    const paletteLabels = {
        pinksReds: "Pinks & Reds",
        purplesLavender: "Purples & Lavender",
        whitesCreams: "Whites & Creams",
        yellowsOranges: "Yellows & Oranges",
        mixedColorful: "Mixed & Colorful",
    };

    const recipientLabels = {
        partner: "Partner / Spouse",
        family: "Family Member",
        friend: "Friend",
        colleague: "Colleague",
        myself: "Myself",
    };

    return (
        <main className="ai-rec-results-page">
            <section className="ai-rec-results-header">
                <span className="ai-rec-results-sparkle">✨</span>
                <h1>Your Perfect Picks</h1>
                <p>
                    Personalized based on your answers and our available bouquets
                </p>

                <div className="ai-rec-result-tags">
                    <span>🎁 {answers.occasion}</span>
                    <span>💜 {budgetLabels[answers.budget]}</span>
                    <span>🌻 {paletteLabels[answers.palette]}</span>
                    <span>🎀 {recipientLabels[answers.recipient]}</span>
                </div>

                <button
                    type="button"
                    className="ai-rec-restart"
                    onClick={onStartOver}
                >
                    <i className="bi bi-arrow-counterclockwise"></i>
                    Start Over
                </button>
            </section>

            {recommendations.length > 0 ? (
                <>
                    <p className="ai-rec-results-note">
                        Bouquets are ranked using your occasion, budget,
                        color preferences, customer ratings, and popularity.
                    </p>

                    <section className="ai-rec-results-grid">
                        {recommendations.map((product, index) => (
                            <article
                                className="ai-rec-product-card"
                                key={product.id}
                            >
                                <div className="ai-rec-product-image-wrap">
                                    {index === 0 && (
                                        <span className="ai-rec-best-match">
                                            ✨ Best Match
                                        </span>
                                    )}

                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="ai-rec-product-image"
                                    />
                                </div>

                                <div className="ai-rec-product-content">
                                    <div className="ai-rec-product-title-row">
                                        <h2>{product.name}</h2>
                                        <span className="ai-rec-price">
                                            ₱{product.price.toFixed(2)}
                                        </span>
                                    </div>

                                    <p className="ai-rec-product-description">
                                        {product.description}
                                    </p>

                                    {product.averageRating != null && (
                                        <p className="ai-rec-rating">
                                            <i className="bi bi-star-fill"></i>
                                            {product.averageRating.toFixed(1)}
                                            <span>
                                                ({product.reviewCount || 0} reviews)
                                            </span>
                                        </p>
                                    )}

                                    <div className="ai-rec-reasons">
                                        {product.recommendationReasons.map(
                                            (reason) => (
                                                <span key={reason}>
                                                    {reason}
                                                </span>
                                            )
                                        )}
                                    </div>

                                    <Link
                                        to={product.slug}
                                        className="ai-rec-view-product"
                                    >
                                        <i className="bi bi-cart3"></i>
                                        View &amp; Add to Cart
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </section>
                </>
            ) : (
                <div className="ai-rec-no-results">
                    <i className="bi bi-flower1"></i>
                    <h2>No bouquets available right now</h2>
                    <p>Try starting over to explore other preferences.</p>
                    <button type="button" onClick={onStartOver}>
                        Try Again
                    </button>
                </div>
            )}

            <div className="ai-rec-browse-catalog">
                <p>Want to explore more options?</p>
                <Link to="/catalog">
                    Browse Full Catalog
                    <i className="bi bi-chevron-right"></i>
                </Link>
            </div>
        </main>
    );
}

export default RecommendationResults;
