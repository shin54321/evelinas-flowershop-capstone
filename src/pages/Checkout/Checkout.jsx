import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import products from "../../data/products";
import "./Checkout.css";

const CART_KEY = "evelina-cart";
const DELIVERY_FEE = 9.99;

const paymentMethods = [
    {
        id: "cod",
        title: "Cash on Delivery",
        description: "Pay when your bouquet arrives",
        icon: "bi-cash",
    },
    {
        id: "ewallet",
        title: "E-Wallet",
        description: "GCash, Maya, PayPal, etc.",
        icon: "bi-wallet2",
    },
    {
        id: "bank",
        title: "Bank Transfer",
        description: "Direct bank deposit / transfer",
        icon: "bi-credit-card",
    },
];

function getCartItems() {
    try {
        const saved = JSON.parse(localStorage.getItem(CART_KEY));
        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
}

function Checkout() {
    const navigate = useNavigate();
    const [cartItems] = useState(getCartItems);
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [paymentProof, setPaymentProof] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const deliveryFee = subtotal >= 1000 ? 0 : DELIVERY_FEE;
    const total = subtotal + deliveryFee;

    const handleSubmit = (event) => {
        event.preventDefault();

        if (items.length === 0) {
            toast.error("Your cart is empty. Please add a bouquet first.");
            return;
        }

        if (
            paymentMethod !== "cod" &&
            !paymentProof
        ) {
            toast.error("Please upload your payment proof.");
            return;
        }

        setIsSubmitting(true);

        try {
            const form = event.currentTarget;
            const formData = new FormData(form);

            const order = {
                orderId: `EV-${Date.now()}`,
                items: items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                })),
                customer: {
                    fullName: formData.get("fullName"),
                    email: formData.get("email"),
                    phone: formData.get("phone"),
                    streetAddress: formData.get("streetAddress"),
                    city: formData.get("city"),
                    zipCode: formData.get("zipCode"),
                },
                paymentMethod,
                subtotal,
                deliveryFee,
                total,
                status: "Pending",
                createdAt: new Date().toISOString(),
            };

            const savedOrders = JSON.parse(
                localStorage.getItem("evelina-orders") || "[]"
            );

            localStorage.setItem(
                "evelina-orders",
                JSON.stringify([...savedOrders, order])
            );

            window.dispatchEvent(new Event("ordersUpdated"));

            localStorage.removeItem("evelina-cart");
            window.dispatchEvent(new Event("cartUpdated"));

            navigate(`/order-confirmation/${order.orderId}`);

            form.reset();
            setPaymentMethod("cod");
            setPaymentProof(null);

            // The order is saved locally for this frontend demo.
            // Payment proof files are not uploaded or stored.
        } catch {
            toast.error("Unable to place your order. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="checkout-page">
            <header className="checkout-banner">
                <div className="checkout-container">
                    <h1>Checkout</h1>
                    <p>
                        Complete your order from Evelina's Flowershop
                    </p>
                </div>
            </header>

            <div className="checkout-container checkout-layout">
                <form
                    id="checkout-form"
                    className="checkout-form"
                    onSubmit={handleSubmit}
                >
                    {/* CUSTOMER INFORMATION */}
                    <section className="checkout-card">
                        <h2 className="checkout-section-title">
                            <i className="bi bi-person"></i>
                            Customer Information
                        </h2>

                        <div className="checkout-field">
                            <label htmlFor="fullName">Full Name *</label>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                autoComplete="name"
                                required
                            />
                        </div>

                        <div className="checkout-form-row">
                            <div className="checkout-field">
                                <label htmlFor="email">Email *</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                />
                            </div>

                            <div className="checkout-field">
                                <label htmlFor="phone">Phone *</label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    autoComplete="tel"
                                    required
                                />
                            </div>
                        </div>
                    </section>

                    {/* DELIVERY ADDRESS */}
                    <section className="checkout-card">
                        <h2 className="checkout-section-title">
                            <i className="bi bi-geo-alt"></i>
                            Delivery Address
                        </h2>

                        <div className="checkout-field">
                            <label htmlFor="streetAddress">
                                Street Address *
                            </label>
                            <input
                                id="streetAddress"
                                name="streetAddress"
                                type="text"
                                autoComplete="street-address"
                                required
                            />
                        </div>

                        <div className="checkout-form-row">
                            <div className="checkout-field">
                                <label htmlFor="city">City *</label>
                                <input
                                    id="city"
                                    name="city"
                                    type="text"
                                    autoComplete="address-level2"
                                    required
                                />
                            </div>

                            <div className="checkout-field">
                                <label htmlFor="zipCode">ZIP Code</label>
                                <input
                                    id="zipCode"
                                    name="zipCode"
                                    type="text"
                                    inputMode="numeric"
                                    autoComplete="postal-code"
                                />
                            </div>
                        </div>
                    </section>

                    {/* PAYMENT METHOD */}
                    <section className="checkout-card">
                        <h2 className="checkout-section-title">
                            <i className="bi bi-credit-card"></i>
                            Payment Method
                        </h2>

                        <div className="checkout-payment-options">
                            {paymentMethods.map((method) => (
                                <label
                                    key={method.id}
                                    className={`checkout-payment-option ${
                                        paymentMethod === method.id
                                            ? "selected"
                                            : ""
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value={method.id}
                                        checked={
                                            paymentMethod === method.id
                                        }
                                        onChange={() => {
                                            setPaymentMethod(method.id);
                                            setPaymentProof(null);
                                        }}
                                    />

                                    <span className="checkout-payment-icon">
                                        <i
                                            className={`bi ${method.icon}`}
                                        ></i>
                                    </span>

                                    <span className="checkout-payment-text">
                                        <strong>{method.title}</strong>
                                        <small>{method.description}</small>
                                    </span>
                                </label>
                            ))}
                        </div>

                        {paymentMethod === "cod" && (
                            <div className="checkout-payment-notice cod-notice">
                                <i className="bi bi-truck"></i>
                                <span>
                                    <strong>Cash on Delivery:</strong>{" "}
                                    Please prepare the exact amount. Our
                                    rider will collect payment upon delivery.
                                </span>
                            </div>
                        )}

                        {paymentMethod === "ewallet" && (
                            <>
                                <div className="checkout-payment-details">
                                    <strong>E-Wallet Payment Details</strong>
                                    <p>GCash: 0917-123-4567</p>
                                    <p>Maya: 0999-876-5432</p>
                                    <p>PayPal: payments@evelinas.com</p>
                                </div>

                                <PaymentProofUpload
                                    paymentProof={paymentProof}
                                    setPaymentProof={setPaymentProof}
                                />
                            </>
                        )}

                        {paymentMethod === "bank" && (
                            <>
                                <div className="checkout-payment-details">
                                    <strong>Bank Transfer Details</strong>
                                    <p>BPI Savings: 1234-5678-90</p>
                                    <p>BDO: 0987-6543-21</p>
                                    <p>
                                        Account Name: Evelina's Flowershop
                                    </p>
                                </div>

                                <PaymentProofUpload
                                    paymentProof={paymentProof}
                                    setPaymentProof={setPaymentProof}
                                />
                            </>
                        )}
                    </section>

                    <button
                        type="submit"
                        className="checkout-mobile-submit"
                        disabled={isSubmitting || items.length === 0}
                    >
                        {isSubmitting ? "Placing Order..." : "Place Order"}
                    </button>
                </form>

                {/* ORDER SUMMARY */}
                <aside className="checkout-summary">
                    <h2>Order Summary</h2>

                    {items.length === 0 ? (
                        <div className="checkout-empty">
                            <p>Your cart is empty.</p>
                            <Link to="/catalog">Browse Bouquets</Link>
                        </div>
                    ) : (
                        <>
                            <div className="checkout-summary-items">
                                {items.map((item) => (
                                    <div
                                        className="checkout-summary-item"
                                        key={item.id}
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                        />

                                        <div className="checkout-summary-product">
                                            <strong>{item.name}</strong>
                                            <span>Qty: {item.quantity}</span>
                                        </div>

                                        <strong className="checkout-product-price">
                                            ₱
                                            {(
                                                item.price * item.quantity
                                            ).toFixed(2)}
                                        </strong>
                                    </div>
                                ))}
                            </div>

                            <div className="checkout-total-row">
                                <span>Subtotal</span>
                                <span>₱{subtotal.toFixed(2)}</span>
                            </div>

                            <div className="checkout-total-row">
                                <span>Delivery</span>
                                <span>
                                    {deliveryFee === 0
                                        ? "FREE"
                                        : `₱${deliveryFee.toFixed(2)}`}
                                </span>
                            </div>

                            <div className="checkout-total-row">
                                <span>Payment</span>
                                <span className="checkout-payment-label">
                                    {
                                        paymentMethods.find(
                                            (method) =>
                                                method.id === paymentMethod
                                        )?.title
                                    }
                                </span>
                            </div>

                            <div className="checkout-grand-total">
                                <span>Total</span>
                                <strong>₱{total.toFixed(2)}</strong>
                            </div>

                            <button
                                type="submit"
                                form="checkout-form"
                                className="checkout-place-order"
                                disabled={isSubmitting || items.length === 0}
                            >
                                {isSubmitting
                                    ? "Placing Order..."
                                    : "Place Order"}
                            </button>

                            <p className="checkout-terms">
                                By placing this order you agree to our terms.
                            </p>
                        </>
                    )}
                </aside>
            </div>
        </main>
    );
}

function PaymentProofUpload({ paymentProof, setPaymentProof }) {
    return (
        <div className="checkout-proof-section">
            <label htmlFor="paymentProof">
                Upload Payment Proof *{" "}
                <small>(screenshot/receipt)</small>
            </label>

            <label
                htmlFor="paymentProof"
                className="checkout-upload-box"
            >
                <i className="bi bi-cloud-arrow-up"></i>

                {paymentProof ? (
                    <span>{paymentProof.name}</span>
                ) : (
                    <>
                        <span>Click to upload payment screenshot</span>
                        <small>JPG, PNG, GIF accepted</small>
                    </>
                )}
            </label>

            <input
                id="paymentProof"
                type="file"
                accept="image/jpeg,image/png,image/gif"
                className="checkout-file-input"
                onChange={(event) => {
                    const file = event.target.files?.[0];

                    if (file && file.size > 5 * 1024 * 1024) {
                        toast.error("File must be 5 MB or smaller.");
                        event.target.value = "";
                        setPaymentProof(null);
                        return;
                    }

                    setPaymentProof(file || null);
                }}
            />
        </div>
    );
}

export default Checkout;