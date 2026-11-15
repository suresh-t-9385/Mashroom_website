import api from "./api";

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";
const delay = (ms = 500) => new Promise((r) => setTimeout(r, ms));
const ORDERS_KEY = "ff_orders";

const readOrders = () => JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
const writeOrders = (o) => localStorage.setItem(ORDERS_KEY, JSON.stringify(o));

export async function createOrder(payload) {
  if (!USE_MOCK) return (await api.post("/orders", payload)).data;
  await delay();
  const order = {
    ...payload,
    id: `FF${Date.now().toString().slice(-8)}`,
    status: "confirmed",
    createdAt: new Date().toISOString(),
    timeline: [
      {
        status: "confirmed",
        at: new Date().toISOString(),
        note: "Order received",
      },
      { status: "packed", at: null, note: "Packed at cold storage" },
      { status: "shipped", at: null, note: "Out for delivery" },
      { status: "delivered", at: null, note: "Delivered to customer" },
    ],
  };
  writeOrders([order, ...readOrders()]);
  return order;
}

export async function trackOrder(orderId, email) {
  if (!USE_MOCK)
    return (await api.get(`/orders/track`, { params: { orderId, email } }))
      .data;
  await delay(350);
  const order = readOrders().find(
    (o) => o.id.toLowerCase() === String(orderId).trim().toLowerCase(),
  );
  if (!order)
    throw new Error("No order found with that ID. Please check and try again.");
  if (
    email &&
    order.customer?.email &&
    order.customer.email.toLowerCase() !== email.toLowerCase()
  )
    throw new Error("Email does not match this order.");
  return order;
}

export async function getOrders() {
  if (!USE_MOCK) return (await api.get("/admin/orders")).data;
  await delay(250);
  return readOrders();
}

export async function updateOrderStatus(orderId, status) {
  if (!USE_MOCK)
    return (await api.patch(`/admin/orders/${orderId}`, { status })).data;
  await delay(200);
  const orders = readOrders().map((o) =>
    o.id === orderId
      ? {
          ...o,
          status,
          timeline: o.timeline.map((t) =>
            t.status === status ? { ...t, at: new Date().toISOString() } : t,
          ),
        }
      : o,
  );
  writeOrders(orders);
  return orders.find((o) => o.id === orderId);
}
