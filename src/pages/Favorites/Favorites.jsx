
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import products from "../../data/products";
import "./Favorites.css";

const FAVORITES_KEY = "evelina-favorites";

function getSavedFavorites() {
    try {
        return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
    } catch {
        return [];
    }
}

function Favorites() {
    const [favoriteIds, setFavoriteIds] = useState(getSavedFavorites);

    // Keep the page synchronized with favorite changes
    useEffect(() => {
        const syncFavorites = () => {
            setFavoriteIds(getSavedFavorites());
        };

        window.addEventListener("favoritesUpdated", syncFavorites);
        window.addEventListener("storage", syncFavorites);

        return () => {
            window.removeEventListener("favoritesUpdated", syncFavorites);
            window.removeEventListener("storage", syncFavorites);
        };
    }, []);

    const favoriteProducts = products.filter((product) =>
        favoriteIds.includes(product.id)
    );

    const removeFavorite = (product) => {
        const updatedFavorites = favoriteIds.filter(
            (id) => id !== product.id
        );

        localStorage.setItem(
            FAVORITES_KEY,
            JSON.stringify(updatedFavorites)
        );

        setFavoriteIds(updatedFavorites);
        window.dispatchEvent(new Event("favoritesUpdated"));

        toast.info(`${product.name} removed from favorites.`);
    };

    return (
        <main className="favorites-page">
            <div className="container-fluid favorites-container">
                {favoriteProducts.length > 0 ? (
                    <>
                        {/* PAGE HEADER */}
                        <div className="favorites-header">
                            <p className="favorites-count">
                                <strong>{favoriteProducts.length}</strong>{" "}
                                {favoriteProducts.length === 1
                                    ? "saved item"
                                    : "saved items"}
                            </p>

                            <Link
                                to="/catalog"
                                className="btn favorites-add-more"
                            >
                                <span>
                                    <i className="bi bi-plus-lg me-2"></i>
                                    Add More
                                </span>
                            </Link>
                        </div>

                        {/* FAVORITE PRODUCTS */}
                        <div className="favorites-grid">
                            {favoriteProducts.map((product) => (
                                <article
                                    className="favorites-card"
                                    key={product.id}
                                >
                                    <div className="favorites-image-wrapper">
                                        <Link to={product.slug}>
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="favorites-image"
                                            />
                                        </Link>

                                        {product.badge && (
                                            <span className="favorites-badge">
                                                <i className="bi bi-star-fill me-1"></i>
                                                {product.badge}
                                            </span>
                                        )}

                                        <button
                                            type="button"
                                            className="favorites-heart"
                                            aria-label={`Remove ${product.name} from favorites`}
                                            onClick={() =>
                                                removeFavorite(product)
                                            }
                                        >
                                            <i className="bi bi-heart-fill"></i>
                                        </button>
                                    </div>

                                    <div className="favorites-card-body">
                                        <Link
                                            to={product.slug}
                                            className="favorites-product-name"
                                        >
                                            <span>{product.name}</span>
                                        </Link>

                                        <p className="favorites-description">
                                            {product.description}
                                        </p>

                                        <div className="favorites-tags">
                                            {product.flowerTypes?.map((flower) => (
                                                <span
                                                    className="favorites-tag"
                                                    key={flower}
                                                >
                                                    {flower}
                                                </span>
                                            ))}

                                            {product.occasions
                                                ?.slice(0, 1)
                                                .map((occasion) => (
                                                    <span
                                                        className="favorites-tag occasion"
                                                        key={occasion}
                                                    >
                                                        {occasion}
                                                    </span>
                                                ))}
                                        </div>

                                        <div className="favorites-card-footer">
                                            <strong className="favorites-price">
                                                ₱{product.price.toLocaleString("en-PH")}
                                            </strong>

                                            <Link
                                                to={product.slug}
                                                className="btn favorites-view-btn"
                                            >
                                                <span>View Bouquet</span>
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </>
                ) : (
                    /* EMPTY STATE */
                    <section className="favorites-empty">
                        <div className="favorites-empty-icon">
                            🌸
                        </div>

                        <h1>No favorites yet</h1>

                        <p>
                            Browse our catalog and tap the heart icon
                            to save bouquets you love.
                        </p>

                        <div className="favorites-empty-actions">
                            <Link
                                to="/catalog"
                                className="btn favorites-browse-btn"
                            >
                                <span>
                                    <i className="bi bi-bag me-2"></i>
                                    Browse Catalog
                                </span>
                            </Link>

                            <Link
                                to="/ai-recommendation"
                                className="btn favorites-ai-btn"
                            >
                                <span>
                                    <i className="bi bi-stars me-2"></i>
                                    Get AI Picks
                                </span>
                            </Link>
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
}

export default Favorites;
