import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const submit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
  };

  return (
    <section className="section container-page">
      <div className="rounded-3xl bg-brand-50 px-6 py-12 ring-1 ring-brand-100 sm:px-12">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-bold text-brand-900 sm:text-3xl">
            Get recipes and harvest alerts
          </h2>
          <p className="mt-3 text-sm text-earth-600">
            One email a week. Seasonal varieties, storage tips and
            subscriber-only offers.
          </p>
          <form
            onSubmit={submit}
            className="mt-6 flex flex-col gap-3 sm:flex-row"
            noValidate
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setStatus("idle");
              }}
              placeholder="you@example.com"
              className="input flex-1"
              aria-invalid={status === "error"}
              aria-describedby="newsletter-status"
              required
            />
            <button type="submit" className="btn-primary">
              Subscribe
            </button>
          </form>
          <p id="newsletter-status" role="status" className="mt-3 text-sm">
            {status === "success" && (
              <span className="text-brand-700">
                Thanks! Check your inbox to confirm.
              </span>
            )}
            {status === "error" && (
              <span className="text-red-600">
                Please enter a valid email address.
              </span>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
