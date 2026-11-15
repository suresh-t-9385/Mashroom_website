import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/seo/SEO";
import Hero from "../components/home/Hero";
import CategoryStrip from "../components/home/CategoryStrip";
import WhyChooseUs from "../components/home/WhyChooseUs";
import ProcessSection from "../components/home/ProcessSection";
import Testimonials from "../components/home/Testimonials";
import Newsletter from "../components/home/Newsletter";
import WhatsAppCTA from "../components/home/WhatsAppCTA";
import ProductGrid from "../components/product/ProductGrid";
import Spinner from "../components/common/Spinner";
import {
  getBestSellers,
  getFeaturedProducts,
} from "../services/productService";
import { blogPosts } from "../services/mockData";
import { formatDate } from "../utils/format";

export default function Home() {
  const [best, setBest] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getBestSellers(3), getFeaturedProducts(3)])
      .then(([b, f]) => {
        setBest(b);
        setFeatured(f);
      })
      .finally(() => setLoading(false));
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SRI AMMAM MASHROOMS",
    url: import.meta.env.VITE_SITE_URL || "https://fungifresh.example.com",
    logo: `${import.meta.env.VITE_SITE_URL || "https://fungifresh.example.com"}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-98765-43210",
      contactType: "customer service",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plot 24, Green Valley Agro Park",
      addressLocality: "Bengaluru",
      postalCode: "562125",
      addressCountry: "IN",
    },
  };

  return (
    <>
      <SEO
        title="Farm-Fresh Organic Gourmet Mushrooms"
        description="Buy premium organic oyster, shiitake, lion's mane and milky mushrooms online. Harvested daily, cold-chain delivered within 24 hours across India."
        path="/"
        jsonLd={jsonLd}
      />
      <Hero />
      <CategoryStrip />

      {/* <section className="section container-page">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="eyebrow">Bestsellers</span>
            <h2 className="mt-2 text-3xl font-bold text-brand-900">
              What our customers reorder
            </h2>
          </div>
          <Link
            to="/products"
            className="text-sm font-semibold text-brand-700 hover:underline"
          >
            Shop all products →
          </Link>
        </div>
        {loading ? (
          <Spinner label="Loading products…" />
        ) : (
          <ProductGrid products={best} />
        )}
      </section> */}

      <WhyChooseUs />
      <ProcessSection />

      <section className="section container-page">
        <div className="mb-8">
          <span className="eyebrow">Fresh Today</span>
          <h2 className="mt-2 text-3xl font-bold text-brand-900">
            Featured this week
          </h2>
        </div>
        {loading ? (
          <Spinner label="Loading products…" />
        ) : (
          <ProductGrid products={featured} />
        )}
      </section>

      <Testimonials />

      <section className="section container-page">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="eyebrow">Journal</span>
            <h2 className="mt-2 text-3xl font-bold text-brand-900">
              Latest from the farm
            </h2>
          </div>
          <Link
            to="/blog"
            className="text-sm font-semibold text-brand-700 hover:underline"
          >
            All articles →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.id} className="card overflow-hidden">
              <img
                src={post.image}
                alt=""
                width="400"
                height="240"
                loading="lazy"
                className="aspect-[5/3] w-full object-cover"
              />
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                  {post.tag}
                </p>
                <h3 className="mt-2 text-base font-semibold leading-snug text-earth-900">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-earth-600">
                  {post.excerpt}
                </p>
                <p className="mt-3 text-xs text-earth-500">
                  {formatDate(post.date)} · {post.author}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Newsletter />
      <WhatsAppCTA />
    </>
  );
}
