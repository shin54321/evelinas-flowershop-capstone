import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import {ToastContainer} from "react-toastify";

import Home from "./pages/Home";
import Catalog from "./pages/CatalogPage/Catalog";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Gallery from "./pages/Gallery/Gallery";
import AIRecommendation from "./pages/AIRecommendation/AIRecommendation";
import Favorites from "./pages/Favorites/Favorites";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation/OrderConfirmation";
import Tracking from "./pages/Tracking/Tracking";
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

                <Route path="/catalog/:slug" element={<ProductDetails />} />

                <Route path="/gallery" element={<Gallery />} />

                <Route path="/recommendation" element={<AIRecommendation />} />

                <Route path="/favorites" element={<Favorites />} />

                <Route path="/cart" element={<Cart />} />

                <Route path="/checkout" element={<Checkout />} />

                <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />

                <Route path="/track-order" element={<Tracking />} />

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
    <>   
        <BrowserRouter>

            <Layout />

        </BrowserRouter>

        <ToastContainer
            position="top-right"
            autoClose={1000}
            newestOnTop
            pauseOnHover            
                
                toastStyle={{ width: "400px",
                    borderRadius: "var(--radius-sm)",
                    padding: "5px 10px",
                    margin: "0px 10px",
                    gap: "5px",
                    fontSize: "0.80rem",
                    top: "20px"
                }}
                
        />
    </> 
    );

}

export default App;