import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./OrderHistory.css";

const readOrders = () => {
    try { return JSON.parse(localStorage.getItem("evelina-orders") || "[]"); }
    catch { return []; }
};
const money = value => `₱${Number(value || 0).toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const formatDate = value => {
    if (!value) return "Date unavailable";
    const date = /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(`${value}T12:00:00`) : new Date(value);
    return Number.isNaN(date.getTime()) ? "Date unavailable" : date.toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" });
};
const statusClass = status => String(status || "Pending").toLowerCase().replace(/\s+/g, "-");

function OrderHistory() {
    const navigate = useNavigate();
    const [user] = useState(() => {
        try { return JSON.parse(localStorage.getItem("evelina-current-user") || "null"); }
        catch { return null; }
    });
    const [orders, setOrders] = useState(readOrders);

    useEffect(() => {
        if (!user) navigate("/login");
    }, [user, navigate]);
    useEffect(() => {
        const refresh = () => setOrders(readOrders());
        window.addEventListener("storage", refresh);
        window.addEventListener("ordersUpdated", refresh);
        return () => { window.removeEventListener("storage", refresh); window.removeEventListener("ordersUpdated", refresh); };
    }, []);

    const customerOrders = useMemo(() => {
        if (!user?.email) return [];
        return orders.filter(order => {
            const email = order.customer?.email || order.email || "";
            return !email || email.toLowerCase() === user.email.toLowerCase();
        }).sort((a,b) => new Date(b.createdAt || b.orderDate || 0) - new Date(a.createdAt || a.orderDate || 0));
    }, [orders, user]);

    if (!user) return null;
    return (
        <main className="order-history-page">
            <header className="order-history-hero"><i className="bi bi-bag-heart"></i><h1>Order History</h1><p>All your orders from Evelina's Flowershop</p></header>
            <section className="order-history-list">
                {customerOrders.length ? customerOrders.map((order, index) => (
                    <article className="history-order-card" key={order.orderId || order.id || index}>
                        <header className="history-order-header"><div><small>Order ID</small><strong>{order.orderId || order.id || `Order ${index + 1}`}</strong></div><span className={`history-status status-${statusClass(order.status)}`}>{order.status || "Pending"}</span></header>
                        <div className="history-order-body">
                            {order.items?.length ? <div className="history-item-names">{order.items.map((item, i) => <span key={item.id || i}>{item.name || item.title || "Bouquet"}{item.quantity > 1 ? ` × ${item.quantity}` : ""}</span>)}</div> : <p className="history-demo-label">Order details</p>}
                            <div className="history-order-footer"><span>{formatDate(order.createdAt || order.orderDate)}</span><span>{order.paymentMethod || "Payment method not recorded"}</span><strong>{money(order.total)}</strong></div>
                            <div className="history-order-actions"><Link to="/track-order" className="history-track-btn">Track <i className="bi bi-arrow-right"></i></Link></div>
                        </div>
                    </article>
                )) : (
                    <div className="history-empty"><i className="bi bi-bag"></i><h2>No orders yet</h2><p>Your bouquet orders will appear here after checkout.</p><Link to="/catalog">Browse Catalog</Link></div>
                )}
            </section>
        </main>
    );
}
export default OrderHistory;
