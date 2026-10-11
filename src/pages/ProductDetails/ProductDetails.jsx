
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import products from "../../data/products.js";
import "./ProductDetails.css";

import ReviewSection from "../../components/ProductDetailsComponents/ReviewSection.jsx";
import YouMayAlsoLike from "../../components/ProductDetailsComponents/YouMayAlsoLike.jsx";

function ProductDetails() {
    const [quantity, setQuantity] = useState(1);
    const [deliveryDate, setDeliveryDate] = useState("");
    const [customMessage, setCustomMessage] = useState("");

    const [favorites, setFavorites] = useState(() => {
        try {
            const savedFavorites = JSON.parse(
                localStorage.getItem("evelina-favorites")
            );
            return Array.isArray(savedFavorites) ? savedFavorites : [];
        } catch {
            return [];
        }
    });

    const { slug } = useParams();

    const product = products.find(
        (product) => product.slug === `/catalog/${slug}`
    );

    if (!product) {
        return <h1>Product not found</h1>;
    }

    const handleAddToCart = () => {
        const CART_KEY = "evelina-cart";
        let savedCart;

        try {
            const storedCart = JSON.parse(
                localStorage.getItem(CART_KEY)
            );

            savedCart = Array.isArray(storedCart)
                ? storedCart
                : [];
        } catch {
            savedCart = [];
        }

        const existingItem = savedCart.find(
            (item) => item.id === product.id
        );

        let updatedCart;

        if (existingItem) {
            updatedCart = savedCart.map((item) =>
                item.id === product.id
                    ? {
                          ...item,
                          quantity:
                              (Number(item.quantity) || 1) + quantity,
                          deliveryDate,
                          customMessage,
                      }
                    : item
            );
        } else {
            updatedCart = [
                ...savedCart,
                {
                    id: product.id,
                    quantity,
                    deliveryDate,
                    customMessage,
                },
            ];
        }

        try {
            localStorage.setItem(
                CART_KEY,
                JSON.stringify(updatedCart)
            );

            window.dispatchEvent(new Event("cartUpdated"));

            toast.success(`${product.name} added to cart!`);
        } catch (error) {
            console.error("Could not save cart:", error);
            toast.error("Unable to add this product to your cart.");
        }
    };

    const handleToggleFavorite = () => {
        const isFavorite = favorites.includes(product.id);

        const updatedFavorites = isFavorite
            ? favorites.filter((id) => id !== product.id)
            : [...favorites, product.id];

        try {
            localStorage.setItem(
                "evelina-favorites",
                JSON.stringify(updatedFavorites)
            );

            setFavorites(updatedFavorites);

            if (isFavorite) {
                toast.info(`${product.name} removed from favorites`);
            } else {
                toast.success(`${product.name} added to favorites`);
            }
        } catch (error) {
            console.error("Could not save favorites:", error);
            toast.error("Unable to update favorites.");
        }
    };

    return (
        <main className="product-details-page padding-20">
            <div className="container-lg">
                {/* Back to Catalog */}
                <Link
                    to="/catalog"
                    className="back-to-catalog text-decoration-none"
                >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to Catalog
                </Link>

                {/* PRODUCT HERO */}
                <div className="product-details-hero">
                    {/* LEFT SIDE */}
                    <div className="product-details-image-card">
                        <div className="product-details-image">
                            <img
                                src={product.image}
                                alt={product.name}
                            />

                            {product.badge && (
                                <span className="product-details-badge">
                                    <i className="bi bi-fire me-1"></i>
                                    {product.badge}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="product-details-info">
                        {/* Product Name */}
                        <h1 className="product-details-name">
                            {product.name}
                        </h1>

                        {/* Price + Rating */}
                        <div className="product-details-rating mb-0">
                            <h5 className="product-price">
                                ₱{product.price.toLocaleString("en-PH")}
                            </h5>

                            <span className="product-details-stars">
                                <i className="bi bi-star-fill"></i>
                                {product.averageRating}
                            </span>

                            <span className="product-details-review-count">
                                ({product.reviewCount} reviews)
                            </span>
                        </div>

                        {/* Description */}
                        <p className="product-details-description">
                            {product.description}
                        </p>

                        {/* FLOWERS INCLUDED */}
                        <div className="product-details-section mt-0">
                            <h6>Flowers Included</h6>

                            <div className="product-details-tags">
                                {product.flowerTypes.map((flower) => (
                                    <span
                                        key={flower}
                                        className="product-flower-tag"
                                    >
                                        <i className="bi bi-flower1 me-1"></i>
                                        {flower}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* PERFECT FOR */}
                        <div className="product-details-section">
                            <h6>Perfect For</h6>

                            <div className="product-details-tags">
                                {product.occasions.map((occasion) => (
                                    <span
                                        key={occasion}
                                        className="product-occasion-tag"
                                    >
                                        <i className="bi bi-calendar me-1"></i>
                                        {occasion}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* QUANTITY */}
                        <div className="product-details-section">
                            <h6>Quantity</h6>

                            <div className="quantity-selector">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setQuantity((previous) =>
                                            Math.max(1, previous - 1)
                                        )
                                    }
                                    disabled={quantity <= 1}
                                    aria-label="Decrease quantity"
                                >
                                    -
                                </button>

                                <span>{quantity}</span>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setQuantity((previous) => previous + 1)
                                    }
                                    aria-label="Increase quantity"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* ORDER SECTION */}
                        <div className="product-order-section">
                            {/* Preferred Delivery Date */}
                            <div className="product-details-section">
                                <h6>Preferred Delivery Date</h6>

                                <input
                                    type="date"
                                    className="form-control delivery-date"
                                    value={deliveryDate}
                                    min={new Date().toLocaleDateString("en-CA")}
                                    onChange={(event) =>
                                        setDeliveryDate(event.target.value)
                                    }
                                />
                            </div>

                            {/* Custom Message */}
                            <div className="product-details-section">
                                <h6>Custom Message</h6>

                                <textarea
                                    className="form-control custom-message"
                                    rows="3"
                                    placeholder="Write a heartfelt message..."
                                    value={customMessage}
                                    maxLength={300}
                                    onChange={(event) =>
                                        setCustomMessage(event.target.value)
                                    }
                                />
                            </div>

                            {/* Add to Cart + Favorite */}
                            <div className="product-details-actions">
                                <button
                                    type="button"
                                    className="btn add-to-cart-btn d-flex align-items-center justify-content-center"
                                    onClick={handleAddToCart}
                                >
                                    <i className="bi bi-cart-plus me-2"></i>
                                    <span className="button-text">
                                        Add to Cart
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    className={`btn favorite-product-btn ${
                                        favorites.includes(product.id)
                                            ? "is-favorite"
                                            : ""
                                    }`}
                                    onClick={handleToggleFavorite}
                                    aria-label={
                                        favorites.includes(product.id)
                                            ? "Remove from Favorites"
                                            : "Add to Favorites"
                                    }
                                    aria-pressed={favorites.includes(product.id)}
                                >
                                    <i
                                        className={
                                            favorites.includes(product.id)
                                                ? "bi bi-heart-fill"
                                                : "bi bi-heart"
                                        }
                                    ></i>
                                </button>
                            </div>

                            {/* PRODUCT BENEFITS */}
                            <div className="product-benefits">
                                <div className="benefit-card">
                                    <i className="bi bi-truck"></i>
                                    <span>Same-day delivery</span>
                                </div>

                                <div className="benefit-card">
                                    <i className="bi bi-box-seam"></i>
                                    <span>Real-time tracking</span>
                                </div>

                                <div className="benefit-card">
                                    <i className="bi bi-check-circle"></i>
                                    <span>Freshness guarantee</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* REVIEW SECTION */}
                <ReviewSection product={product} />

                {/* YOU MAY ALSO LIKE */}
                <YouMayAlsoLike currentProduct={product} />
            </div>
        </main>
    );
}

export default ProductDetails;
