import { Link, useLocation } from "react-router-dom";
import { navigation } from "../../data/navigation";

function BottomNavbar() {

    const location = useLocation();

    return (

        <nav className="bottom-navbar">

            <div className="container-fluid px-lg-5 px-3">

                <ul className="nav justify-content-center">

                    {navigation.map((item) => (

                        <li
                            className="nav-item"
                            key={item.path}
                        >

                            <Link
                                to={item.path}
                                className={`nav-link ${
                                    location.pathname === item.path
                                        ? "active-nav"
                                        : ""
                                }`}
                            >
                                {item.label}
                            </Link>

                        </li>

                    ))}

                </ul>

            </div>

        </nav>

    );

}

export default BottomNavbar;