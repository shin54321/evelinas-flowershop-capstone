export function getOrderStage(order) {
    const status = String(order.status || "Pending").toLowerCase();

    if (status === "cancelled" || status === "canceled") {
        return "cancelled";
    }

    if (status === "delivered" || status === "completed") {
        return order.reviewed ? "completed" : "rate";
    }

    if (
        status === "out for delivery" ||
        status === "to receive"
    ) {
        return "receive";
    }

    if (
        status === "shipping" ||
        status === "shipped" ||
        status === "preparation" ||
        status === "processing" ||
        status === "ready" ||
        status === "to ship"
    ) {
        return "ship";
    }

    return "pay";
}