import CatalogProductCard from "../Catalog/CatalogProductCard/CatalogProductCard";

import "./CatalogGrid.css";

function CatalogGrid({ products }) {

    if (products.length === 0) {

        return (
            <div className="catalog-empty">

                <i className="bi bi-flower1"></i>

                <h3>No bouquets found</h3>

                <p>
                    Try changing your search or filters.
                </p>

            </div>
        );
    }


    return (
        <div className="catalog-grid">

            {products.map((product) => (

                <CatalogProductCard
                    key={product.id}
                    product={product}
                />

            ))}

        </div>
    );
}

export default CatalogGrid;