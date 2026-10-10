import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import "../../Trending/Trending.css";
import "./CatalogProductCard.css";

function CatalogProductCard({ product }) {

    const FAVORITES_KEY = "evelina-favorites";

    function getFavoriteIds() {
        try {
            return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
        } catch {
            return [];
        }
    }

    function toggleFavorite(productId) {
        const currentFavorites = getFavoriteIds();

        const updatedFavorites = currentFavorites.includes(productId)
            ? currentFavorites.filter((id) => id !== productId)
            : [...currentFavorites, productId];

        localStorage.setItem(
            FAVORITES_KEY,
            JSON.stringify(updatedFavorites)
        );

        window.dispatchEvent(new Event("favoritesUpdated"));

        return updatedFavorites;
    }

   
    const [favoriteIds, setFavoriteIds] = useState(getFavoriteIds);

    const isFavorite = favoriteIds.includes(product.id);

    function handleFavoriteClick() {
        const updatedFavorites = toggleFavorite(product.id);
        setFavoriteIds(updatedFavorites);

        if (updatedFavorites.includes(product.id)) {
            toast.success(`${product.name} added to favorites!`);
        } else {
            toast.info(`${product.name} removed from favorites!`);
        }
    }


    return (
        <div className="product-card catalog-product-card">
            <div className="card">

                {/* Image */}
                <div className="image-section card-img-top">
                    <Link
                        to={product.slug}
                        className="product-image text-decoration-none"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                        />
                    </Link>

                    {/* Product Badge */}
                    {product.badge && (
                        <span className="product-badge">
                            <i className="bi bi-fire me-1"></i>
                            {product.badge}
                        </span>
                    )}
                </div>

                {/* Product Information */}
                <div className="info-section card-body mx-2">

                    <div className="d-flex justify-content-between align-items-center">
                        <Link
                            to={product.slug}
                            className="product-name card-title text-decoration-none text-start"
                        >
                            <h5>{product.name}</h5>
                        </Link>

                        <button
                            type="button"
                            className={`favorite-btn ${
                                isFavorite ? "active" : ""
                            }`}
                            aria-label={
                                isFavorite
                                    ? "Remove from favorites"
                                    : "Add to favorites"
                            }
                            onClick={handleFavoriteClick}
                        >
                            <i
                                className={`bi ${
                                    isFavorite
                                        ? "bi-heart-fill"
                                        : "bi-heart"
                                }`}
                            ></i>
                        </button>
                    </div>

                    {/* Flower Types */}
                    <div className="flower-types d-flex flex-wrap mb-0">
                        {product.flowerTypes?.map((flower) => (
                            <span
                                key={flower}
                                className="flower-badge text-start mb-2"
                            >
                                {flower}
                            </span>
                        ))}
                    </div>

                    {/* Description */}
                    <p className="description card-text text-start">
                        {product.description}
                    </p>

                    {/* Occasions */}
                    <div className="occasion-tags d-flex gap-2 flex-wrap">
                        {product.occasions?.map((occasion) => (
                            <span
                                key={occasion}
                                className="occasion-badge"
                            >
                                {occasion}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Price and Details */}
                <div className="product-footer d-flex flex-wrap justify-content-between align-items-center">

                    <h5 className="product-price">
                        ₱{product.price.toLocaleString("en-PH")}
                    </h5>

                    <Link
                        to={product.slug}
                        className="btn view-details-btn text-decoration-none d-flex align-items-center justify-content-center"
                    >
                        <i className="bi bi-box-arrow-up-right me-2"></i>
                        <span>View Details</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CatalogProductCard;
