import { Link } from "react-router-dom";
import {
  Mail,
  MapPin,
  Phone,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";

const columns = [
  {
    title: "Shop",
    links: [
      { to: "/products", label: "All Products" },
      { to: "/varieties", label: "Mushroom Varieties" },
      { to: "/products?category=oyster", label: "Oyster" },
      { to: "/products?category=dried", label: "Dried & Powders" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About Us" },
      { to: "/farming-process", label: "Farming Process" },
      { to: "/gallery", label: "Gallery" },
      { to: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Support",
    links: [
      { to: "/contact", label: "Contact Us" },
      { to: "/order-tracking", label: "Order Tracking" },
      { to: "/privacy-policy", label: "Privacy Policy" },
      { to: "/terms", label: "Terms & Conditions" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-earth-100 bg-earth-900 text-earth-100">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-600 text-lg">
              🍄
            </span>
            <span className="font-display text-lg font-bold text-white">
              FungiFresh Organics
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-earth-300">
            Certified organic gourmet mushrooms, grown indoors with zero
            synthetic pesticides and delivered within 24 hours of harvest.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-earth-300">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />{" "}
              Plot 24, Green Valley Agro Park, Bengaluru 562125
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" aria-hidden="true" />{" "}
              <a href="tel:+919876543210" className="hover:text-white">
                +91 98765 43210
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" aria-hidden="true" />{" "}
              <a
                href="mailto:hello@fungifresh.example.com"
                className="hover:text-white"
              >
                hello@fungifresh.example.com
              </a>
            </li>
          </ul>
          <div className="mt-6 flex gap-3">
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="rounded-full bg-earth-800 p-2 hover:bg-brand-700"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              className="rounded-full bg-earth-800 p-2 hover:bg-brand-700"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://youtube.com"
              aria-label="YouTube"
              className="rounded-full bg-earth-800 p-2 hover:bg-brand-700"
            >
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
              {col.title}
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l.to + l.label}>
                  <Link
                    to={l.to}
                    className="text-earth-300 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-earth-800">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-earth-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()} FungiFresh Organics. All rights
            reserved.
          </p>
          <p>FSSAI Lic. 12345678901234 · India Organic Certified</p>
        </div>
      </div>
    </footer>
  );
}
