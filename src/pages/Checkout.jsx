import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SEO from "../components/seo/SEO";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/orderService";
import { formatCurrency } from "../utils/format";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  payment: "cod",
};

export default function Checkout() {
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  if (items.length === 0 && !submitting) {
    return (
      <div className="container-page section text-center">
        <SEO title="Checkout" path="/checkout" noIndex />
        <h1 className="text-2xl font-bold text-brand-900">
          Your cart is empty
        </h1>
        <Link to="/products" className="btn-primary mt-6">
          Browse products
        </Link>
      </div>
    );
  }

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address.";
    if (!/^[0-9]{10}$/.test(form.phone.replace(/\D/g, "")))
      e.phone = "Enter a 10-digit phone number.";
    if (form.address.trim().length < 8)
      e.address = "Please enter your delivery address.";
    if (!form.city.trim()) e.city = "City is required.";
    if (!form.state.trim()) e.state = "State is required.";
    if (!/^[0-9]{6}$/.test(form.pincode))
      e.pincode = "Enter a 6-digit PIN code.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    setServerError(null);
    if (!validate()) return;
    setSubmitting(true);
    try {
      const order = await createOrder({
        customer: { name: form.name, email: form.email, phone: form.phone },
        shipping: {
          address: form.address,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
        },
        payment: form.payment,
        items,
        subtotal,
        shippingFee: shipping,
        total,
      });
      clearCart();
      navigate(`/order-confirmation/${order.id}`, { replace: true });
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const field = (name, label, type = "text", autoComplete) => (
    <div>
      <label htmlFor={name} className="label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        value={form[name]}
        onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
        className="input"
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
      />
      {errors[name] && (
        <p id={`${name}-error`} className="mt-1 text-xs text-red-600">
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <>
      <SEO
        title="Checkout"
        description="Secure checkout for your mushroom order."
        path="/checkout"
        noIndex
      />
      <div className="container-page section">
        <h1 className="text-3xl font-bold text-brand-900">Checkout</h1>

        <form
          onSubmit={submit}
          noValidate
          className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]"
        >
          <div className="space-y-6">
            <fieldset className="card p-6">
              <legend className="px-1 text-lg font-semibold text-earth-900">
                Contact details
              </legend>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {field("name", "Full name", "text", "name")}
                {field("email", "Email", "email", "email")}
                <div className="sm:col-span-2">
                  {field("phone", "Phone number", "tel", "tel")}
                </div>
              </div>
            </fieldset>

            <fieldset className="card p-6">
              <legend className="px-1 text-lg font-semibold text-earth-900">
                Delivery address
              </legend>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  {field("address", "Street address", "text", "street-address")}
                </div>
                {field("city", "City", "text", "address-level2")}
                {field("state", "State", "text", "address-level1")}
                {field("pincode", "PIN code", "text", "postal-code")}
              </div>
            </fieldset>

            <fieldset className="card p-6">
              <legend className="px-1 text-lg font-semibold text-earth-900">
                Payment method
              </legend>
              <div className="mt-4 space-y-3">
                {[
                  { value: "cod", label: "Cash on delivery" },
                  { value: "upi", label: "UPI (pay on confirmation link)" },
                  { value: "card", label: "Card (secure gateway)" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-earth-200 px-4 py-3 has-[:checked]:border-brand-500 has-[:checked]:bg-brand-50"
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={opt.value}
                      checked={form.payment === opt.value}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, payment: e.target.value }))
                      }
                      className="h-4 w-4 text-brand-700"
                    />
                    <span className="text-sm font-medium text-earth-800">
                      {opt.label}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <aside className="card h-fit p-6">
            <h2 className="text-lg font-semibold text-earth-900">
              Order summary
            </h2>
            <ul className="mt-4 space-y-3 border-b border-earth-100 pb-4">
              {items.map((i) => (
                <li key={i.id} className="flex justify-between gap-3 text-sm">
                  <span className="text-earth-700">
                    {i.name} × {i.qty}
                  </span>
                  <span className="font-medium">
                    {formatCurrency(i.price * i.qty)}
                  </span>
                </li>
              ))}
            </ul>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-earth-600">Subtotal</dt>
                <dd>{formatCurrency(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-earth-600">Shipping</dt>
                <dd>{shipping === 0 ? "Free" : formatCurrency(shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-earth-100 pt-3 text-base">
                <dt className="font-semibold">Total</dt>
                <dd className="font-bold text-brand-800">
                  {formatCurrency(total)}
                </dd>
              </div>
            </dl>
            {serverError && (
              <p
                role="alert"
                className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
              >
                {serverError}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary mt-6 w-full"
            >
              {submitting
                ? "Placing order…"
                : `Place order · ${formatCurrency(total)}`}
            </button>
          </aside>
        </form>
      </div>
    </>
  );
}
