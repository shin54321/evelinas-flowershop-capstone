import { useEffect, useRef, useState } from "react";
import CustomerPhotos from "./CustomerPhotos";
import "./ProductDetailsComponents.css";

function ReviewSection({ product }) {
    const [hoverRating, setHoverRating] = useState(0);
    const [selectedRating, setSelectedRating] = useState(0);
    const [activeTab, setActiveTab] = useState("reviews");

    const [customerName, setCustomerName] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [reviews, setReviews] = useState(() => {
        try {
            const saved = localStorage.getItem(`evelina-reviews-${product.id}`);
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error("Could not load reviews:", error);
            return [];
        }
    }); 
    const [selectedPhoto, setSelectedPhoto] = useState("");
    const [formError, setFormError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const photoInputRef = useRef(null);
    const storageKey = `evelina-reviews-${product.id}`;

    // Save reviews when the list changes.
    useEffect(() => {
        try {
            localStorage.setItem(storageKey, JSON.stringify(reviews));
        } catch (error) {
            console.error("Could not save reviews:", error);
        }
    }, [reviews, storageKey]);

    const handlePhotoChange = (event) => {
        const file = event.target.files?.[0];

        setFormError("");
        setSuccessMessage("");

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setFormError("Please select an image file.");
            event.target.value = "";
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            setFormError("Please choose an image smaller than 2 MB.");
            event.target.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            setSelectedPhoto(reader.result);
        };

        reader.onerror = () => {
            setFormError("Unable to read this image. Please try again.");
        };

        reader.readAsDataURL(file);
    };

    const handleSubmitReview = (event) => {
        event.preventDefault();

        setFormError("");
        setSuccessMessage("");

        if (!customerName.trim()) {
            setFormError("Please enter your name.");
            return;
        }

        if (selectedRating < 1) {
            setFormError("Please select a star rating.");
            return;
        }

        if (!reviewText.trim()) {
            setFormError("Please write your review.");
            return;
        }

        const newReview = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
            customerName: customerName.trim(),
            rating: selectedRating,
            text: reviewText.trim(),
            date: new Date().toLocaleDateString("en-US"),
            image: selectedPhoto,
        };

        setReviews((previousReviews) => [
            newReview,
            ...previousReviews,
        ]);

        setCustomerName("");
        setReviewText("");
        setSelectedRating(0);
        setHoverRating(0);
        setSelectedPhoto("");

        if (photoInputRef.current) {
            photoInputRef.current.value = "";
        }

        setSuccessMessage("Your review was submitted successfully!");
    };

    const existingReviewCount = Number(product.reviewCount) || 0;
    const existingAverage = Number(product.averageRating) || 0;

    const totalReviewCount = existingReviewCount + reviews.length;

    const averageRating =
        totalReviewCount > 0
            ? (
                  (existingAverage * existingReviewCount +
                      reviews.reduce(
                          (total, review) => total + review.rating,
                          0
                      )) /
                  totalReviewCount
              ).toFixed(1)
            : "0.0";

    const customerPhotos = [
        ...(product.customerPhotos || []),
        ...reviews
            .filter((review) => review.image)
            .map((review) => ({
                id: review.id,
                customerName: review.customerName,
                name: review.customerName,
                date: review.date,
                image: review.image,
                photo: review.image,
            })),
    ];

    return (
        <section className="review-section">
            {/* REVIEW / CUSTOMER PHOTOS TABS */}
            <div className="review-tabs">
                <button
                    type="button"
                    className={`review-tab ${
                        activeTab === "reviews" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("reviews")}
                >
                    <i className="bi bi-star me-2"></i>
                    Reviews ({totalReviewCount})
                </button>

                <button
                    type="button"
                    className={`review-tab ${
                        activeTab === "photos" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("photos")}
                >
                    <i className="bi bi-camera me-2"></i>
                    Customer Photos ({customerPhotos.length})
                </button>
            </div>

            <div className="review-content">
                {/* REVIEWS TAB */}
                {activeTab === "reviews" && (
                    <>
                        {/* RATING SUMMARY */}
                        <div className="rating-summary">
                            <div className="overall-rating">
                                <h2>{averageRating}</h2>

                                <div className="overall-stars">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <i
                                            key={star}
                                            className={
                                                star <=
                                                Math.round(Number(averageRating))
                                                    ? "bi bi-star-fill"
                                                    : "bi bi-star"
                                            }
                                        ></i>
                                    ))}
                                </div>

                                <span>{totalReviewCount} reviews</span>
                            </div>

                            <div className="rating-breakdown">
                                {[5, 4, 3, 2, 1].map((rating) => {
                                    const count =
                                        reviews.filter(
                                            (review) =>
                                                review.rating === rating
                                        ).length;

                                    const percentage =
                                        reviews.length > 0
                                            ? (count / reviews.length) * 100
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
                                                        width: `${percentage}%`,
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

                        {/* EXISTING SAMPLE REVIEW */}
                        <div className="customer-review">
                            <div className="review-header">
                                <strong>Isabelle F.</strong>
                                <small>5/28/2026</small>
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
                                wedding and every guest complimented the
                                arrangements. 10/10!"
                            </p>
                        </div>

                        {/* SUBMITTED REVIEWS */}
                        {reviews.map((review) => (
                            <div
                                className="customer-review"
                                key={review.id}
                            >
                                <div className="review-header">
                                    <strong>{review.customerName}</strong>
                                    <small>{review.date}</small>
                                </div>

                                <div className="customer-review-stars d-flex justify-content-start">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <i
                                            key={star}
                                            className={
                                                star <= review.rating
                                                    ? "bi bi-star-fill"
                                                    : "bi bi-star"
                                            }
                                        ></i>
                                    ))}
                                </div>

                                <p className="customer-review-text">
                                    {review.text}
                                </p>

                                {review.image && (
                                    <img
                                        src={review.image}
                                        alt={`Review from ${review.customerName}`}
                                        style={{
                                            display: "block",
                                            width: "100%",
                                            maxWidth: "220px",
                                            maxHeight: "220px",
                                            objectFit: "cover",
                                            borderRadius: "10px",
                                            marginTop: "10px",
                                        }}
                                    />
                                )}
                            </div>
                        ))}

                        <hr />

                        {/* WRITE A REVIEW */}
                        <div className="write-review d-flex flex-column justify-content-start">
                            <h5>Write a Review</h5>

                            <form onSubmit={handleSubmitReview}>
                                {/* CUSTOMER NAME */}
                                <div className="review-form-group">
                                    <label htmlFor={`review-name-${product.id}`}>
                                        Your Name *
                                    </label>

                                    <input
                                        id={`review-name-${product.id}`}
                                        type="text"
                                        className="form-control"
                                        value={customerName}
                                        onChange={(event) =>
                                            setCustomerName(event.target.value)
                                        }
                                        placeholder="Enter your name"
                                        maxLength={60}
                                        required
                                    />
                                </div>

                                {/* RATING */}
                                <div className="review-form-group">
                                    <label>Your Rating *</label>

                                    <div className="review-rating-input">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                type="button"
                                                key={star}
                                                aria-label={`Rate ${star} stars`}
                                                aria-pressed={
                                                    selectedRating === star
                                                }
                                                onMouseEnter={() =>
                                                    setHoverRating(star)
                                                }
                                                onMouseLeave={() =>
                                                    setHoverRating(0)
                                                }
                                                onFocus={() =>
                                                    setHoverRating(star)
                                                }
                                                onBlur={() =>
                                                    setHoverRating(0)
                                                }
                                                onClick={() =>
                                                    setSelectedRating(star)
                                                }
                                            >
                                                <i
                                                    className={
                                                        star <=
                                                        (hoverRating ||
                                                            selectedRating)
                                                            ? "bi bi-star-fill"
                                                            : "bi bi-star"
                                                    }
                                                ></i>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* REVIEW TEXT */}
                                <div className="review-form-group">
                                    <label htmlFor={`review-${product.id}`}>
                                        Your Review *
                                    </label>

                                    <textarea
                                        id={`review-${product.id}`}
                                        className="form-control"
                                        rows="2"
                                        value={reviewText}
                                        onChange={(event) =>
                                            setReviewText(event.target.value)
                                        }
                                        placeholder="Share your experience with this bouquet..."
                                        maxLength={1000}
                                        required
                                    ></textarea>
                                </div>

                                {/* ATTACH PHOTOS */}
                                <div className="review-form-group">
                                    <input
                                        ref={photoInputRef}
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={handlePhotoChange}
                                    />

                                    <button
                                        type="button"
                                        className="attach-photo-btn"
                                        onClick={() =>
                                            photoInputRef.current?.click()
                                        }
                                    >
                                        <i className="bi bi-image me-2"></i>
                                        {selectedPhoto
                                            ? "Change Photo"
                                            : "Attach Photos (optional)"}
                                    </button>

                                    {selectedPhoto && (
                                        <div>
                                            <img
                                                src={selectedPhoto}
                                                alt="Selected review"
                                                style={{
                                                    display: "block",
                                                    width: "100%",
                                                    maxWidth: "180px",
                                                    maxHeight: "180px",
                                                    objectFit: "cover",
                                                    borderRadius: "10px",
                                                    marginBottom: "8px",
                                                }}
                                            />

                                            <button
                                                type="button"
                                                className="attach-photo-btn"
                                                onClick={() => {
                                                    setSelectedPhoto("");
                                                    if (photoInputRef.current) {
                                                        photoInputRef.current.value =
                                                            "";
                                                    }
                                                }}
                                            >
                                                Remove Photo
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* VALIDATION / SUCCESS */}
                                {formError && (
                                    <p
                                        role="alert"
                                        style={{
                                            color: "#c91d45",
                                            fontSize: "12px",
                                        }}
                                    >
                                        {formError}
                                    </p>
                                )}

                                {successMessage && (
                                    <p
                                        role="status"
                                        style={{
                                            color: "#198754",
                                            fontSize: "12px",
                                        }}
                                    >
                                        {successMessage}
                                    </p>
                                )}

                                {/* SUBMIT */}
                                <button
                                    type="submit"
                                    className="btn submit-review-btn d-flex align-items-start justify-content-start"
                                >
                                    <span>
                                        <i className="bi bi-send me-2"></i>
                                        Submit Review
                                    </span>
                                </button>
                            </form>
                        </div>
                    </>
                )}

                {/* CUSTOMER PHOTOS TAB */}
                {activeTab === "photos" && (
                    <CustomerPhotos photos={customerPhotos} />
                )}
            </div>
        </section>
    );
}

export default ReviewSection;