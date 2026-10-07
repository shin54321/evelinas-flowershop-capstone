
import { Link } from "react-router-dom";
import "./Occasion.css";

function ShopByOccasion() {

    const occasions = [
        { id: 1, name: "Birthday", icon: "🎂" },
        { id: 2, name: "Anniversary", icon: "💍" },
        { id: 3, name: "Romance", icon: "💗" },
        { id: 4, name: "Wedding", icon: "🏡" },
        { id: 5, name: "Mother's Day", icon: "👩" },
        { id: 6, name: "Thank You", icon: "🙏" }
    ];

    return (
        <section className="shop-by-occasion">

            <div className="container-lg">

                {/* =========================
                    SECTION HEADER
                ========================== */}
                <div className="occasion-header text-center">

                    <h2>Shop by Occasion</h2>

                    <p>
                        Perfect blooms for every special moment
                    </p>

                </div>


                {/* =========================
                    OCCASION CARDS
                ========================== */}
                <div className="occasion-grid">

                    {occasions.map((occasion) => (

                        <Link
                            key={occasion.id}
                            to={`/catalog?occasion=${encodeURIComponent(occasion.name)}`}
                            className="occasion-card text-decoration-none"
                        >

                            <span className="occasion-icon">
                                {occasion.icon}
                            </span>

                            <span className="occasion-name">
                                {occasion.name}
                            </span>

                        </Link>

                    ))}

                </div>

            </div>

        </section>
    );
}

export default ShopByOccasion;