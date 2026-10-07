import { Link, useParams } from "react-router-dom";

import products from "../../data/products.js";

import "./ProductDetails.css";

import ReviewSection from "../../components/ProductDetailsComponents/ReviewSection.jsx";
import YouMayAlsoLike from "../../components/ProductDetailsComponents/YouMayAlsoLike.jsx";

function ProductDetails() {

    const { slug } = useParams();

    const product = products.find(
        (product) => product.slug === `/catalog/${slug}`
    );

    if (!product) {
        return <h1>Product not found</h1>;
    }

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


                {/* =========================
                    PRODUCT HERO
                ========================== */}
                <div className="product-details-hero">


                    {/* =========================
                        LEFT SIDE
                    ========================== */}
                    <div className="product-details-image-card">

                        {/* Product Image */}
                        <div className="product-details-image">

                            <img
                                src={product.image}
                                alt={product.name}
                            />

                            {/* Badge */}
                            <span className="product-details-badge">
                                <i className="bi bi-fire me-1"></i>
                                {product.badge}
                            </span>

                        </div>

                    </div>


                    {/* =========================
                        RIGHT SIDE
                    ========================== */}
                    <div className="product-details-info">

                        {/* Product Name */}
                        <h1 className="product-details-name">
                            {product.name}
                        </h1>


                        {/* Price + Rating */}
                        <div className="product-details-rating mb-0">

                            {/* Price */}
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


                        {/* =========================
                            FLOWERS INCLUDED
                        ========================== */}
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


                        {/* =========================
                            PERFECT FOR
                        ========================== */}
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


                        {/* =========================
                            QUANTITY
                        ========================== */}
                        <div className="product-details-section">

                            <h6>Quantity</h6>

                            <div className="quantity-selector">

                                <button type="button">
                                    -
                                </button>

                                <span>1</span>

                                <button type="button">
                                    +
                                </button>

                            </div>

                        </div>


                        {/* =========================
                            ORDER SECTION
                        ========================== */}
                        <div className="product-order-section">


                            {/* Delivery Date */}
                            <div className="product-details-section">

                                <h6>
                                    Preferred Delivery Date
                                </h6>

                                <input
                                    type="date"
                                    className="form-control delivery-date"
                                />

                            </div>


                            {/* Custom Message */}
                            <div className="product-details-section">

                                <h6>
                                    Custom Message
                                </h6>

                                <textarea
                                    className="form-control custom-message"
                                    rows="3"
                                    placeholder="Write a heartfelt message..."
                                ></textarea>

                            </div>


                            {/* Add to Cart + Favorite */}
                            <div className="product-details-actions">

                                <button
                                    type="button"
                                    className="btn add-to-cart-btn d-flex align-items-center justify-content-center"
                                >

                                    <i className="bi bi-cart-plus me-2"></i>

                                    <span className="button-text">
                                        Add to Cart
                                    </span>

                                </button>


                                <button
                                    type="button"
                                    className="btn favorite-product-btn"
                                    aria-label="Add to Favorites"
                                >

                                    <i className="bi bi-heart"></i>

                                </button>

                            </div>


                            {/* =========================
                                PRODUCT BENEFITS
                            ========================== */}
                            <div className="product-benefits">


                                {/* Same-day Delivery */}
                                <div className="benefit-card">

                                    <i className="bi bi-truck"></i>

                                    <span>
                                        Same-day delivery
                                    </span>

                                </div>


                                {/* Real-time Tracking */}
                                <div className="benefit-card">

                                    <i className="bi bi-box-seam"></i>

                                    <span>
                                        Real-time tracking
                                    </span>

                                </div>


                                {/* Freshness Guarantee */}
                                <div className="benefit-card">

                                    <i className="bi bi-check-circle"></i>

                                    <span>
                                        Freshness guarantee
                                    </span>

                                </div>


                            </div>

                        </div>

                    </div>

                </div>

                {/* =========================
                    REVIEW SECTION
                ========================== */}
                <ReviewSection product={product} />

                {/* =========================
                    YOU MAY ALSO LIKE
                ========================== */}
                <YouMayAlsoLike currentProduct={product} />

            </div>

        </main>

    );
}

export default ProductDetails;