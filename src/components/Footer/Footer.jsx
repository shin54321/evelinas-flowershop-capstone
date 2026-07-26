import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {

    return (

        <footer className="footer">

            <div className="container-fluid px-lg-4 d-flex flex-wrap">

                <div className="footer-horizontal">

                    {/* Brand */}
                    <div className="footer-main col-xl-5 col-lg-4 col-md-3 pe-3">

                        <div className="d-flex mb-3">

                            <div className="footer-logo me-2">
                                🌸
                            </div>

                            <div>

                                <h5 className="mb-0">
                                    The Flower Shop
                                </h5>

                                <small>
                                    AI-Powered Floristry
                                </small>

                            </div>

                        </div>

                        <p className="footer-description">

                            Delivering beautiful, fresh bouquets with
                            personalized recommendations and real-time
                            tracking.

                        </p>

                        <div className="footer-social row">

                            <a href="#">
                                <i className="bi bi-facebook"></i>
                            </a>

                            <a href="#">
                                <i className="bi bi-instagram"></i>
                            </a>

                            <a href="#">
                                <i className="bi bi-twitter-x"></i>
                            </a>

                        </div>

                    </div>

                    <div className="footer-column d-flex">

                        {/* Quick Links */}
                        <div className="col-xl-5 col-lg-5 col-md-4">

                            <h6>Quick Links</h6>

                            <ul className="footer-links">

                                <li>
                                    <Link to="/">
                                        Shop All
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/recommendation">
                                        AI Recommendations
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/tracking">
                                        Track Order
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/cart">
                                        Shopping Cart
                                    </Link>
                                </li>

                            </ul>

                        </div>

                        {/* Occasion */}

                        <div className="col-xl-6 col-lg-5 col-md-4">

                            <h6>Shop by Occasion</h6>

                            <ul className="footer-links">

                                <li>Birthday</li>

                                <li>Wedding</li>

                                <li>Romance</li>

                                <li>Sympathy</li>

                            </ul>

                        </div>

                        {/* Contact */}

                        <div className="col-xl-5 col-lg-5 col-md-4">

                            <h6>Contact Us</h6>

                            <ul className="footer-contact">

                                <li>
                                    <i className="bi bi-telephone me-2"></i>
                                    (555) 123-4567
                                </li>

                                <li>
                                    <i className="bi bi-envelope me-2"></i>
                                    hello@theflowershop.com
                                </li>

                                <li>
                                    <i className="bi bi-geo-alt me-2"></i>
                                    123 Blossom Street
                                </li>

                                <li>
                                    Garden City, FL 12345
                                </li>

                            </ul>

                        </div>
                    </div>
                </div>

                <hr/>

                <div className="text-center footer-bottom">

                    <p className="mb-0">

                        © 2026 The Flower Shop. All rights reserved.

                    </p>

                    <small>

                        Made with AI-powered personalization and
                        real-time order tracking.

                    </small>

                </div>

            </div>

        </footer> 

    );
    

}

export default Footer;