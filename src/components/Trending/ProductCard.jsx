import { Link } from "react-router-dom";

function ProductCard({product}) {
    return (

        <div className="product-card">
            <div className="card">  

                {/* Image Section */}
                <div className="image-section card-img-top">
                    
                    <Link to={product.slug} className="product-image text-decoration-none">

                        <img src={product.image} alt={product.name} />

                    </Link> 

                    {/* Badge */}
                    <h6 className="product-badge bi bi-fire d-flex ">{product.badge}</h6>

                </div>      
                
                {/* Info Section */}    
                <div className="info-section card-body mx-2"> 

                    <div className="d-flex justify-content-between align-items-center mb-0">

                        {/* Product Name */}
                        <Link to={product.slug} className="product-name card-title text-decoration-none text-start"> 

                            <h5>{product.name}</h5>

                        </Link>

                        {/* Favorite Button */}
                        <button className="favorite-btn mb-2" aria-label="Add to Favorites">
                            <i className="bi bi-heart"></i>
                        </button>

                    </div>

                    {/* Flower Types */}
                    <div className="flower-types d-flex flex-wrap mb-0">

                        {product.flowerTypes.map((flower) => (

                            <span key={flower} className="flower-badge text-start mb-2">{flower}</span>

                        ))}
                    </div>

                    {/* Description */}
                    <p className="description card-text text-start">{product.description}</p>

                    {/* Occasions */}
                    <div className="occasion-tags d-flex gap-2 flex-wrap">

                        {product.occasions.map((occasion) => (

                            <span
                                key={occasion}
                                className="occasion-badge"
                            >

                                {occasion}

                            </span>

                        ))}

                    </div>

                </div>

                {/* Footer */}
                <div className="product-footer d-flex flex-wrap justify-content-between align-items-center">

                    {/* Price */}
                    <h5 className="product-price"> ₱{product.price} </h5>

                    <Link
                        to={product.slug}
                        className="btn view-details-btn text-decoration-none d-flex align-items-center justify-content-center"
                    >
                        <i className="bi bi-box-arrow-up-right me-2"></i>

                        <span>View Details</span>

                    </Link>

                </div>
            </div>    
        </div>
    );
}
export default ProductCard;