import products from "../../data/products";
import ProductCard from "../Trending/ProductCard";
import "./ProductDetailsComponents.css";

function YouMayAlsoLike({ currentProduct }) {

    const recommendedProducts = products
        .filter((product) => product.id !== currentProduct.id)
        .slice(0, 4);

    return (
        <section className="you-may-also-like">

            <div className="you-may-also-like-header">

                <h2>
                    You May Also Like
                </h2>

                <p>
                    Discover more beautiful bouquets
                </p>

            </div>


            <div className="row g-4">

                {recommendedProducts.map((product) => (

                    <div
                        key={product.id}
                        className="col-12 col-sm-6 col-lg-3"
                    >
                        <ProductCard product={product} />
                    </div>

                ))}

            </div>

        </section>
    );
}

export default YouMayAlsoLike;