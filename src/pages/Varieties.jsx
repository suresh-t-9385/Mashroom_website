import { Link } from "react-router-dom";
import SEO from "../components/seo/SEO";
import { categories } from "../services/mockData";

export default function Varieties() {
  return (
    <>
      <SEO
        title="Mushroom Varieties Guide"
        description="Compare oyster, shiitake, button, milky and lion's mane mushrooms — flavour, texture, cooking methods and nutrition."
        path="/varieties"
      />
      <div className="container-page section">
        <header className="max-w-2xl">
          <span className="eyebrow">Varieties</span>
          <h1 className="mt-2 text-3xl font-bold text-brand-900 sm:text-4xl">
            Know your mushrooms
          </h1>
          <p className="mt-3 text-earth-600">
            Each variety has a distinct flavour profile and best-use case.
            Here's how to choose.
          </p>
        </header>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <article key={c.id} className="card overflow-hidden">
              <img
                src={c.image}
                alt={`${c.name} close-up`}
                width="400"
                height="260"
                loading="lazy"
                className="aspect-[3/2] w-full object-cover"
              />
              <div className="p-6">
                <h2 className="text-lg font-semibold text-earth-900">
                  {c.name}
                </h2>
                <p className="mt-2 text-sm text-earth-600">{c.blurb}</p>
                <Link
                  to={`/products?category=${c.id}`}
                  className="mt-4 inline-block text-sm font-semibold text-brand-700 hover:underline"
                >
                  Shop {c.name.toLowerCase()} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
