import products from "../../data/products";

function formatDate(value) {
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

function OrderCard({ order, onCancel, stage }) {
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
                    {(order.items || []).map((item, index) => {
                        const product = products.find(
                            (entry) => entry.id === item.id
                        );

                        return (
                            <div
                                className="tracking-product"
                                key={`${item.id}-${index}`}
                            >
                                {product?.image ? (
                                    <img src={product.image} alt={item.name} />
                                ) : (
                                    <span className="tracking-product-placeholder">
                                        <i className="bi bi-flower1"></i>
                                    </span>
                                )}

                                <div className="tracking-product-details">
                                    <strong>{item.name}</strong>
                                    <span>Qty: {item.quantity}</span>
                                </div>

                                <strong className="tracking-item-price">
                                    ₱{(
                                        Number(item.price) *
                                        Number(item.quantity)
                                    ).toFixed(2)}
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
                        {statusText[stage]}
                    </span>
                    <time>{formatTime(order.createdAt)}</time>
                </div>

                <div className="tracking-order-total-row">
                    <span className="tracking-payment-label">
                        {paymentLabels[order.paymentMethod] ||
                            order.paymentMethod ||
                            "Payment not specified"}
                    </span>

                    <strong>
                        ₱{Number(order.total || 0).toFixed(2)}
                    </strong>
                </div>

                {stage === "pay" && (
                    <div className="tracking-order-actions">
                        <p>
                            Awaiting payment verification — your order will
                            be processed once payment is confirmed.
                        </p>

                        <button
                            type="button"
                            onClick={() => onCancel(order.orderId)}
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </article>
    );
}

export default OrderCard;