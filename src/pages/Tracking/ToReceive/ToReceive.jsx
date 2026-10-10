import OrderCard from "../OrderCard";
import "../OrderCard.css";

function ToReceive({ orders }) {
    if (orders.length === 0) {
        return (
            <div className="tracking-empty">
                <i className="bi bi-truck"></i>
                <h3>No orders to receive</h3>
                <p>Orders out for delivery will appear here.</p>
            </div>
        );
    }

    return (
        <div className="tracking-order-list">
            {orders.map((order) => (
                <OrderCard
                    key={order.orderId}
                    order={order}
                    stage="receive"
                />
            ))}
        </div>
    );
}

export default ToReceive;
