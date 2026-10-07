import "./ProductDetailsComponents.css";

function CustomerPhotos({ photos = [] }) {

    return (
        <section className="customer-photos">

            {/* Header */}
            <div className="customer-photos-header">

                <h5>
                    <i className="bi bi-camera me-2"></i>
                    Customer Photos
                </h5>

                <span>
                    {photos.length} photos
                </span>

            </div>


            {/* Photos */}
            {photos.length > 0 ? (

                <div className="customer-photos-grid">

                    {photos.map((photo) => (

                        <div
                            key={photo.id}
                            className="customer-photo-card"
                        >

                            <img
                                src={photo.image}
                                alt={`Customer photo by ${photo.customerName}`}
                            />

                            <div className="customer-photo-info">

                                <strong>
                                    {photo.customerName}
                                </strong>

                                <small>
                                    {photo.date}
                                </small>

                            </div>

                        </div>

                    ))}

                </div>

            ) : (

                /* Empty State */
                <div className="customer-photos-empty">

                    <i className="bi bi-camera"></i>

                    <h6>
                        No customer photos yet
                    </h6>

                    <p>
                        Be the first to share a photo of your bouquet!
                    </p>

                </div>

            )}

        </section>
    );
}

export default CustomerPhotos;