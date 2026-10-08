import { Link } from "react-router-dom";

import "./CollectionCTA.css";

function CollectionCTA() {

    return (
        <section className="collection-cta">

            <div className="container-lg">

                <div className="collection-cta-content">

                    {/* =========================
                        ICON
                    ========================== */}
                    <div className="collection-cta-icon">
                        <i className="bi bi-flower1"></i>
                    </div>


                    {/* =========================
                        HEADING
                    ========================== */}
                    <h2>
                        Ready to make someone's day?
                    </h2>


                    {/* =========================
                        DESCRIPTION
                    ========================== */}
                    <p>
                        Browse our full collection of handcrafted bouquets
                    </p>


                    {/* =========================
                        BUTTON
                    ========================== */}
                    <Link
                        to="/catalog"
                        className="collection-cta-button text-decoration-none"
                    >
                        Browse Collection
                    </Link>

                </div>

            </div>

        </section>
    );
}

export default CollectionCTA;