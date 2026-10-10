
import { Link } from "react-router-dom";
import { useState } from "react";

import initialNotifications from "../../data/notifications";
import Notifications from "../Notifications/Notifications";
import BottomNavbar from "./BottomNavbar";

function TopNavbar() {
    const [notifications, setNotifications] = useState(
        () => initialNotifications.map((notification) => ({ ...notification }))
    );

    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    // Count unread notifications after initializing state
    const unreadCount = notifications.filter(
        (notification) => notification.unread
    ).length;

    return (
        <nav className="navbar navbar-expand-lg top-navbar sticky-top">
            <div className="container-fluid px-lg-5 d-flex align-items-center flex-wrap">

                {/* LOGO */}
                <Link
                    to="/"
                    className="navbar-brand d-flex align-items-center text-decoration-none me-3 col-lg-auto"
                >
                    <div className="logo-icon">🌸</div>

                    <div className="ms-2">
                        <h5 className="logo-title mb-0">
                            Evelina's Flowershop
                        </h5>
                        <small className="logo-subtitle">
                            AI-Powered Floristry
                        </small>
                    </div>
                </Link>

                {/* SEARCH - DESKTOP */}
                <div className="search-wrapper d-none d-md-flex flex-grow-1 mx-md-3">
                    <div className="input-group">
                        <span className="input-group-text search-icon">
                            <i className="bi bi-search"></i>
                        </span>

                        <input
                            type="text"
                            className="form-control search-input"
                            placeholder="Search bouquets..."
                        />
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="visible-icons d-flex align-items-center ms-auto">

                    {/* ICONS */}
                    <div className="header-icons d-flex">

                        {/* NOTIFICATIONS */}
                        <div className="notification-nav-wrapper dropdown-center">
                            <button
                                type="button"
                                className="btn icon-btn notification-nav-btn"
                                aria-label={`${unreadCount} unread notifications`}
                                aria-expanded={isNotificationOpen}
                                onClick={() =>
                                    setIsNotificationOpen((previous) => !previous)
                                }
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
                                        onClick={() =>
                                            setIsNotificationOpen(false)
                                        }
                                    />

                                    <Notifications
                                        notifications={notifications}
                                        setNotifications={setNotifications}
                                    />
                                </>
                            )}
                        </div>

                        {/* FAVORITES */}
                        <Link to="/favorites" className="btn icon-btn">
                            <i className="bi bi-heart"></i>
                        </Link>

                        {/* CART */}
                        <Link to="/cart" className="btn icon-btn">
                            <i className="bi bi-cart"></i>
                        </Link>
                    </div>

                    {/* LOGIN BUTTONS - DESKTOP */}
                    <div className="login-buttons col-3 d-none d-md-flex ms-3">
                        <Link to="/login" className="btn btn-signin">
                            Sign In
                        </Link>

                        <Link to="/register" className="btn btn-register">
                            Register
                        </Link>
                    </div>

                    {/* HAMBURGER - MOBILE */}
                    <button
                        className="navbar-toggler d-md-none ms-3"
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

                {/* MOBILE COLLAPSE */}
                <div
                    className="mobile-search-login-row collapse navbar-collapse w-100"
                    id="navbarMenu"
                >
                    {/* MOBILE SEARCH */}
                    <div className="search-wrapper d-md-none mt-3">
                        <div className="input-group">
                            <span className="input-group-text search-icon">
                                <i className="bi bi-search"></i>
                            </span>

                            <input
                                type="text"
                                className="form-control search-input"
                                placeholder="Search bouquets..."
                            />
                        </div>
                    </div>

                    {/* MOBILE BOTTOM NAVBAR */}
                    <div className="mobile-bottom-navbar">
                        <BottomNavbar />
                    </div>

                    {/* LOGIN BUTTONS - MOBILE */}
                    <div className="login-buttons d-md-none flex-row mt-3">
                        <Link
                            to="/login"
                            className="btn btn-signin flex-fill"
                        >
                            Sign In
                        </Link>

                        <Link
                            to="/register"
                            className="btn btn-register flex-fill"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default TopNavbar;
