import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import products from "../../data/products";
import SharePostModal from "./SharePostModal";
import galleryData from "./galleryData";
import "./Gallery.css";

const GALLERY_STORAGE_KEY = "evelina-gallery-posts";

function Gallery() {
    const [openComments, setOpenComments] = useState({});
    const [commentInputs, setCommentInputs] = useState({});
    const [showShareModal, setShowShareModal] = useState(false);
    const [activeTab, setActiveTab] = useState("all");

    const [posts, setPosts] = useState(() => {
        try {
            const saved = localStorage.getItem(GALLERY_STORAGE_KEY);
            return saved ? JSON.parse(saved) : galleryData;
        } catch {
            return galleryData;
        }
    });

    // Save posts whenever they change.
    useEffect(() => {
        try {
            localStorage.setItem(
                GALLERY_STORAGE_KEY,
                JSON.stringify(posts)
            );
        } catch (error) {
            console.error("Unable to save gallery posts:", error);
        }
    }, [posts]);

    // Filter posts by the selected tab.
    const visiblePosts =
        activeTab === "featured"
            ? posts.filter((post) => post.featured)
            : posts;

    const featuredCount = posts.filter(
        (post) => post.featured
    ).length;

    // Create a new gallery post.
    const handleCreatePost = (newPost) => {
        const selectedProduct = products.find(
            (product) => product.id === newPost.productId
        );

        const post = {
            ...newPost,
            id: `post-${crypto.randomUUID()}`,
            product: selectedProduct || null,
            comments: newPost.comments || [],
            likes: Number(newPost.likes) || 0,
            liked: Boolean(newPost.liked),
        };

        setPosts((previousPosts) => [post, ...previousPosts]);
        setActiveTab("all");
        setShowShareModal(false);
    };

    // Like or unlike a post.
    const handleLike = (postId) => {
        setPosts((previousPosts) =>
            previousPosts.map((post) => {
                if (post.id !== postId) {
                    return post;
                }

                const isLiked = Boolean(post.liked);

                return {
                    ...post,
                    liked: !isLiked,
                    likes: Math.max(
                        0,
                        (Number(post.likes) || 0) +
                            (isLiked ? -1 : 1)
                    ),
                };
            })
        );
    };

    // Add a comment to a post.
    const handleAddComment = (postId, commentText) => {
        const trimmedComment = commentText.trim();

        if (!trimmedComment) {
            return;
        }

        const newComment = {
            id: `comment-${crypto.randomUUID()}`,
            customerName: "Guest",
            text: trimmedComment,
        };

        setPosts((previousPosts) =>
            previousPosts.map((post) =>
                post.id === postId
                    ? {
                          ...post,
                          comments: [
                              ...(post.comments || []),
                              newComment,
                          ],
                      }
                    : post
            )
        );

        setOpenComments((previous) => ({
            ...previous,
            [postId]: true,
        }));
    };

    // Share a gallery post.
    const handleShare = async (post) => {
        const shareUrl =
            `${window.location.origin}/gallery#post-${post.id}`;

        const shareData = {
            title: "Evelina's Flowershop Gallery",
            text: `${post.customerName}'s bouquet post`,
            url: shareUrl,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(shareUrl);
                window.alert("Gallery post link copied!");
            } else {
                window.prompt("Copy this post link:", shareUrl);
            }
        } catch (error) {
            if (error.name !== "AbortError") {
                window.prompt("Copy this post link:", shareUrl);
            }
        }
    };

    // Open or close the comments for an individual post.
    const toggleComments = (postId) => {
        setOpenComments((previous) => ({
            ...previous,
            [postId]: !previous[postId],
        }));
    };

    // Update a comment input without changing other posts.
    const handleCommentInputChange = (postId, value) => {
        setCommentInputs((previous) => ({
            ...previous,
            [postId]: value,
        }));
    };

    // Submit a comment and clear the corresponding input.
    const handleCommentSubmit = (event, postId) => {
        event.preventDefault();

        const commentText = commentInputs[postId] || "";

        if (!commentText.trim()) {
            return;
        }

        handleAddComment(postId, commentText);

        setCommentInputs((previous) => ({
            ...previous,
            [postId]: "",
        }));
    };

    // Get a customer's initials for their avatar.
    const getInitials = (name = "Guest") => {
        return name
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part.charAt(0).toUpperCase())
            .join("") || "G";
    };

    return (
        <main className="gallery-page">
            {/* HERO SECTION */}
            <section className="gallery-hero">
                <div className="gallery-hero-content">
                    <span className="gallery-hero-eyebrow">
                        Evelina's Flowershop
                    </span>

                    <h1>
                        Bouquet <span>Community</span>
                    </h1>

                    <p>
                        Discover beautiful bouquets shared by our
                        community. Get inspired, share your floral
                        moments, and find your next favorite design.
                    </p>

                    <button
                        type="button"
                        className="gallery-share-button"
                        onClick={() => setShowShareModal(true)}
                    >
                        <i
                            className="bi bi-plus-circle"
                            aria-hidden="true"
                        />
                        Share Your Bouquet
                    </button>
                </div>
            </section>

            {/* GALLERY CONTENT */}
            <section className="gallery-content">

                {/* TABS */}
                <div
                    className="gallery-tabs"
                    role="tablist"
                    aria-label="Gallery filters"
                >
                    <button
                        type="button"
                        role="tab"
                        aria-selected={activeTab === "all"}
                        className={`gallery-tab ${
                            activeTab === "all" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("all")}
                    >
                        <i
                            className="bi bi-grid"
                            aria-hidden="true"
                        />
                        All Posts
                        <span className="gallery-tab-count">
                            {posts.length}
                        </span>
                    </button>

                    <button
                        type="button"
                        role="tab"
                        aria-selected={activeTab === "featured"}
                        className={`gallery-tab ${
                            activeTab === "featured" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("featured")}
                    >
                        <i
                            className="bi bi-stars"
                            aria-hidden="true"
                        />
                        Featured
                        <span className="gallery-tab-count">
                            {featuredCount}
                        </span>
                    </button>
                </div>

                {/* POSTS */}
                {visiblePosts.length > 0 ? (
                    <div className="gallery-post-list">
                        {visiblePosts.map((post) => {
                            const customerName =
                                post.customerName || "Guest";

                            const comments = post.comments || [];
                            const likes = Number(post.likes) || 0;

                            const linkedProduct =
                                post.product ||
                                products.find(
                                    (product) =>
                                        product.id === post.productId
                                );

                            const productLink = linkedProduct?.slug || "/catalog";

                            return (
                                <article
                                    className="gallery-post-card"
                                    key={post.id}
                                    id={`post-${post.id}`}
                                >
                                    {/* POST HEADER */}
                                    <div className="gallery-post-header">
                                       <div className="gallery-avatar">
                                            {post.customerPhoto ? (
                                                <img
                                                    src={post.customerPhoto}
                                                    alt={customerName}
                                                />
                                            ) : (
                                                <span>{getInitials(customerName)}</span>
                                            )}
                                        </div>

                                        <div className="gallery-post-author">
                                            <h3>{customerName}</h3>

                                            <span className="gallery-post-date">
                                                {post.date ||
                                                    "Shared with love"}
                                            </span>
                                        </div>

                                        {post.featured && (
                                            <span className="gallery-featured-badge">
                                                <i
                                                    className="bi bi-stars"
                                                    aria-hidden="true"
                                                />
                                                Featured
                                            </span>
                                        )}
                                    </div>

                                    {/* CAPTION */}
                                    {post.caption && (
                                        <div className="gallery-post-caption">
                                            <p>{post.caption}</p>
                                        </div>
                                    )}

                                    {/* POST IMAGE */}
                                    <div className="gallery-post-image">
                                        {post.image ? (
                                            <img
                                                src={post.image}
                                                alt={
                                                    post.caption ||
                                                    "Customer bouquet"
                                                }
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="gallery-image-placeholder">
                                                <i
                                                    className="bi bi-flower1"
                                                    aria-hidden="true"
                                                />
                                                <span>
                                                    Bouquet photo
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* POST ACTIONS */}
                                    <div className="gallery-post-actions">
                                        <div className="gallery-action-group">
                                            <button
                                                type="button"
                                                className={`gallery-action-button ${
                                                    post.liked
                                                        ? "liked"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    handleLike(post.id)
                                                }
                                                aria-label={
                                                    post.liked
                                                        ? "Unlike post"
                                                        : "Like post"
                                                }
                                            >
                                                <i
                                                    className={
                                                        post.liked
                                                            ? "bi bi-heart-fill"
                                                            : "bi bi-heart"
                                                    }
                                                    aria-hidden="true"
                                                />
                                                <span>{likes}</span>
                                            </button>

                                            <button
                                                type="button"
                                                className="gallery-action-button"
                                                onClick={() =>
                                                    toggleComments(post.id)
                                                }
                                                aria-expanded={Boolean(
                                                    openComments[post.id]
                                                )}
                                                aria-label="Toggle comments"
                                            >
                                                <i
                                                    className="bi bi-chat"
                                                    aria-hidden="true"
                                                />
                                                <span>
                                                    {comments.length}
                                                </span>
                                            </button>
                                        </div>

                                        <button
                                            type="button"
                                            className="gallery-action-button gallery-share-action"
                                            onClick={() =>
                                                handleShare(post)
                                            }
                                        >
                                            <i
                                                className="bi bi-share"
                                                aria-hidden="true"
                                            />
                                            <span>Share</span>
                                        </button>
                                    </div>

                                    {/* LINKED PRODUCT */}
                                    {linkedProduct && (
                                        <div className="gallery-tagged-product">

                                            <div className="gallery-tagged-product-info">
                                                <span>
                                                    Bouquet inspiration
                                                </span>
                                                <strong>
                                                    {linkedProduct.name}
                                                </strong>
                                                {linkedProduct.price != null && (
                                                    <span className="gallery-tagged-product-price">
                                                        ₱
                                                        {Number(
                                                            linkedProduct.price
                                                        ).toLocaleString(
                                                            "en-PH"
                                                        )}
                                                    </span>
                                                )}
                                            </div>

                                            <Link
                                                to={productLink}
                                                className="gallery-view-product"
                                            >
                                                View
                                                <i
                                                    className="bi bi-arrow-right"
                                                    aria-hidden="true"
                                                />
                                            </Link>
                                        </div>
                                    )}

                                    {/* COMMENTS */}
                                    {openComments[post.id] && (
                                        <div className="gallery-comments">
                                            <div className="gallery-comments-heading">
                                                <h4>Comments</h4>
                                                <span>
                                                    {comments.length}
                                                </span>
                                            </div>

                                            {comments.length > 0 ? (
                                                <div className="gallery-comment-list">
                                                    {comments.map(
                                                        (comment, index) => {
                                                            const name =
                                                                comment.customerName ||
                                                                comment.name ||
                                                                "Guest";

                                                            const text =
                                                                comment.text ||
                                                                comment.message ||
                                                                "";

                                                            return (
                                                                <div
                                                                    className="gallery-comment"
                                                                    key={
                                                                        comment.id ||
                                                                        `${post.id}-comment-${index}`
                                                                    }
                                                                >
                                                                    <div className="gallery-comment-avatar">
                                                                        {getInitials(
                                                                            name
                                                                        )}
                                                                    </div>

                                                                    <div className="gallery-comment-content">
                                                                        <strong>
                                                                            {
                                                                                name
                                                                            }
                                                                        </strong>
                                                                        <p>
                                                                            {
                                                                                text
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            ) : (
                                                <p className="gallery-no-comments">
                                                    No comments yet. Be the
                                                    first to share some love!
                                                </p>
                                            )}

                                            <form
                                                className="gallery-comment-form"
                                                onSubmit={(event) =>
                                                    handleCommentSubmit(
                                                        event,
                                                        post.id
                                                    )
                                                }
                                            >
                                                <div className="gallery-comment-input-avatar">
                                                    G
                                                </div>

                                                <input
                                                    type="text"
                                                    value={
                                                        commentInputs[
                                                            post.id
                                                        ] || ""
                                                    }
                                                    onChange={(event) =>
                                                        handleCommentInputChange(
                                                            post.id,
                                                            event.target.value
                                                        )
                                                    }
                                                    placeholder="Write a comment..."
                                                    aria-label="Write a comment"
                                                    maxLength={500}
                                                />

                                                <button
                                                    type="submit"
                                                    disabled={
                                                        !(
                                                            commentInputs[
                                                                post.id
                                                            ] || ""
                                                        ).trim()
                                                    }
                                                    aria-label="Post comment"
                                                >
                                                    <i
                                                        className="bi bi-send-fill"
                                                        aria-hidden="true"
                                                    />
                                                </button>
                                            </form>
                                        </div>
                                    )}
                                </article>
                            );
                        })}
                    </div>
                ) : (
                    <div className="gallery-empty">
                        <div className="gallery-empty-icon">
                            <i
                                className="bi bi-flower1"
                                aria-hidden="true"
                            />
                        </div>

                        <h3>
                            {activeTab === "featured"
                                ? "No featured posts yet"
                                : "No bouquet posts yet"}
                        </h3>

                        <p>
                            {activeTab === "featured"
                                ? "Check back later for featured community bouquets."
                                : "Be the first to share a beautiful bouquet with our community."}
                        </p>

                        <button
                            type="button"
                            className="gallery-share-button"
                            onClick={() => setShowShareModal(true)}
                        >
                            <i
                                className="bi bi-plus-circle"
                                aria-hidden="true"
                            />
                            Share Your Bouquet
                        </button>
                    </div>
                )}
            </section>

            {/* SHARE POST MODAL */}
            {showShareModal && (
                <SharePostModal
                    onClose={() => setShowShareModal(false)}
                    onSubmit={handleCreatePost}
                    products={products}
                />
            )}
        </main>
    );
}

export default Gallery;