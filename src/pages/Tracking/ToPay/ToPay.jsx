import OrderCard from "../OrderCard";
import "../OrderCard.css";

function ToPay({ orders, onCancel }) {
    if (orders.length === 0) {
        return (
            <div className="tracking-empty">
                <i className="bi bi-wallet2"></i>
                <h3>No orders to pay</h3>
                <p>Your pending orders will appear here.</p>
            </div>
        );
    }

    return (
        <div className="tracking-order-list">
            {orders.map((order) => (
                <OrderCard
                    key={order.orderId}
                    order={order}
                    onCancel={onCancel}
                    stage="pay"
                />
            ))}
        </div>
    );
}

export default ToPay;