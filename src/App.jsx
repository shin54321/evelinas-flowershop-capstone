import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Gallery from "./pages/Gallery";
import Recommendation from "./pages/Recommendation";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Tracking from "./pages/Tracking";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function Layout() {

    const location = useLocation();

    const hideNavbar =
        location.pathname === "/login" ||
        location.pathname === "/register";

    return (

        <>
        
            {!hideNavbar && <Navbar />}

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/catalog" element={<Catalog />} />

                <Route path="/gallery" element={<Gallery />} />

                <Route path="/recommendation" element={<Recommendation />} />

                <Route path="/cart" element={<Cart />} />

                <Route path="/checkout" element={<Checkout />} />

                <Route path="/tracking" element={<Tracking />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

            </Routes>

            {!hideNavbar && <Footer/>}
        
        </>

    );

}

function App() {

    return (

        <BrowserRouter>

            <Layout />

        </BrowserRouter>

    );

}

export default App;