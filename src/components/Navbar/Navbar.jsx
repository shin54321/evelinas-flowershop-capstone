import "./Navbar.css";

import TopNavbar from "./TopNavbar";
import BottomNavbar from "./BottomNavbar";

function Navbar() {

    return (

        <>
            <header className="site-header">
                <TopNavbar />

                {/* Desktop Only */}

                <div className="d-none d-lg-block">

                    <BottomNavbar />

                </div>
            </header>

        </>

    );

}

export default Navbar;