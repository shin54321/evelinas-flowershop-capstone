import "./Navbar.css";

import TopNavbar from "./TopNavbar";
import BottomNavbar from "./BottomNavbar";

function Navbar() {

    return (

        <>
            <header className="site-header">
                <TopNavbar />

                 {/* =========================
                    BOTTOM NAVBAR
                    Visible from small mobile and above
                ========================== */}
                <div className="desktop-bottom-navbar  d-none d-sm-block">

                    <BottomNavbar />

                </div>
            </header>

        </>

    );

}

export default Navbar;