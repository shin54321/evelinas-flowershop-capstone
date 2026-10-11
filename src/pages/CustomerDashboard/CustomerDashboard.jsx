import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./CustomerDashboard.css";

const readStorage = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
    catch { return fallback; }
};

function CustomerDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => readStorage("evelina-current-user", null));
    const [orders, setOrders] = useState(() => readStorage("evelina-orders", []));
    const [favorites, setFavorites] = useState(() => readStorage("evelina-favorites", []));
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(user?.name || "");
    const [phone, setPhone] = useState(user?.phone || "");
    const [address, setAddress] = useState(user?.address || "");

    useEffect(() => {
        const refresh = () => {
            setUser(readStorage("evelina-current-user", null));
            setOrders(readStorage("evelina-orders", []));
            setFavorites(readStorage("evelina-favorites", []));
        };
        window.addEventListener("storage", refresh);
        window.addEventListener("ordersUpdated", refresh);
        return () => {
            window.removeEventListener("storage", refresh);
            window.removeEventListener("ordersUpdated", refresh);
        };
    }, []);

    useEffect(() => {
        if (!user) navigate("/login");
    }, [user, navigate]);

    const customerOrders = useMemo(() => {
        if (!user?.email) return [];
        return orders.filter(order => {
            const email = order.customer?.email || order.email || "";
            return !email || email.toLowerCase() === user.email.toLowerCase();
        });
    }, [orders, user]);

    const completed = customerOrders.filter(o => ["completed", "delivered", "received"].includes(String(o.status || "").toLowerCase())).length;
    const totalSpent = customerOrders.filter(o => !["cancelled", "canceled"].includes(String(o.status || "").toLowerCase())).reduce((sum, o) => sum + Number(o.total || 0), 0);
    const reviews = readStorage("evelina-reviews", []);

    const saveProfile = () => {
        const updated = { ...user, name: name.trim() || user?.name, phone: phone.trim(), address: address.trim() };
        localStorage.setItem("evelina-current-user", JSON.stringify(updated));
        const users = readStorage("evelina-users", []);
        localStorage.setItem("evelina-users", JSON.stringify(users.map(item =>
            item.email?.toLowerCase() === user?.email?.toLowerCase() ? { ...item, name: updated.name, phone: updated.phone, address: updated.address } : item
        )));
        setUser(updated);
        setEditing(false);
        toast.success("Profile updated.");
    };

    if (!user) return null;

    return (
        <main className="customer-dashboard">
            <section className="customer-profile-hero">
                <div className="customer-profile-avatar">{(user.name || user.email || "C").charAt(0).toUpperCase()}</div>
                <h1>{user.name || "Customer"}</h1>
                <p>{user.email}</p>
            </section>

            <div className="customer-dashboard-content">
                <section className="customer-stat-grid">
                    <article className="customer-stat-card stat-orders"><i className="bi bi-bag-check"></i><strong>{customerOrders.length}</strong><span>Total Orders</span></article>
                    <article className="customer-stat-card stat-completed"><i className="bi bi-check-lg"></i><strong>{completed}</strong><span>Completed</span></article>
                    <article className="customer-stat-card stat-favorites"><i className="bi bi-heart"></i><strong>{favorites.length}</strong><span>Favorites</span></article>
                    <article className="customer-stat-card stat-reviews"><i className="bi bi-star"></i><strong>{Array.isArray(reviews) ? reviews.length : 0}</strong><span>Reviews</span></article>
                </section>

                <div className="customer-dashboard-columns">
                    <section className="customer-info-card">
                        <header><h2><i className="bi bi-person me-2"></i>Personal Information</h2><button className="customer-edit-btn" onClick={() => setEditing(!editing)}><i className="bi bi-pencil me-1"></i>{editing ? "Cancel" : "Edit"}</button></header>
                        {editing ? (
                            <div className="customer-profile-form">
                                <label>Full Name<input value={name} onChange={e => setName(e.target.value)} /></label>
                                <label>Phone<input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Enter phone number" /></label>
                                <label>Default Address<textarea value={address} onChange={e => setAddress(e.target.value)} placeholder="Enter your address" rows="2" /></label>
                                <button className="customer-save-btn" onClick={saveProfile}>Save Changes</button>
                            </div>
                        ) : (
                            <div className="customer-info-list">
                                <p><span className="customer-info-icon"><i className="bi bi-person"></i></span><span><small>Full Name</small><strong>{user.name || "Not set"}</strong></span></p>
                                <p><span className="customer-info-icon"><i className="bi bi-envelope"></i></span><span><small>Email</small><strong>{user.email}</strong></span></p>
                                <p><span className="customer-info-icon"><i className="bi bi-telephone"></i></span><span><small>Phone</small><strong>{user.phone || "Not set"}</strong></span></p>
                                <p><span className="customer-info-icon"><i className="bi bi-geo-alt"></i></span><span><small>Default Address</small><strong>{user.address || "Not set"}</strong></span></p>
                            </div>
                        )}
                    </section>

                    <aside className="customer-quick-links">
                        <Link to="/order-history"><span><i className="bi bi-bag-check"></i></span><span><strong>My Orders</strong><small>{customerOrders.length} total orders</small></span></Link>
                        <Link to="/favorites"><span><i className="bi bi-heart"></i></span><span><strong>My Favorites</strong><small>{favorites.length} saved bouquets</small></span></Link>
                        <Link to="/track-order"><span><i className="bi bi-geo-alt"></i></span><span><strong>Track Order</strong><small>Check delivery status</small></span></Link>
                        <Link to="/catalog"><span><i className="bi bi-camera"></i></span><span><strong>Browse Catalog</strong><small>Find your next bouquet</small></span></Link>
                    </aside>
                </div>

                <section className="customer-spending-card">
                    <span>Total Spent at Evelina's Flowershop</span>
                    <strong>₱{totalSpent.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                    <i className="bi bi-flower1"></i>
                </section>
            </div>
        </main>
    );
}

export default CustomerDashboard;
