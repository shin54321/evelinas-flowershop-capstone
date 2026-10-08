import "./Testimonials.css";

function CustomerTestimonials() {

    const testimonials = [
        {
            id: 1,
            initial: "S",
            name: "Sofia R.",
            rating: 5,
            message:
                "Absolutely gorgeous! The pink roses were so fresh and fragrant. My girlfriend was speechless. Will definitely order again!"
        },
        {
            id: 2,
            initial: "M",
            name: "Marco D.",
            rating: 5,
            message:
                "Classic Red Romance lived up to its name. Perfect for our anniversary. Delivery was on time and packaging was beautiful."
        },
        {
            id: 3,
            initial: "I",
            name: "Isabelle F.",
            rating: 5,
            message:
                "The peonies were breathtaking! Ordered for my wedding and every guest complimented the arrangements. 10/10!"
        }
    ];

    return (
        <section className="customer-testimonials">

            <div className="container-lg">

                {/* =========================
                    HEADER
                ========================== */}
                <div className="testimonials-header text-center">

                    <h2>
                        What Our Customers Say
                    </h2>

                    <div className="testimonials-overall-rating">

                        {[1, 2, 3, 4, 5].map((star) => (
                            <i
                                key={star}
                                className="bi bi-star-fill"
                            ></i>
                        ))}

                    </div>

                    <p>
                        4.9 stars from over 10,000 happy customers
                    </p>

                </div>


                {/* =========================
                    TESTIMONIAL CARDS
                ========================== */}
                <div className="testimonials-grid">

                    {testimonials.map((testimonial) => (

                        <div
                            key={testimonial.id}
                            className="testimonial-card"
                        >

                            {/* Quote Icon */}
                            <i className="bi bi-quote testimonial-quote"></i>


                            {/* Message */}
                            <p className="testimonial-message">
                                "{testimonial.message}"
                            </p>


                            {/* Customer */}
                            <div className="testimonial-customer">

                                <div className="testimonial-avatar">
                                    {testimonial.initial}
                                </div>

                                <div className="testimonial-customer-info">

                                    <strong>
                                        {testimonial.name}
                                    </strong>

                                    <div className="testimonial-stars">

                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <i
                                                key={star}
                                                className={
                                                    star <= testimonial.rating
                                                        ? "bi bi-star-fill"
                                                        : "bi bi-star"
                                                }
                                            ></i>
                                        ))}

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}

export default CustomerTestimonials;