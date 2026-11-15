import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  Zap,
  Star,
  Package,
  ShieldCheck,
} from "lucide-react";
import SEO from "../components/seo/SEO";
import ProductGallery from "../components/product/ProductGallery";
import Spinner from "../components/common/Spinner";
import ProductGrid from "../components/product/ProductGrid";
import { getProductBySlug, getProducts } from "../services/productService";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/format";

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setQty(1);
    getProductBySlug(slug)
      .then((p) => {
        setProduct(p);
        return getProducts({ category: p.category, limit: 4 });
      })
      .then((res) =>
        setRelated(res.items.filter((r) => r.slug !== slug).slice(0, 3)),
      )
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Spinner fullPage label="Loading product…" />;
  if (error) {
    return (
      <div className="container-page section text-center">
        <h1 className="text-2xl font-bold text-brand-900">{error}</h1>
        <Link to="/products" className="btn-primary mt-6">
          Back to products
        </Link>
      </div>
    );
  }

  const price = product.offerPrice ?? product.price;
  const inStock = product.stock > 0;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.gallery,
    description: product.description,
    sku: product.id,
    brand: { "@type": "Brand", name: "FungiFresh Organics" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews,
    },
    offers: {
      "@type": "Offer",
      price: price,
      priceCurrency: "INR",
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Products", item: "/products" },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `/products/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <SEO
        title={product.name}
        description={product.shortDescription}
        path={`/products/${product.slug}`}
        image={product.image}
        type="product"
        jsonLd={[productJsonLd, breadcrumbJsonLd]}
      />

      <div className="container-page pt-6">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1 text-xs text-earth-500"
        >
          <Link to="/" className="hover:text-brand-700">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" aria-hidden="true" />
          <Link to="/products" className="hover:text-brand-700">
            Products
          </Link>
          <ChevronRight className="h-3 w-3" aria-hidden="true" />
          <span aria-current="page" className="text-earth-800">
            {product.name}
          </span>
        </nav>
      </div>

      <div className="container-page grid gap-10 py-8 lg:grid-cols-2">
        <ProductGallery images={product.gallery} alt={product.name} />

        <div>
          <div className="flex items-center gap-2 text-sm">
            <span className="flex items-center gap-1 text-amber-600">
              <Star
                className="h-4 w-4 fill-amber-400 text-amber-400"
                aria-hidden="true"
              />
              {product.rating}
            </span>
            <span className="text-earth-500">({product.reviews} reviews)</span>
            <span
              className={`ml-2 rounded-full px-2.5 py-0.5 text-xs font-semibold ${inStock ? "bg-brand-100 text-brand-800" : "bg-red-100 text-red-700"}`}
            >
              {inStock ? `In stock (${product.stock})` : "Out of stock"}
            </span>
          </div>

          <h1 className="mt-3 text-3xl font-bold text-brand-900 sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-3 text-earth-700">{product.description}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-brand-800">
              {formatCurrency(price)}
            </span>
            {product.offerPrice && (
              <span className="text-lg text-earth-400 line-through">
                {formatCurrency(product.price)}
              </span>
            )}
            <span className="text-sm text-earth-500">/ {product.unit}</span>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full border border-earth-200 bg-white">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="p-3 text-earth-700 disabled:opacity-40"
                disabled={qty <= 1}
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span
                className="w-10 text-center text-sm font-semibold"
                aria-live="polite"
              >
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                className="p-3 text-earth-700 disabled:opacity-40"
                disabled={qty >= product.stock}
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={() => addItem(product, qty)}
              disabled={!inStock}
              className="btn-primary flex-1 sm:flex-none"
            >
              <ShoppingCart className="h-4 w-4" /> Add to cart
            </button>
            <button
              onClick={() => {
                addItem(product, qty);
                navigate("/checkout");
              }}
              disabled={!inStock}
              className="btn-secondary flex-1 sm:flex-none"
            >
              <Zap className="h-4 w-4" /> Buy now
            </button>
          </div>

          <ul className="mt-8 grid gap-3 border-t border-earth-100 pt-6 text-sm text-earth-700 sm:grid-cols-2">
            <li className="flex items-center gap-2">
              <Package className="h-4 w-4 text-brand-600" aria-hidden="true" />{" "}
              Ships within 24 hours
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck
                className="h-4 w-4 text-brand-600"
                aria-hidden="true"
              />{" "}
              Freshness guarantee
            </li>
          </ul>

          {product.benefits?.length > 0 && (
            <div className="mt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-earth-600">
                Key benefits
              </h2>
              <ul className="mt-2 flex flex-wrap gap-2">
                {product.benefits.map((b) => (
                  <li
                    key={b}
                    className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-800 ring-1 ring-brand-100"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="section container-page border-t border-earth-100">
          <h2 className="mb-6 text-2xl font-bold text-brand-900">
            You may also like
          </h2>
          <ProductGrid products={related} />
        </section>
      )}
    </>
  );
}
