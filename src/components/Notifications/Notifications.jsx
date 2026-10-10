
import "./Notifications.css";

function Notifications({ notifications, setNotifications }) {
    // Count unread notifications in the dropdown
    const unreadCount = notifications.filter(
        (notification) => notification.unread
    ).length;

    // Mark every notification as read
    const markAllAsRead = () => {
        setNotifications((previous) =>
            previous.map((item) => ({
                ...item,
                unread: false,
            }))
        );
    };

    // Mark one notification as read
    const markAsRead = (id) => {
        setNotifications((previous) =>
            previous.map((item) =>
                item.id === id
                    ? { ...item, unread: false }
                    : item
            )
        );
    };

    // Remove one notification
    const dismissNotification = (id) => {
        setNotifications((previous) =>
            previous.filter((item) => item.id !== id)
        );
    };

    return (
        <section
            className="notification-dropdown"
            aria-label="Notifications"
        >
            {/* HEADER */}
            <div className="notification-header">
                <div className="notification-heading">
                    <i className="bi bi-bell"></i>
                    <h5>Notifications</h5>
                    <span>{unreadCount} new</span>
                </div>

                <button
                    type="button"
                    className="notification-mark-read"
                    onClick={markAllAsRead}
                    disabled={unreadCount === 0}
                >
                    <i className="bi bi-check2-all"></i> All read
                </button>
            </div>

            {/* NOTIFICATION LIST */}
            <div className="notification-list">
                {notifications.length === 0 ? (
                    <div className="notification-empty">
                        <i className="bi bi-bell-slash"></i>
                        <p>You're all caught up!</p>
                    </div>
                ) : (
                    notifications.map((item) => (
                        <article
                            key={item.id}
                            className={`notification-item ${
                                item.unread ? "unread" : ""
                            }`}
                            onClick={() => markAsRead(item.id)}
                        >
                            {/* ICON */}
                            <div
                                className={`notification-item-icon ${item.type}`}
                            >
                                <i className={`bi ${item.icon}`}></i>
                            </div>

                            {/* CONTENT */}
                            <div className="notification-item-content">
                                <h6>{item.title}</h6>
                                <p>{item.message}</p>
                                <small>{item.time}</small>
                            </div>

                            {/* ACTIONS */}
                            <div className="notification-item-actions">
                                {item.unread && (
                                    <span className="unread-dot"></span>
                                )}

                                <button
                                    type="button"
                                    aria-label={`Dismiss ${item.title}`}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        dismissNotification(item.id);
                                    }}
                                >
                                    <i className="bi bi-x"></i>
                                </button>
                            </div>
                        </article>
                    ))
                )}
            </div>
        </section>
    );
}

export default Notifications;
