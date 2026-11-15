import { useEffect, useState } from "react";
import DataTable from "../components/common/DataTable";
import { getOrders, updateOrderStatus } from "../services/orderService";
import { formatCurrency, formatDate } from "../utils/format";

const STATUSES = ["confirmed", "packed", "shipped", "delivered", "cancelled"];

export default function OrdersAdmin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .finally(() => setLoading(false));
  }, []);

  const changeStatus = async (id, status) => {
    await updateOrderStatus(id, status);
    setOrders(await getOrders());
  };

  const columns = [
    {
      key: "id",
      header: "Order ID",
      render: (r) => <span className="font-medium text-earth-900">{r.id}</span>,
    },
    {
      key: "customer",
      header: "Customer",
      render: (r) => (
        <div>
          <p>{r.customer?.name}</p>
          <p className="text-xs text-earth-500">{r.customer?.email}</p>
        </div>
      ),
    },
    {
      key: "createdAt",
      header: "Date",
      render: (r) => formatDate(r.createdAt),
    },
    { key: "total", header: "Total", render: (r) => formatCurrency(r.total) },
    {
      key: "status",
      header: "Status",
      render: (r) => (
        <select
          value={r.status}
          onChange={(e) => changeStatus(r.id, e.target.value)}
          className="rounded-lg border border-earth-200 bg-white px-2 py-1 text-xs capitalize"
          aria-label={`Status for order ${r.id}`}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-900">Orders</h1>
      <p className="mt-1 text-sm text-earth-600">
        {orders.length} orders received.
      </p>
      <div className="mt-6">
        {loading ? (
          <p className="text-sm text-earth-500">Loading orders…</p>
        ) : (
          <DataTable
            columns={columns}
            rows={orders}
            emptyMessage="No orders yet. Place a test order from the storefront."
          />
        )}
      </div>
    </div>
  );
}
