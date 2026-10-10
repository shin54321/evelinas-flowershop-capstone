import { useEffect, useState } from "react";

const CART_KEY = "evelina-cart";

function getCartCount() {
    try {
        const cart = JSON.parse(localStorage.getItem(CART_KEY));

        if (!Array.isArray(cart)) return 0;

        return cart.reduce(
            (total, item) => total + Math.max(0, Number(item.quantity) || 0),
            0
        );
    } catch {
        return 0;
    }
}

export default function useCartCount() {
    const [cartCount, setCartCount] = useState(getCartCount);

    useEffect(() => {
        const updateCount = () => {
            setCartCount(getCartCount());
        };

        window.addEventListener("cartUpdated", updateCount);
        window.addEventListener("storage", updateCount);

        return () => {
            window.removeEventListener("cartUpdated", updateCount);
            window.removeEventListener("storage", updateCount);
        };
    }, []);

    return cartCount;
}
