import { Link } from "react-router-dom";
import BottomNavbar from "./BottomNavbar";

function TopNavbar() {
    return (
        <nav className="navbar navbar-expand-lg top-navbar sticky-top">

            <div className="container-fluid px-lg-5 px-3">

                {/* ================= Logo ================= */}

                <Link
                    to="/"
                    className="navbar-brand d-flex align-items-center text-decoration-none"
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

                {/* ================= Right Side ================= */}

                <div className="d-flex align-items-center ms-auto">

                    {/* Icons */}

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

                    {/* Hamburger */}

                    <button
                        className="navbar-toggler ms-2"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarMenu"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                </div>

                {/* ================= Collapse ================= */}

                <div
                    className="collapse navbar-collapse"
                    id="navbarMenu"
                >

                    {/* Search */}

                    <div className="search-wrapper mx-lg-auto">

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

                    {/* Login */}

                    <div className="login-buttons d-flex flex-column flex-lg-row">

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

                    {/* Mobile Bottom Navbar */}

                    <div className="d-lg-none mt-4">

                        <BottomNavbar />

                    </div>

                </div>

            </div>

        </nav>
    );
}

export default TopNavbar;