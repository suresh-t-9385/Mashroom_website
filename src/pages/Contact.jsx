// src/pages/Contact.jsx
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import SEO from "../components/seo/SEO";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    setError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return setError("Enter a valid email address.");
    if (form.message.trim().length < 10)
      return setError("Please write at least 10 characters.");
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with FungiFresh Organics for orders, bulk supply and farm visits."
        path="/contact"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "FungiFresh Organics",
          telephone: "+91-98765-43210",
          email: "hello@fungifresh.example.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Plot 24, Green Valley Agro Park",
            addressLocality: "Bengaluru",
            postalCode: "562125",
            addressCountry: "IN",
          },
        }}
      />
      <div className="container-page section grid gap-10 lg:grid-cols-2">
        <div>
          <span className="eyebrow">Contact</span>
          <h1 className="mt-2 text-3xl font-bold text-brand-900 sm:text-4xl">
            Talk to the farm team
          </h1>
          <p className="mt-3 text-earth-600">
            Bulk orders, restaurant supply, farm visits — we reply within one
            business day.
          </p>
          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <Phone
                className="mt-0.5 h-5 w-5 text-brand-600"
                aria-hidden="true"
              />
              <span>
                +91 98765 43210
                <br />
                <span className="text-earth-500">Mon–Sat, 8am–7pm IST</span>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Mail
                className="mt-0.5 h-5 w-5 text-brand-600"
                aria-hidden="true"
              />
              <span>hello@fungifresh.example.com</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin
                className="mt-0.5 h-5 w-5 text-brand-600"
                aria-hidden="true"
              />
              <span>
                Plot 24, Green Valley Agro Park
                <br />
                Bengaluru 562125, Karnataka
              </span>
            </li>
          </ul>
        </div>

        <form onSubmit={submit} className="card space-y-4 p-6" noValidate>
          <div>
            <label htmlFor="c-name" className="label">
              Name
            </label>
            <input
              id="c-name"
              className="input"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div>
            <label htmlFor="c-email" className="label">
              Email
            </label>
            <input
              id="c-email"
              type="email"
              className="input"
              required
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
            />
          </div>
          <div>
            <label htmlFor="c-message" className="label">
              Message
            </label>
            <textarea
              id="c-message"
              rows="5"
              className="input"
              required
              value={form.message}
              onChange={(e) =>
                setForm((f) => ({ ...f, message: e.target.value }))
              }
            />
          </div>
          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}
          {sent && (
            <p
              role="status"
              className="rounded-lg bg-brand-50 p-3 text-sm text-brand-800"
            >
              Thanks — your message has been received.
            </p>
          )}
          <button type="submit" className="btn-primary w-full">
            Send message
          </button>
        </form>
      </div>
    </>
  );
}
