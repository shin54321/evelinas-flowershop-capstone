import { Link } from "react-router-dom";
import BottomNavbar from "./BottomNavbar";

function TopNavbar() {

    return (
        <nav className="navbar navbar-expand-lg top-navbar sticky-top">

            <div className="container-fluid px-lg-5 d-flex align-items-center flex-wrap">

                {/* =========================
                    LOGO
                ========================== */}

                <Link
                    to="/"
                    className="navbar-brand d-flex align-items-center text-decoration-none me-3 col-lg-auto"
                >

                    <div className="logo-icon">
                        🌸
                    </div>

                    <div className="ms-2">

                        <h5 className="logo-title mb-0">
                            Evelina's Flowershop
                        </h5>

                        <small className="logo-subtitle">
                            AI-Powered Floristry
                        </small>

                    </div>

                </Link>


                {/* =========================
                    SEARCH - DESKTOP
                ========================== */}

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


                {/* =========================
                    RIGHT SIDE
                    Icons + Login + Hamburger
                ========================== */}

                <div className="visible-icons d-flex align-items-center ms-auto">

                    {/* Icons */}
                    <div className="header-icons d-flex">

                        <button className="btn icon-btn">
                            <i className="bi bi-bell"></i>
                        </button>

                        <Link
                            to="/favorites"
                            className="btn icon-btn"
                        >
                            <i className="bi bi-heart"></i>
                        </Link>

                        <Link
                            to="/cart"
                            className="btn icon-btn"
                        >
                            <i className="bi bi-cart"></i>
                        </Link>

                    </div>


                    {/* =========================
                        LOGIN BUTTONS
                        Desktop only
                    ========================== */}

                    <div className="login-buttons col-3 d-none d-md-flex ms-3">

                        <Link
                            to="/login"
                            className="btn btn-signin"
                        >
                            Sign In
                        </Link>

                        <Link
                            to="/register"
                            className="btn btn-register"
                        >
                            Register
                        </Link>

                    </div>


                    {/* =========================
                        HAMBURGER
                        Mobile only
                    ========================== */}

                    <button
                        className="navbar-toggler d-md-none ms-3"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarMenu"
                    >

                        <span className="navbar-toggler-icon"></span>

                    </button>

                </div>


                {/* =========================
                    MOBILE COLLAPSE
                    Search + Login/Register
                ========================== */}

                <div className="mobile-search-login-row collapse navbar-collapse w-100"
                    id="navbarMenu" >

                    {/* Mobile Search */}
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
                    
                    {/* Mobile Login Buttons */}
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