import { useEffect, useState } from "react";
import { Package, ShoppingBag, IndianRupee, AlertTriangle } from "lucide-react";
import { products } from "../services/mockData";
import { getOrders } from "../services/orderService";
import { formatCurrency, formatDate } from "../utils/format";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then(setOrders);
  }, []);

  const revenue = orders.reduce((s, o) => s + (o.total || 0), 0);
  const lowStock = products.filter((p) => p.stock > 0 && p.stock < 50);

  const stats = [
    {
      label: "Total products",
      value: products.length,
      Icon: Package,
      tone: "text-brand-700 bg-brand-50",
    },
    {
      label: "Orders",
      value: orders.length,
      Icon: ShoppingBag,
      tone: "text-blue-700 bg-blue-50",
    },
    {
      label: "Revenue",
      value: formatCurrency(revenue),
      Icon: IndianRupee,
      tone: "text-emerald-700 bg-emerald-50",
    },
    {
      label: "Low stock items",
      value: lowStock.length,
      Icon: AlertTriangle,
      tone: "text-amber-700 bg-amber-50",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-900">Dashboard</h1>
      <p className="mt-1 text-sm text-earth-600">
        Store performance at a glance.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, Icon, tone }) => (
          <div
            key={label}
            className="rounded-2xl bg-white p-5 ring-1 ring-earth-100"
          >
            <span
              className={`inline-grid h-9 w-9 place-items-center rounded-lg ${tone}`}
            >
              <Icon className="h-4 w-4" />
            </span>
            <p className="mt-3 text-2xl font-bold text-earth-900">{value}</p>
            <p className="text-xs text-earth-500">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl bg-white p-5 ring-1 ring-earth-100">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-earth-600">
            Recent orders
          </h2>
          <ul className="mt-4 divide-y divide-earth-100">
            {orders.slice(0, 5).map((o) => (
              <li
                key={o.id}
                className="flex items-center justify-between py-3 text-sm"
              >
                <div>
                  <p className="font-medium text-earth-900">{o.id}</p>
                  <p className="text-xs text-earth-500">
                    {o.customer?.name} · {formatDate(o.createdAt)}
                  </p>
                </div>
                <span className="font-semibold text-brand-800">
                  {formatCurrency(o.total)}
                </span>
              </li>
            ))}
            {orders.length === 0 && (
              <li className="py-6 text-sm text-earth-500">No orders yet.</li>
            )}
          </ul>
        </section>

        <section className="rounded-2xl bg-white p-5 ring-1 ring-earth-100">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-earth-600">
            Low stock alert
          </h2>
          <ul className="mt-4 divide-y divide-earth-100">
            {lowStock.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between py-3 text-sm"
              >
                <span className="text-earth-900">{p.name}</span>
                <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">
                  {p.stock} left
                </span>
              </li>
            ))}
            {lowStock.length === 0 && (
              <li className="py-6 text-sm text-earth-500">
                All products are well stocked.
              </li>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}
