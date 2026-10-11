import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import initialNotifications from "../../data/notifications";
import Notifications from "../Notifications/Notifications";
import BottomNavbar from "./BottomNavbar";
import useCartCount from "../../hooks/useCartCount";

function TopNavbar() {
    const navigate = useNavigate();
    const navbarMenuRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const [notifications, setNotifications] = useState(() =>
        initialNotifications.map((notification) => ({ ...notification }))
    );

    const [currentUser, setCurrentUser] = useState(() => {
        try {
            const user = localStorage.getItem("evelina-current-user");
            return user ? JSON.parse(user) : null;
        } catch {
            return null;
        }
    });

    const cartCount = useCartCount();

    const unreadCount = notifications.filter(
        (notification) => notification.unread
    ).length;

    useEffect(() => {
        const updateUser = () => {
            try {
                const user = localStorage.getItem("evelina-current-user");
                setCurrentUser(user ? JSON.parse(user) : null);
            } catch {
                setCurrentUser(null);
            }
        };

        window.addEventListener("evelinaAuthChanged", updateUser);
        window.addEventListener("storage", updateUser);

        return () => {
            window.removeEventListener("evelinaAuthChanged", updateUser);
            window.removeEventListener("storage", updateUser);
        };
    }, []);

    const handleSearch = (event) => {
        event.preventDefault();

        const query = searchTerm.trim();
        if (!query) return;

        navigate(`/catalog?search=${encodeURIComponent(query)}`);

        // Close the mobile menu after searching.
        const menu = document.getElementById("navbarMenu");
        if (menu?.classList.contains("show")) {
            window.bootstrap?.Collapse
                ?.getOrCreateInstance(menu)
                ?.hide();
        }
    };

    const handleSignOut = () => {
        localStorage.removeItem("evelina-current-user");
        setCurrentUser(null);
        setIsProfileOpen(false);
        window.dispatchEvent(new Event("evelinaAuthChanged"));
        navigate("/");
    };

    const displayName =
        currentUser?.name ||
        currentUser?.username ||
        currentUser?.email ||
        "Account";

    const initial = displayName.charAt(0).toUpperCase();

    const renderSearchForm = (mobile = false) => (
        <form
            className={`search-wrapper ${
                mobile ? "mobile-search" : "desktop-search"
            }`}
            onSubmit={handleSearch}
        >
            <div className="input-group">
                <button
                    type="submit"
                    className="input-group-text search-icon"
                    aria-label="Search bouquets"
                >
                    <i className="bi bi-search"></i>
                </button>

                <input
                    type="search"
                    className="form-control search-input"
                    placeholder={mobile ? "Search..." : "Search bouquets..."}
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
            </div>
        </form>
    );

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && navbarMenuRef.current) {
                const menu = navbarMenuRef.current;

                // Close the mobile menu when switching to desktop.
                if (window.bootstrap?.Collapse) {
                    const collapse =
                        window.bootstrap.Collapse.getOrCreateInstance(menu, {
                            toggle: false,
                        });

                    collapse.hide();
                } else {
                    // Fallback if Bootstrap's JS is unavailable.
                    menu.classList.remove("show");
                }
            }
        };

        window.addEventListener("resize", handleResize);

        // Also handle the initial viewport size.
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <header className="flower-header sticky-top">
            <nav className="navbar top-navbar">
                <div className="container-fluid flower-navbar-container">

                    {/* LOGO */}
                    <Link
                        to="/"
                        className="navbar-brand flower-brand"
                    >
                        <span className="logo-icon">🌸</span>

                        <span className="logo-text">
                            <span className="logo-title">
                                Evelina's Flowershop
                            </span>
                            <span className="logo-subtitle">
                                AI-Powered Floristry
                            </span>
                        </span>
                    </Link>

                    {/* DESKTOP SEARCH */}
                    {renderSearchForm()}

                    {/* RIGHT SIDE */}
                    <div className="visible-icons">

                        <div className="header-icons">
                            {/* NOTIFICATIONS */}
                            <div className="notification-nav-wrapper">
                                <button
                                    type="button"
                                    className="btn icon-btn notification-nav-btn"
                                    aria-label={`${unreadCount} unread notifications`}
                                    aria-expanded={isNotificationOpen}
                                    onClick={() => {
                                        setIsNotificationOpen((value) => !value);
                                        setIsProfileOpen(false);
                                    }}
                                >
                                    <i className="bi bi-bell"></i>

                                    {unreadCount > 0 && (
                                        <span className="notification-count">
                                            {unreadCount > 99 ? "99+" : unreadCount}
                                        </span>
                                    )}
                                </button>

                                {isNotificationOpen && (
                                    <>
                                        <button
                                            type="button"
                                            className="notification-dismiss-backdrop"
                                            aria-label="Close notifications"
                                            onClick={() => setIsNotificationOpen(false)}
                                        />

                                        <Notifications
                                            notifications={notifications}
                                            setNotifications={setNotifications}
                                        />
                                    </>
                                )}
                            </div>

                            {/* FAVORITES */}
                            <Link
                                to="/favorites"
                                className="btn icon-btn"
                                aria-label="Favorites"
                            >
                                <i className="bi bi-heart"></i>
                            </Link>

                            {/* CART */}
                            <Link to="/cart" className="cart-nav-button">
                                <i className="bi bi-cart3"></i>
                                <span>Cart</span>

                                {cartCount > 0 && (
                                    <span className="cart-count-badge">
                                        {cartCount > 99 ? "99+" : cartCount}
                                    </span>
                                )}
                            </Link>
                        </div>

                        {/* PROFILE OR AUTH BUTTONS */}
                        {currentUser ? (
                            <div className="customer-account-wrap">
                                <button
                                    type="button"
                                    className="customer-account-trigger"
                                    aria-expanded={isProfileOpen}
                                    onClick={() => {
                                        setIsProfileOpen((value) => !value);
                                        setIsNotificationOpen(false);
                                    }}
                                >
                                    <span className="customer-avatar">{initial}</span>
                                    <span className="customer-account-name">
                                        {displayName}
                                    </span>
                                    <i className="bi bi-chevron-down"></i>
                                </button>

                                {isProfileOpen && (
                                    <>
                                        <button
                                            type="button"
                                            className="profile-dismiss-backdrop"
                                            aria-label="Close account menu"
                                            onClick={() => setIsProfileOpen(false)}
                                        />

                                        <div className="customer-account-menu">
                                            <div className="account-menu-heading">
                                                <strong>{displayName}</strong>
                                                {currentUser.email && (
                                                    <small>{currentUser.email}</small>
                                                )}
                                            </div>

                                            <Link
                                                to="/profile"
                                                onClick={() => setIsProfileOpen(false)}
                                            >
                                                <i className="bi bi-person"></i>
                                                My Profile
                                            </Link>

                                            <Link
                                                to="/order-history"
                                                onClick={() => setIsProfileOpen(false)}
                                            >
                                                <i className="bi bi-receipt"></i>
                                                Order History
                                            </Link>

                                            <Link
                                                to="/tracking"
                                                onClick={() => setIsProfileOpen(false)}
                                            >
                                                <i className="bi bi-truck"></i>
                                                Track Order
                                            </Link>

                                            <button type="button" onClick={handleSignOut}>
                                                <i className="bi bi-box-arrow-right"></i>
                                                Sign Out
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="desktop-login-buttons">
                                <Link to="/login" className="btn-signin">
                                    Sign In
                                </Link>
                                <Link to="/register" className="btn-register">
                                    Register
                                </Link>
                            </div>
                        )}

                        {/* MOBILE HAMBURGER */}
                        <button
                            className="navbar-toggler mobile-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarMenu"
                            aria-controls="navbarMenu"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>

                    {/* MOBILE MENU: SEARCH + BOTTOM NAVBAR */}
                    <div
                        ref={navbarMenuRef}
                        className="collapse mobile-navbar-collapse"
                        id="navbarMenu"
                    >
                        {renderSearchForm(true)}

                        <div className="mobile-bottom-navbar">
                            <BottomNavbar />
                        </div>

                        {!currentUser && (
                            <div className="mobile-login-buttons">
                                <Link to="/login" className="btn-signin">
                                    Sign In
                                </Link>
                                <Link to="/register" className="btn-register">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default TopNavbar;