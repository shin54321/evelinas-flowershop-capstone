import OrderCard from "../OrderCard";
import "../OrderCard.css";

function ToShip({ orders }) {
    if (orders.length === 0) {
        return (
            <div className="tracking-empty">
                <i className="bi bi-box-seam"></i>
                <h3>No orders to ship</h3>
                <p>Orders being prepared will appear here.</p>
            </div>
        );
    }

    return (
        <div className="tracking-order-list">
            {orders.map((order) => (
                <OrderCard
                    key={order.orderId}
                    order={order}
                    stage="ship"
                />
            ))}
        </div>
    );
}

export default ToShip;