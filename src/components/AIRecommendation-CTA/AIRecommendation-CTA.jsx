import { Link } from "react-router-dom";

import "./AIRecommendation-CTA.css";

function AIRecommendation_CTA() {

    return (
        <section className="recommendation-cta">

            <div className="container-lg">

                <div className="recommendation-cta-content">

                    {/* Icon */}
                    <div className="recommendation-cta-icon">
                        <i className="bi bi-stars"></i>
                    </div>


                    {/* Heading */}
                    <h2>
                        Not sure what to pick?
                    </h2>


                    {/* Description */}
                    <p>
                        Our AI recommendation engine asks a few questions
                        and finds the perfect bouquet tailored just for you.
                    </p>


                    {/* Button */}
                    <Link
                        to="/recommendation"
                        className="recommendation-cta-button text-decoration-none"
                    >
                        <i className="bi bi-stars me-2"></i>

                        Get My Recommendations
                    </Link>

                </div>

            </div>

        </section>
    );
}

export default AIRecommendation_CTA;