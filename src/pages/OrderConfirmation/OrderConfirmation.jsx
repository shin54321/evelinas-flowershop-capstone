import { Link, useParams, Navigate } from "react-router-dom";
import { useMemo } from "react";
import "./OrderConfirmation.css";

function OrderConfirmation() {
    const { orderId } = useParams();

    const order = useMemo(() => {
        try {
            const orders = JSON.parse(
                localStorage.getItem("evelina-orders") || "[]"
            );

            return orders.find((item) => item.orderId === orderId) || null;
        } catch {
            return null;
        }
    }, [orderId]);

    if (!order) {
        return <Navigate to="/catalog" replace />;
    }

    const customer = order.customer || {};

    const estimatedDate = new Date();
    estimatedDate.setDate(estimatedDate.getDate() + 1);

    const formattedDate = estimatedDate.toLocaleDateString("en-PH", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return (
        <main className="confirmation-page">
            <section className="confirmation-header">
                <span className="confirmation-success-icon">
                    <i className="bi bi-check-circle"></i>
                </span>

                <h1>Order Confirmed!</h1>

                <p>
                    Thank you for your order. We're preparing your
                    beautiful bouquet!
                </p>
            </section>

            <div className="confirmation-container">
                <div className="confirmation-details-grid">
                    <section className="confirmation-card">
                        <h2>
                            <i className="bi bi-box-seam"></i>
                            Order Details
                        </h2>

                        <div className="confirmation-info-group">
                            <span>Order Number</span>
                            <strong>{order.orderId}</strong>
                        </div>

                        <div className="confirmation-info-group">
                            <span>Items</span>

                            {order.items?.map((item) => (
                                <div
                                    className="confirmation-item"
                                    key={item.id}
                                >
                                    <span>
                                        {item.name} × {item.quantity}
                                    </span>

                                    <strong>
                                        ₱
                                        {(
                                            item.price * item.quantity
                                        ).toFixed(2)}
                                    </strong>
                                </div>
                            ))}
                        </div>

                        <div className="confirmation-total">
                            <strong>Total</strong>
                            <strong>
                                ₱{Number(order.total).toFixed(2)}
                            </strong>
                        </div>
                    </section>

                    <section className="confirmation-card">
                        <h2>
                            <i className="bi bi-geo-alt"></i>
                            Delivery Information
                        </h2>

                        <div className="confirmation-info-group">
                            <span>
                                <i className="bi bi-calendar3"></i>
                                Estimated Delivery
                            </span>
                            <strong>{formattedDate}</strong>
                        </div>

                        <div className="confirmation-info-group">
                            <span>
                                <i className="bi bi-geo-alt"></i>
                                Delivery Address
                            </span>
                            <strong>
                                {customer.streetAddress}
                                {customer.city
                                    ? `, ${customer.city}`
                                    : ""}
                                {customer.zipCode
                                    ? `, ${customer.zipCode}`
                                    : ""}
                            </strong>
                        </div>

                        <div className="confirmation-info-group">
                            <span>
                                <i className="bi bi-telephone"></i>
                                Phone
                            </span>
                            <strong>{customer.phone}</strong>
                        </div>

                        <div className="confirmation-info-group">
                            <span>
                                <i className="bi bi-envelope"></i>
                                Email
                            </span>
                            <strong>{customer.email}</strong>
                        </div>
                    </section>
                </div>

                <section className="confirmation-card confirmation-steps">
                    <h2>What happens next?</h2>

                    <div className="confirmation-step-grid">
                        <div className="confirmation-step">
                            <span className="confirmation-step-number">1</span>
                            <h3>Order Confirmation</h3>
                            <p>
                                Your order has been received successfully.
                            </p>
                        </div>

                        <div className="confirmation-step">
                            <span className="confirmation-step-number">2</span>
                            <h3>Preparation</h3>
                            <p>
                                Our florists will carefully arrange your
                                bouquet.
                            </p>
                        </div>

                        <div className="confirmation-step">
                            <span className="confirmation-step-number">3</span>
                            <h3>Delivery</h3>
                            <p>
                                Track your order as it moves toward delivery.
                            </p>
                        </div>
                    </div>
                </section>

                <div className="confirmation-actions">
                    <Link
                        to={`/track-order?orderId=${encodeURIComponent(order.orderId)}`}
                        className="confirmation-track-button"
                    >
                        <i className="bi bi-box-seam"></i>
                        Track Your Order
                    </Link>

                    <Link
                        to="/catalog"
                        className="confirmation-shop-button"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default OrderConfirmation;