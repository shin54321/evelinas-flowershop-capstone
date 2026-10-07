import { useState } from "react";

import CustomerPhotos from "./CustomerPhotos";
import "./ProductDetailsComponents.css";

function ReviewSection({ product }) {

    const [hoverRating, setHoverRating] = useState(0);
    const [selectedRating, setSelectedRating] = useState(0);
    const [activeTab, setActiveTab] = useState("reviews");

    return (
        <section className="review-section">

            {/* =========================
                REVIEW / CUSTOMER PHOTOS TABS
            ========================== */}
            <div className="review-tabs">

                {/* Reviews Tab */}
                <button
                    className={`review-tab ${
                        activeTab === "reviews" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("reviews")}
                >
                    <i className="bi bi-star me-2"></i>
                    Reviews ({product.reviewCount})
                </button>


                {/* Customer Photos Tab */}
                <button
                    className={`review-tab ${
                        activeTab === "photos" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("photos")}
                >
                    <i className="bi bi-camera me-2"></i>
                    Customer Photos ({product.customerPhotos?.length || 0})
                </button>

            </div>


            {/* =========================
                TAB CONTENT
            ========================== */}
            <div className="review-content">


                {/* =========================
                    REVIEWS TAB
                ========================== */}
                {activeTab === "reviews" && (
                    <>


                        {/* =========================
                            RATING SUMMARY
                        ========================== */}
                        <div className="rating-summary">

                            {/* Overall Rating */}
                            <div className="overall-rating">

                                <h2>
                                    {product.averageRating.toFixed(1)}
                                </h2>

                                <div className="overall-stars">

                                    {[1, 2, 3, 4, 5].map((star) => (

                                        <i
                                            key={star}
                                            className="bi bi-star-fill"
                                        ></i>

                                    ))}

                                </div>

                                <span>
                                    {product.reviewCount} reviews
                                </span>

                            </div>


                            {/* Rating Breakdown */}
                            <div className="rating-breakdown">

                                {[5, 4, 3, 2, 1].map((rating) => {

                                    const count =
                                        rating === Math.floor(product.averageRating)
                                            ? 1
                                            : 0;

                                    const percentage =
                                        product.reviewCount > 0
                                            ? (count / product.reviewCount) * 100
                                            : 0;

                                    return (

                                        <div
                                            key={rating}
                                            className="rating-row"
                                        >

                                            <span className="rating-number">
                                                {rating}
                                            </span>

                                            <i className="bi bi-star-fill"></i>

                                            <div className="rating-bar">

                                                <div
                                                    className="rating-bar-fill"
                                                    style={{
                                                        width: `${percentage}%`
                                                    }}
                                                ></div>

                                            </div>

                                            <span className="rating-count">
                                                {count}
                                            </span>

                                        </div>

                                    );
                                })}

                            </div>

                        </div>


                        {/* =========================
                            CUSTOMER REVIEW
                        ========================== */}
                        <div className="customer-review">

                            <div className="review-header">

                                <strong>
                                    Isabelle F.
                                </strong>

                                <small>
                                    5/28/2026
                                </small>

                            </div>


                            <div className="customer-review-stars d-flex justify-content-start">

                                {[1, 2, 3, 4, 5].map((star) => (

                                    <i
                                        key={star}
                                        className="bi bi-star-fill"
                                    ></i>

                                ))}

                            </div>


                            <p className="customer-review-text d-flex justify-content-start">
                                "The peonies were breathtaking! Ordered for my
                                wedding and every guest complimented the arrangements.
                                10/10!"
                            </p>

                        </div>


                        {/* Divider */}
                        <hr />


                        {/* =========================
                            WRITE A REVIEW
                        ========================== */}
                        <div className="write-review d-flex flex-column justify-content-start">

                            <h5>
                                Write a Review
                            </h5>


                            {/* Rating */}
                            <div className="review-form-group">

                                <label>
                                    Your Rating *
                                </label>

                                <div className="review-rating-input">

                                    {[1, 2, 3, 4, 5].map((star) => (

                                        <button
                                            type="button"
                                            key={star}
                                            aria-label={`Rate ${star} stars`}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            onClick={() => setSelectedRating(star)}
                                        >

                                            <i
                                                className={
                                                    star <= (hoverRating || selectedRating)
                                                        ? "bi bi-star-fill"
                                                        : "bi bi-star"
                                                }
                                            ></i>

                                        </button>

                                    ))}

                                </div>

                            </div>


                            {/* Review */}
                            <div className="review-form-group">

                                <label htmlFor="review">
                                    Your Review *
                                </label>

                                <textarea
                                    id="review"
                                    className="form-control"
                                    rows="2"
                                    placeholder="Share your experience with this bouquet..."
                                ></textarea>

                            </div>


                            {/* Attach Photos */}
                            <button
                                type="button"
                                className="attach-photo-btn"
                            >
                                <i className="bi bi-image me-2"></i>
                                Attach Photos (optional)
                            </button>


                            {/* Submit */}
                            <button
                                type="button"
                                className="btn submit-review-btn d-flex align-items-start justify-content-start"
                            >
                                <span>
                                    <i className="bi bi-send me-2"></i>
                                    Submit Review
                                </span>
                            </button>

                        </div>

                    </>
                )}


                {/* =========================
                    CUSTOMER PHOTOS TAB
                ========================== */}
                {activeTab === "photos" && (

                    <CustomerPhotos
                        photos={product.customerPhotos || []}
                    />

                )}

            </div>

        </section>
    );
}

export default ReviewSection;