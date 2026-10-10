import OrderCard from "../OrderCard";
import "../OrderCard.css";

function ToRate({ orders }) {
    if (orders.length === 0) {
        return (
            <div className="tracking-empty">
                <i className="bi bi-star"></i>
                <h3>No orders to rate</h3>
                <p>Delivered orders awaiting a review will appear here.</p>
            </div>
        );
    }

    return (
        <div className="tracking-order-list">
            {orders.map((order) => (
                <OrderCard
                    key={order.orderId}
                    order={order}
                    stage="rate"
                />
            ))}
        </div>
    );
}

export default ToRate;