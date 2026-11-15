import { Link } from "react-router-dom";
import { categories } from "../../services/mockData";

export default function CategoryStrip() {
  return (
    <section className="section container-page">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="eyebrow">Explore</span>
          <h2 className="mt-2 text-3xl font-bold text-brand-900">
            Shop by variety
          </h2>
        </div>
        <Link
          to="/varieties"
          className="text-sm font-semibold text-brand-700 hover:underline"
        >
          View all varieties →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {categories.map((c) => (
          <Link
            key={c.id}
            to={`/products?category=${c.id}`}
            className="group overflow-hidden rounded-2xl bg-white ring-1 ring-earth-100 transition hover:ring-brand-300"
          >
            <img
              src={c.image}
              alt={c.name}
              width="300"
              height="220"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="p-3">
              <h3 className="text-sm font-semibold text-earth-900 group-hover:text-brand-700">
                {c.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
