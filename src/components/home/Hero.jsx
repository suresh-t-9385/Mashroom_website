import { Link } from "react-router-dom";
import { Leaf, Truck, ShieldCheck } from "lucide-react";
import { img } from "../../utils/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream-100">
      <div className="container-page grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
        <div className="animate-fade-up">
          <span className="eyebrow">
            Certified Organic · Farm to Fork in 24 Hours
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-brand-900 sm:text-5xl lg:text-6xl">
            Gourmet mushrooms,
            <br />
            grown the way nature intended.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-earth-700 sm:text-lg">
            Hand-harvested oyster, shiitake and lion's mane from our
            climate-controlled indoor farm. Zero pesticides, cold-chain packed,
            delivered to your door.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/products" className="btn-primary px-7 py-3.5">
              Shop Fresh Mushrooms
            </Link>
            <Link to="/farming-process" className="btn-secondary px-7 py-3.5">
              See How We Grow
            </Link>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { Icon: Leaf, label: "100% Organic" },
              { Icon: Truck, label: "24h Delivery" },
              { Icon: ShieldCheck, label: "FSSAI Certified" },
            ].map(({ Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-sm font-medium text-earth-700"
              >
                <Icon className="h-5 w-5 text-brand-600" aria-hidden="true" />{" "}
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <img
            src={img("hero-mushrooms", 900, 800)}
            alt="Freshly harvested oyster mushrooms on a wooden surface"
            width="900"
            height="800"
            fetchpriority="high"
            decoding="async"
            className="aspect-[9/8] w-full rounded-3xl object-cover shadow-xl"
          />
          <div className="absolute -bottom-5 left-5 rounded-2xl bg-white p-4 shadow-lg ring-1 ring-earth-100">
            <p className="text-2xl font-bold text-brand-800">4.9★</p>
            <p className="text-xs text-earth-600">
              from 1,200+ happy customers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
