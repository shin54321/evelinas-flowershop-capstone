import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import ToPay from "./ToPay/ToPay";
import ToShip from "./ToShip/ToShip";
import ToReceive from "./ToReceive/ToReceive";
import ToRate from "./ToRate/ToRate";

import { getOrderStage } from "./orderUtils";

import "./Tracking.css";

const ORDERS_KEY = "evelina-orders";

const tabs = [
    { id: "pay", label: "To Pay", icon: "bi-wallet2" },
    { id: "ship", label: "To Ship", icon: "bi-box-seam" },
    { id: "receive", label: "To Receive", icon: "bi-truck" },
    { id: "rate", label: "To Rate", icon: "bi-star" },
];

function getOrders() {
    try {
        const saved = JSON.parse(localStorage.getItem(ORDERS_KEY));
        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
}

function Tracking() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [orders, setOrders] = useState(getOrders);
    const [activeTab, setActiveTab] = useState("pay");

    const requestedOrderId = searchParams.get("orderId");

    useEffect(() => {
        const refreshOrders = () => setOrders(getOrders());

        window.addEventListener("ordersUpdated", refreshOrders);
        window.addEventListener("storage", refreshOrders);

        return () => {
            window.removeEventListener("ordersUpdated", refreshOrders);
            window.removeEventListener("storage", refreshOrders);
        };
    }, []);

    const selectedOrder = useMemo(
        () => orders.find((order) => order.orderId === requestedOrderId),
        [orders, requestedOrderId]
    );

    const displayedTab = selectedOrder
    ? getOrderStage(selectedOrder)
    : activeTab;

    const counts = useMemo(() => {
        const result = {};

        tabs.forEach((tab) => {
            result[tab.id] = orders.filter(
                (order) => getOrderStage(order) === tab.id
            ).length;
        });

        return result;
    }, [orders]);

    const visibleOrders = useMemo(() => {
        const sorted = [...orders].reverse();

        if (requestedOrderId) {
            return sorted.filter(
                (order) => order.orderId === requestedOrderId
            );
        }

        return sorted.filter(
            (order) => getOrderStage(order) === activeTab
        );
    }, [orders, activeTab, requestedOrderId]);

    const cancelOrder = (orderId) => {
        const confirmed = window.confirm(
            "Are you sure you want to cancel this order?"
        );

        if (!confirmed) return;

        const updatedOrders = orders.map((order) =>
            order.orderId === orderId
                ? { ...order, status: "Cancelled" }
                : order
        );

        localStorage.setItem(
            ORDERS_KEY,
            JSON.stringify(updatedOrders)
        );

        setOrders(updatedOrders);
        window.dispatchEvent(new Event("ordersUpdated"));

        toast.success("Order cancelled successfully.");

        if (requestedOrderId === orderId) {
            setSearchParams({});
        }
    };

    const renderTab = () => {
        const props = {
            orders: visibleOrders,
            onCancel: cancelOrder,
        };

        switch (displayedTab) {
            case "ship":
                return <ToShip {...props} />;
            case "receive":
                return <ToReceive {...props} />;
            case "rate":
                return <ToRate {...props} />;
            default:
                return <ToPay {...props} />;
        }
    };

    return (
        <main className="tracking-page">
            <header className="tracking-banner">
                <i className="bi bi-box-seam"></i>
                <h1>My Orders</h1>
                <p>Track all your orders from Evelina's Flowershop</p>
            </header>

            <div className="tracking-container">
                <nav className="tracking-tabs" aria-label="Order status tabs">
                    {tabs.map((tab) => (
                        <button
                            type="button"
                            key={tab.id}
                            className={`tracking-tab ${
                                displayedTab === tab.id ? "active" : ""
                            }`}
                            onClick={() => {
                                setActiveTab(tab.id);
                                setSearchParams({});
                            }}
                        >
                            <span className="tracking-tab-icon">
                                <i className={`bi ${tab.icon}`}></i>

                                {counts[tab.id] > 0 && (
                                    <span className="tracking-tab-count">
                                        {counts[tab.id]}
                                    </span>
                                )}
                            </span>

                            <span>{tab.label}</span>
                        </button>
                    ))}
                </nav>

                {requestedOrderId && (
                    <div className="tracking-focus">
                        {selectedOrder ? (
                            <>
                                <span>
                                    Order: <strong>{requestedOrderId}</strong>
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setSearchParams({})}
                                >
                                    View all orders
                                </button>
                            </>
                        ) : (
                            <span>
                                Order not found in your saved orders.
                            </span>
                        )}
                    </div>
                )}

                <section className="tracking-results">
                    <div className="tracking-section-heading">
                        <h2>
                            {tabs.find((tab) => tab.id === displayedTab)?.label}
                        </h2>
                        <span>{visibleOrders.length} orders</span>
                    </div>

                    {renderTab()}
                </section>
            </div>
        </main>
    );
}

export default Tracking;