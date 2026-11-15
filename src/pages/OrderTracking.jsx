import { useState } from "react";
import { PackageSearch } from "lucide-react";
import SEO from "../components/seo/SEO";
import { trackOrder } from "../services/orderService";
import { formatDate, formatCurrency } from "../utils/format";

export default function OrderTracking() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setOrder(null);
    setLoading(true);
    try {
      setOrder(await trackOrder(orderId, email));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Order Tracking"
        description="Track your FungiFresh mushroom delivery in real time."
        path="/order-tracking"
        noIndex
      />
      <div className="container-page section max-w-2xl">
        <span className="eyebrow">Support</span>
        <h1 className="mt-2 text-3xl font-bold text-brand-900">
          Track your order
        </h1>
        <p className="mt-2 text-earth-600">
          Enter your order ID (e.g. FF12345678) to see live status.
        </p>

        <form
          onSubmit={submit}
          className="card mt-8 grid gap-4 p-6 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
        >
          <div>
            <label htmlFor="order-id" className="label">
              Order ID
            </label>
            <input
              id="order-id"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="input"
              required
            />
          </div>
          <div>
            <label htmlFor="order-email" className="label">
              Email (optional)
            </label>
            <input
              id="order-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Searching…" : "Track"}
          </button>
        </form>

        {error && (
          <p
            role="alert"
            className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        {order && (
          <div className="card mt-8 p-6">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-earth-100 pb-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-earth-500">
                  Order
                </p>
                <p className="font-semibold text-earth-900">{order.id}</p>
                <p className="text-xs text-earth-500">
                  Placed {formatDate(order.createdAt)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-wide text-earth-500">
                  Total
                </p>
                <p className="font-semibold text-brand-800">
                  {formatCurrency(order.total)}
                </p>
              </div>
            </div>

            <ol className="mt-6 space-y-4">
              {order.timeline.map((step) => (
                <li key={step.status} className="flex gap-3">
                  <span
                    className={`mt-1 h-3 w-3 shrink-0 rounded-full ${step.at ? "bg-brand-600" : "bg-earth-200"}`}
                    aria-hidden="true"
                  />
                  <div>
                    <p
                      className={`text-sm font-semibold capitalize ${step.at ? "text-earth-900" : "text-earth-400"}`}
                    >
                      {step.status}
                    </p>
                    <p className="text-xs text-earth-500">
                      {step.note}
                      {step.at ? ` · ${formatDate(step.at)}` : ""}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}

        {!order && !error && (
          <div className="mt-8 flex items-center gap-3 rounded-xl bg-earth-50 p-4 text-sm text-earth-600">
            <PackageSearch
              className="h-5 w-5 text-earth-400"
              aria-hidden="true"
            />
            Orders placed on this browser are stored locally in demo mode.
          </div>
        )}
      </div>
    </>
  );
}
