import { Link } from "react-router-dom";

function CategoryCard({ category }) {

    return (

        <Link

            to={category.route}

            className={`category-card ${category.theme}`}

        >

            <div className="category-icon-wrapper">

                <img

                    src={category.icon}

                    alt={category.name}

                    className="category-icon"

                />

            </div>

            <h6>{category.name}</h6>

        </Link>

    );

}

export default CategoryCard;