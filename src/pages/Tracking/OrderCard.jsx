import { useState } from "react";
import products from "../../data/products";

function formatDate(value) {
    if (!value) return "Not available";
    // Date-only strings are parsed locally to avoid timezone shifting.
    if (/^\\d{4}-\\d{2}-\\d{2}$/.test(value)) {
        const [year, month, day] = value.split("-").map(Number);
        return new Date(year, month - 1, day).toLocaleDateString("en-PH");
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Not available";
    return date.toLocaleDateString("en-PH");
}

function formatTime(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleTimeString("en-PH", {
        hour: "2-digit",
        minute: "2-digit",
    });
}

function money(value) {
    return `₱${Number(value || 0).toFixed(2)}`;
}

function OrderCard({ order, onCancel, stage }) {
    const [showReceipt, setShowReceipt] = useState(false);
    const customer = order.customer || {};
    const address = [
        customer.streetAddress,
        customer.city,
        customer.zipCode,
    ].filter(Boolean).join(", ");

    const estimatedDate = new Date(order.createdAt || new Date().toISOString());
    estimatedDate.setDate(estimatedDate.getDate() + 1);

    const statusText = {
        pay: "Order placed — awaiting payment",
        ship: "Order is being prepared",
        receive: "Order is out for delivery",
        rate: "Order delivered — awaiting review",
    };

    const paymentLabels = {
        cod: "Cash on Delivery",
        ewallet: "E-Wallet",
        bank: "Bank Transfer",
    };
    const paymentLabel = paymentLabels[order.paymentMethod] ||
        order.paymentMethod || "Payment not specified";
    const orderItems = order.items || [];

    return (
        <article className="tracking-order-card">
            <header className="tracking-order-header">
                <div>
                    <span>Order ID</span>
                    <strong>{order.orderId}</strong>
                </div>
                <div className="tracking-order-date">
                    <span>Order Date</span>
                    <strong>{formatDate(order.createdAt)}</strong>
                </div>
            </header>

            <div className="tracking-order-body">
                <div className="tracking-products">
                    {orderItems.map((item, index) => {
                        const product = products.find((entry) => entry.id === item.id);
                        const image = item.image || product?.image;
                        return (
                            <div className="tracking-product" key={`${item.id}-${index}`}>
                                {image ? (
                                    <img src={image} alt={item.name} />
                                ) : (
                                    <span className="tracking-product-placeholder">
                                        <i className="bi bi-flower1"></i>
                                    </span>
                                )}
                                <div className="tracking-product-details">
                                    <strong>{item.name}</strong>
                                    <span>Qty: {item.quantity}</span>
                                    {item.deliveryDate && (
                                        <span className="tracking-item-note">
                                            <i className="bi bi-calendar-heart"></i>
                                            Preferred delivery: {formatDate(item.deliveryDate)}
                                        </span>
                                    )}
                                    {item.customMessage?.trim() && (
                                        <span className="tracking-item-note tracking-custom-message">
                                            <i className="bi bi-chat-heart"></i>
                                            Message: {item.customMessage}
                                        </span>
                                    )}
                                </div>
                                <strong className="tracking-item-price">
                                    {money(Number(item.price) * Number(item.quantity))}
                                </strong>
                            </div>
                        );
                    })}
                </div>

                <div className="tracking-delivery-grid">
                    <div>
                        <span>Deliver to</span>
                        <strong>{address || "Address not provided"}</strong>
                    </div>
                    <div>
                        <span>Est. Delivery</span>
                        <strong>{formatDate(estimatedDate)}</strong>
                    </div>
                </div>

                <div className="tracking-status-line">
                    <span>
                        <i className="bi bi-clock-history"></i>
                        {statusText[stage] || `Order status: ${order.status || "Pending"}`}
                    </span>
                    <time>{formatTime(order.createdAt)}</time>
                </div>

                <div className="tracking-order-total-row">
                    <span className="tracking-payment-label">{paymentLabel}</span>
                    <strong>{money(order.total)}</strong>
                </div>

                <div className="tracking-order-actions tracking-receipt-actions">
                    <button
                        type="button"
                        onClick={() => setShowReceipt((visible) => !visible)}
                        aria-expanded={showReceipt}
                    >
                        <i className={`bi ${showReceipt ? "bi-receipt-cutoff" : "bi-receipt"}`}></i>
                        {showReceipt ? "Hide Receipt" : "View Receipt"}
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setShowReceipt(true);
                            window.setTimeout(() => window.print(), 100);
                        }}
                    >
                        <i className="bi bi-printer"></i> Print Receipt
                    </button>
                </div>

                {showReceipt && (
                    <section className="tracking-receipt" aria-label={`Receipt for ${order.orderId}`}>
                        <div className="tracking-receipt-heading">
                            <div className="tracking-receipt-flower">✿</div>
                            <h3>Evelina's Flowershop</h3>
                            <p>ORDER RECEIPT</p>
                        </div>

                        <div className="tracking-receipt-meta">
                            <div><span>Transaction / Order ID</span><strong>{order.orderId}</strong></div>
                            <div><span>Order Date</span><strong>{formatDate(order.createdAt)}</strong></div>
                            <div><span>Customer</span><strong>{customer.fullName || "Customer"}</strong></div>
                            <div><span>Email</span><strong>{customer.email || "Not provided"}</strong></div>
                            <div><span>Phone</span><strong>{customer.phone || "Not provided"}</strong></div>
                            <div><span>Delivery Address</span><strong>{address || "Not provided"}</strong></div>
                            <div><span>Payment Method</span><strong>{paymentLabel}</strong></div>
                            <div><span>Order Status</span><strong>{order.status || "Pending"}</strong></div>
                        </div>

                        <div className="tracking-receipt-items">
                            <h4>Order Items</h4>
                            {orderItems.map((item, index) => (
                                <div className="tracking-receipt-item" key={`${item.id}-receipt-${index}`}>
                                    <div className="tracking-receipt-item-main">
                                        <strong>{item.name}</strong>
                                        <span>{item.quantity} × {money(item.price)}</span>
                                    </div>
                                    <strong>{money(Number(item.price) * Number(item.quantity))}</strong>
                                    <div className="tracking-receipt-item-notes">
                                        <span><b>Preferred delivery date:</b> {item.deliveryDate ? formatDate(item.deliveryDate) : "Not specified"}</span>
                                        <span><b>Custom message:</b> {item.customMessage?.trim() || "No custom message"}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="tracking-receipt-totals">
                            <div><span>Subtotal</span><strong>{money(order.subtotal)}</strong></div>
                            <div><span>Delivery fee</span><strong>{Number(order.deliveryFee || 0) === 0 ? "FREE" : money(order.deliveryFee)}</strong></div>
                            <div className="tracking-receipt-grand-total"><span>Total</span><strong>{money(order.total)}</strong></div>
                        </div>
                        <p className="tracking-receipt-thanks">Thank you for ordering from Evelina's Flowershop!</p>
                    </section>
                )}

                {stage === "pay" && (
                    <div className="tracking-order-actions">
                        <p>
                            Awaiting payment verification — your order will
                            be processed once payment is confirmed.
                        </p>
                        <button type="button" onClick={() => onCancel(order.orderId)}>
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </article>
    );
}

export default OrderCard;
