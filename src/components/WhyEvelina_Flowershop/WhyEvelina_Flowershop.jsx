import "./WhyEvelina_Flowershop.css";

function WhyEvelinas_Flowershop() {

    const benefits = [
        {
            id: 1,
            icon: "🌿",
            title: "Farm Fresh",
            description:
                "Sourced directly from local farms for maximum freshness"
        },
        {
            id: 2,
            icon: "🎨",
            title: "Expert Design",
            description:
                "Crafted by experienced florists with an eye for beauty"
        },
        {
            id: 3,
            icon: "⚡",
            title: "Fast Delivery",
            description:
                "Same-day delivery available for orders placed before 2 PM"
        },
        {
            id: 4,
            icon: "💯",
            title: "Satisfaction Guaranteed",
            description:
                "Not happy? We'll replace or refund, no questions asked"
        }
    ];

    return (
        <section className="why-evelinas">

            <div className="container-lg">

                {/* =========================
                    SECTION HEADER
                ========================== */}
                <div className="why-evelinas-header text-center">

                    <h2>
                        Why Evelina's Flowershop?
                    </h2>

                </div>


                {/* =========================
                    BENEFITS
                ========================== */}
                <div className="why-evelinas-grid">

                    {benefits.map((benefit) => (

                        <div
                            key={benefit.id}
                            className="why-evelinas-card"
                        >

                            <div className="why-evelinas-icon">
                                {benefit.icon}
                            </div>

                            <h3>
                                {benefit.title}
                            </h3>

                            <p>
                                {benefit.description}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}

export default WhyEvelinas_Flowershop;