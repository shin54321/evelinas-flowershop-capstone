import { Link } from "react-router-dom";

import orchidImg from "../../assets/images/products/orchid.jpg";
import rosebouquetImg from "../../assets/images/products/rose-bouquet.jpg";
import sunflowerbouquetImg from "../../assets/images/products/sunflower-bouquet.jpg";
import tulipImg from "../../assets/images/products/tulip.jpg";

import "./CustomerGallery.css";


function CustomerGallery() {

    const customerPhotos = [
        {
            id: 1,
            image: rosebouquetImg,
            alt: "Customer photo of a rose bouquet"
        },
        {
            id: 2,
            image: orchidImg,
            alt: "Customer photo of orchids"
        },
        {
            id: 3,
            image: tulipImg,
            alt: "Customer photo of tulips"
        },
        {
            id: 4,
            image: sunflowerbouquetImg,
            alt: "Customer photo of sunflowers"
        }
    ];


    return (
        <section className="customer-gallery">

            <div className="container-lg">

                {/* =========================
                    HEADER
                ========================== */}
                <div className="customer-gallery-header">

                    <div>

                        <h2>
                            Customer Gallery
                        </h2>

                        <p>
                            Real photos from our happy customers
                        </p>

                    </div>


                    {/* View All */}
                    <Link
                        to="/gallery"
                        className="customer-gallery-view-all text-decoration-none"
                    >
                        <i className="bi bi-camera me-2"></i>

                        <span>
                            View All
                        </span>

                        <i className="bi bi-arrow-right ms-2"></i>
                    </Link>

                </div>


                {/* =========================
                    PHOTO GRID
                ========================== */}
                <div className="customer-gallery-grid">

                    {customerPhotos.map((photo) => (

                        <div
                            key={photo.id}
                            className="customer-gallery-photo"
                        >

                            <img
                                src={photo.image}
                                alt={photo.alt}
                            />

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}


export default CustomerGallery;