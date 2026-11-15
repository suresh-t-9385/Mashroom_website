import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import SEO from "../components/seo/SEO";
import EmptyState from "../components/common/EmptyState";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/format";

export default function Cart() {
  const { items, subtotal, shipping, total, setQty, removeItem } = useCart();

  return (
    <>
      <SEO
        title="Shopping Cart"
        description="Review your mushroom order before checkout."
        path="/cart"
        noIndex
      />
      <div className="container-page section">
        <h1 className="text-3xl font-bold text-brand-900">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="mt-8">
            <EmptyState
              icon={ShoppingBag}
              title="Your cart is empty"
              message="Add some farm-fresh mushrooms to get started."
              action={
                <Link to="/products" className="btn-primary">
                  Browse products
                </Link>
              }
            />
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="card flex gap-4 p-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    width="112"
                    height="112"
                    loading="lazy"
                    className="h-24 w-24 shrink-0 rounded-xl object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-3">
                      <div>
                        <h2 className="font-semibold text-earth-900">
                          <Link
                            to={`/products/${item.slug}`}
                            className="hover:text-brand-700"
                          >
                            {item.name}
                          </Link>
                        </h2>
                        <p className="text-xs text-earth-500">{item.unit}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="self-start rounded-lg p-1.5 text-earth-400 hover:bg-red-50 hover:text-red-600"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center rounded-full border border-earth-200">
                        <button
                          onClick={() => setQty(item.id, item.qty - 1)}
                          className="p-2"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => setQty(item.id, item.qty + 1)}
                          className="p-2"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="font-bold text-brand-800">
                        {formatCurrency(item.price * item.qty)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="card h-fit p-6">
              <h2 className="text-lg font-semibold text-earth-900">
                Order summary
              </h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-earth-600">Subtotal</dt>
                  <dd className="font-medium">{formatCurrency(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-earth-600">Shipping</dt>
                  <dd className="font-medium">
                    {shipping === 0 ? "Free" : formatCurrency(shipping)}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-earth-100 pt-3 text-base">
                  <dt className="font-semibold">Total</dt>
                  <dd className="font-bold text-brand-800">
                    {formatCurrency(total)}
                  </dd>
                </div>
              </dl>
              <Link to="/checkout" className="btn-primary mt-6 w-full">
                Proceed to checkout
              </Link>
              <Link to="/products" className="btn-ghost mt-2 w-full">
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}
