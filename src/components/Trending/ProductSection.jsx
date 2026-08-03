import { Link } from "react-router-dom";

import "./Trending.css";

import products from "../../data/products.js";
import ProductCard from "../Trending/ProductCard";


function ProductSection() {

    return(

        <section className="product-section mb-5">
            <div className="container">

                {/* Section Header */}
                <div className="trending-header d-flex flex-wrap justify-content-between align-items-center mb-4">

                    <div className="text-start mb-0">
                        <h2 className="section-title">Trending Now</h2>
                        <small className="section-subtitle">Most loved by our customers this week</small>
                    </div>

                    <Link to="/catalog" className="view-all text-decoration-none mx-2 col-lg-auto">
                        
                        View All

                        <i className="bi bi-arrow-right mx-2"></i>
                    </Link>

                </div>

                {/* Product Cards */}
                <div className="row g-4 justify-content-center">

                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="col-12 col-md-6 col-lg-3"
                        >
                            <ProductCard product={product} />

                        </div>
                    ))}

                    
                </div>

            </div>    
        </section>

    );
    
}
export default ProductSection;