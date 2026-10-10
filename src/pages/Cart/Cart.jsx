import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import products from "../../data/products";
import "./Cart.css";

const CART_KEY = "evelina-cart";
const FREE_DELIVERY_MINIMUM = 1000;
const DELIVERY_FEE = 9.99;

function getCartItems() {
    try {
        const savedCart = JSON.parse(localStorage.getItem(CART_KEY));
        return Array.isArray(savedCart) ? savedCart : [];
    } catch {
        return [];
    }
}

function Cart() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState(getCartItems);

    useEffect(() => {
        const syncCart = () => {
            setCartItems(getCartItems());
        };

        window.addEventListener("cartUpdated", syncCart);
        window.addEventListener("storage", syncCart);

        return () => {
            window.removeEventListener("cartUpdated", syncCart);
            window.removeEventListener("storage", syncCart);
        };
    }, []);

    // Match saved cart items with your product data.
    const items = cartItems
        .map((item) => {
            const product = products.find(
                (product) => product.id === item.id
            );

            if (!product) return null;

            return {
                ...product,
                quantity: Math.max(1, Number(item.quantity) || 1),
            };
        })
        .filter(Boolean);

    const subtotal = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const deliveryFee =
        subtotal === 0 || subtotal >= FREE_DELIVERY_MINIMUM
            ? 0
            : DELIVERY_FEE;

    const total = subtotal + deliveryFee;
    const amountToFreeDelivery = Math.max(
        0,
        FREE_DELIVERY_MINIMUM - subtotal
    );

    const saveCart = (updatedCart) => {
        localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
        setCartItems(updatedCart);
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const updateQuantity = (productId, change) => {
        const updatedCart = cartItems
            .map((item) => {
                if (item.id !== productId) return item;

                return {
                    ...item,
                    quantity: Math.max(
                        0,
                        (Number(item.quantity) || 1) + change
                    ),
                };
            })
            .filter((item) => item.quantity > 0);

        saveCart(updatedCart);
    };

    const removeItem = (product) => {
        const updatedCart = cartItems.filter(
            (item) => item.id !== product.id
        );

        saveCart(updatedCart);
        toast.info(`${product.name} removed from your cart.`);
    };

    const handleCheckout = () => {
        navigate("/checkout");
    };

    return (
        <main className="cart-page">
            <div className="cart-container">

                {items.length === 0 ? (
                    <section className="cart-empty">
                        <i className="bi bi-bag cart-empty-icon"></i>

                        <h2>Your cart is empty</h2>

                        <p>
                            Add some beautiful bouquets to get started!
                        </p>

                        <Link
                            to="/catalog"
                            className="cart-browse-button"
                        >
                            Browse Bouquets
                        </Link>
                    </section>
                ) : (
                    <>
                      <h1 className="cart-page-title">Shopping Cart</h1>
                      <div className="cart-layout">
                          <section className="cart-items">
                              {items.map((item) => (
                                  <article
                                      className="cart-item"
                                      key={item.id}
                                  >
                                      <Link
                                          to={`/catalog/${item.slug}`}
                                          className="cart-item-image-link"
                                      >
                                          <img
                                              src={item.image}
                                              alt={item.name}
                                              className="cart-item-image"
                                          />
                                      </Link>

                                      <div className="cart-item-details">
                                          <Link
                                              to={`/catalog/${item.slug}`}
                                              className="cart-item-name"
                                          >
                                              {item.name}
                                          </Link>

                                          <p className="cart-item-category">
                                              {item.flowerTypes?.join(", ") ||
                                                  "Flower Bouquet"}
                                          </p>

                                          <div className="cart-quantity">
                                              <button
                                                  type="button"
                                                  aria-label={`Decrease ${item.name} quantity`}
                                                  onClick={() =>
                                                      updateQuantity(item.id, -1)
                                                  }
                                              >
                                                  <i className="bi bi-dash"></i>
                                              </button>

                                              <span>{item.quantity}</span>

                                              <button
                                                  type="button"
                                                  aria-label={`Increase ${item.name} quantity`}
                                                  onClick={() =>
                                                      updateQuantity(item.id, 1)
                                                  }
                                              >
                                                  <i className="bi bi-plus"></i>
                                              </button>
                                          </div>
                                      </div>

                                      <div className="cart-item-pricing">
                                          <button
                                              type="button"
                                              className="cart-remove-button"
                                              aria-label={`Remove ${item.name}`}
                                              onClick={() => removeItem(item)}
                                          >
                                              <i className="bi bi-trash3"></i>
                                          </button>

                                          <span className="cart-each-price">
                                              ₱{item.price.toFixed(2)} each
                                          </span>

                                          <strong className="cart-line-total">
                                              ₱
                                              {(
                                                  item.price * item.quantity
                                              ).toFixed(2)}
                                          </strong>
                                      </div>
                                  </article>
                              ))}
                          </section>

                          <aside className="cart-summary">
                              <h2>Order Summary</h2>

                              <div className="cart-summary-row">
                                  <span>Subtotal</span>
                                  <strong>₱{subtotal.toFixed(2)}</strong>
                              </div>

                              <div className="cart-summary-row">
                                  <span>Delivery Fee</span>
                                  <strong>
                                      {deliveryFee === 0
                                          ? "FREE"
                                          : `₱${deliveryFee.toFixed(2)}`}
                                  </strong>
                              </div>

                              {amountToFreeDelivery > 0 && (
                                  <p className="cart-free-delivery">
                                      <i className="bi bi-lightbulb-fill"></i>
                                      Spend ₱
                                      {amountToFreeDelivery.toFixed(2)} more
                                      for free delivery!
                                  </p>
                              )}

                              {deliveryFee === 0 && (
                                  <p className="cart-free-delivery">
                                      <i className="bi bi-check-circle-fill"></i>
                                      You qualify for free delivery!
                                  </p>
                              )}

                              <hr />

                              <div className="cart-summary-total">
                                  <span>Total</span>
                                  <strong>₱{total.toFixed(2)}</strong>
                              </div>

                              <button
                                  type="button"
                                  className="cart-checkout-button"
                                  onClick={handleCheckout}
                              >
                                  Proceed to Checkout
                                  <i className="bi bi-arrow-right"></i>
                              </button>

                              <Link
                                  to="/catalog"
                                  className="cart-continue-button"
                              >
                                  Continue Shopping
                              </Link>

                              <div className="cart-benefits">
                                  <h3>Order Benefits</h3>

                                  <p>✓ Real-time order tracking</p>
                                  <p>✓ Same-day delivery available</p>
                                  <p>✓ 100% freshness guarantee</p>
                                  <p>✓ Secure payment processing</p>
                              </div>
                          </aside>
                      </div>
                    </>
                  )}
              </div>
        </main>
    );
}

export default Cart;
