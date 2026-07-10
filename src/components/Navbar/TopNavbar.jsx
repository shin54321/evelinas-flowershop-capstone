import { Link } from "react-router-dom";
import BottomNavbar from "./BottomNavbar";

function TopNavbar() {
    return (
        <nav className="navbar navbar-expand-lg top-navbar sticky-top">

            <div className="container-fluid px-lg-5 d-flex align-items-center flex-wrap">

                {/* ================= Logo ================= */}

                <Link to="/" className="navbar-brand d-flex align-items-center text-decoration-none me-3 col-lg-auto">

                    <div className="logo-icon">🌸</div>

                    <div className="ms-2">
                        <h5 className="logo-title mb-0">Evelina's Flowershop</h5>
                        <small className="logo-subtitle">AI-Powered Floristry</small>
                    </div>
                </Link>

                {/* ================= Search (Desktop only, sits between logo and icons) ================= */}

                <div className="search-wrapper d-none d-lg-flex flex-grow-1 mx-lg-4">
                    <div className="input-group">
                        <span className="input-group-text search-icon">
                            <i className="bi bi-search"></i>
                        </span>
                        <input type="text" className="form-control search-input" placeholder="Search bouquets..."/>
                    </div>
                </div>

                {/* ================= Right Side: Icons + Login (desktop) + Hamburger (mobile) ================= */}

                <div className="visible-icons d-flex align-items-center ms-auto">

                    <div className="header-icons d-flex">
                        <button className="btn icon-btn">
                            <i className="bi bi-bell"></i>
                        </button>
                        <button className="btn icon-btn">
                            <i className="bi bi-heart"></i>
                        </button>
                        <button className="btn icon-btn">
                            <i className="bi bi-cart"></i>
                        </button>
                    </div>

                    {/* Login buttons — desktop only, sit right after icons */}
                    <div className="login-buttons col-3 d-none d-lg-flex ms-3">
                        <Link to="/login" className="btn btn-signin">Sign In</Link>
                        <Link to="/register" className="btn btn-register">Register</Link>
                    </div>

                    {/* Hamburger — Bootstrap auto-hides this on lg+ */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarMenu"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                </div>

                {/* ================= Collapse (Mobile only: search, bottom nav, login) ================= */}

                <div className="collapse navbar-collapse w-100" id="navbarMenu">

                    <div className="search-wrapper d-lg-none mt-3">
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

                    <div className="d-lg-none mt-4">
                        <BottomNavbar />
                    </div>

                    <div className="login-buttons d-lg-none flex-row mt-3">
                        <Link to="/login" className="btn btn-signin flex-fill">Sign In</Link>
                        <Link to="/register" className="btn btn-register flex-fill">Register</Link>
                    </div>

                </div>

            </div>

        </nav>
    );
}

export default TopNavbar;