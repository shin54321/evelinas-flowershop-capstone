import { useEffect, useState } from "react";
import products from "../../data/products";

function SharePostModal({ onClose, onSubmit }) {
    const [name, setName] = useState("");
    const [productId, setProductId] = useState("");
    const [caption, setCaption] = useState("");
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    const handlePhotoChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (!["image/jpeg", "image/png"].includes(file.type)) {
            setError("Please upload a JPG or PNG image.");
            event.target.value = "";
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            setError("Please choose an image smaller than 2 MB.");
            event.target.value = "";
            return;
        }

        setError("");
        setPhoto(file);

        const reader = new FileReader();

        reader.onload = () => {
            setPhotoPreview(String(reader.result));
        };

        reader.onerror = () => {
            setError("Unable to preview this image. Please try another.");
            setPhoto(null);
            setPhotoPreview("");
        };

        reader.readAsDataURL(file);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError("");

        if (!name.trim()) {
            setError("Please enter your name.");
            return;
        }

        if (!photo || !photoPreview) {
            setError("Please upload a bouquet photo.");
            return;
        }

        onSubmit({
            customerName: name.trim(),
            productId: productId ? Number(productId) : null,
            caption: caption.trim(),
            image: photoPreview,
            featured: false,
            likes: 0,
            liked: false,
            comments: [],
            createdAt: new Date().toISOString(),
        });
    };

    return (
        <div
            className="gallery-modal-overlay"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <section
                className="gallery-share-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="gallery-modal-title"
            >
                <header className="gallery-modal-header">
                    <h2 id="gallery-modal-title">Create a Post</h2>

                    <button
                        type="button"
                        className="gallery-modal-close"
                        onClick={onClose}
                        aria-label="Close dialog"
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>
                </header>

                <form className="gallery-modal-form" onSubmit={handleSubmit}>
                    <div className="gallery-form-field">
                        <label htmlFor="gallery-post-name">
                            Your Name <span>*</span>
                        </label>

                        <input
                            id="gallery-post-name"
                            type="text"
                            placeholder="e.g. Jane D."
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            maxLength={60}
                            required
                        />
                    </div>

                    <div className="gallery-form-field">
                        <label htmlFor="gallery-post-product">
                            Tag a Bouquet (optional)
                        </label>

                        <select
                            id="gallery-post-product"
                            value={productId}
                            onChange={(event) =>
                                setProductId(event.target.value)
                            }
                        >
                            <option value="">— Select bouquet —</option>

                            {products.map((product) => (
                                <option
                                    key={product.id}
                                    value={product.id}
                                >
                                    {product.name} — ₱
                                    {product.price.toFixed(2)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="gallery-form-field">
                        <label htmlFor="gallery-post-caption">Caption</label>

                        <textarea
                            id="gallery-post-caption"
                            placeholder="What's the story behind this bouquet?"
                            value={caption}
                            onChange={(event) =>
                                setCaption(event.target.value)
                            }
                            maxLength={500}
                            rows={3}
                        />

                        <span className="gallery-caption-count">
                            {caption.length}/500
                        </span>
                    </div>

                    <div className="gallery-form-field">
                        <label htmlFor="gallery-post-photo">
                            Add Photo <span>*</span>
                        </label>

                        <label
                            className={`gallery-photo-upload ${
                                photoPreview ? "has-preview" : ""
                            }`}
                            htmlFor="gallery-post-photo"
                        >
                            {photoPreview ? (
                                <>
                                    <img
                                        src={photoPreview}
                                        alt="Preview of your bouquet"
                                        className="gallery-photo-preview"
                                    />
                                    <span>Choose a different photo</span>
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-camera"></i>
                                    <strong>Add Photo *</strong>
                                    <span>JPG or PNG · Maximum 2 MB</span>
                                </>
                            )}
                        </label>

                        <input
                            id="gallery-post-photo"
                            className="gallery-photo-input"
                            type="file"
                            accept="image/jpeg,image/png"
                            onChange={handlePhotoChange}
                        />
                    </div>

                    {error && (
                        <p className="gallery-form-error" role="alert">
                            <i className="bi bi-exclamation-circle"></i>{" "}
                            {error}
                        </p>
                    )}

                    <button
                        className="gallery-publish-button"
                        type="submit"
                    >
                        Post to Community
                    </button>
                </form>
            </section>
        </div>
    );
}

export default SharePostModal;
