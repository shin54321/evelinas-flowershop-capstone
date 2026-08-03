import "./Categories.css";

import categories from "../../data/categories";
import CategoryCard from "./CategoryCard";

function CategorySection() {

    return (

        <section className="category-section">

            <div className="container">

                {/* Section Heading */}

                <div className="section-header">

                    <h2>Shop by Category</h2>

                    <p>
                        Browse bouquets by your favorite flower type.
                    </p>

                </div>

                {/* Category Cards */}

                <div className="row g-4 justify-content-center">

                    {categories.map((category) => (

                        <div
                            key={category.id}
                            className="col-4 col-md-4 col-lg-2"
                        >
                            <CategoryCard category={category} />
                        </div>

                    ))}

                </div>

            </div>

        </section>

    );

}

export default CategorySection;