import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchX } from "lucide-react";
import SEO from "../components/seo/SEO";
import ProductFilters from "../components/product/ProductFilters";
import ProductGrid from "../components/product/ProductGrid";
import Pagination from "../components/common/Pagination";
import Spinner from "../components/common/Spinner";
import EmptyState from "../components/common/EmptyState";
import { useProducts } from "../hooks/useProducts";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(
    searchParams.get("category") || "all",
  );
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [search, category, sort]);

  const params = useMemo(
    () => ({ search, category, sort, page, limit: 9 }),
    [search, category, sort, page],
  );
  const { items, total, totalPages, loading, error } = useProducts(params);

  useEffect(() => {
    const next = new URLSearchParams();
    if (search) next.set("search", search);
    if (category !== "all") next.set("category", category);
    setSearchParams(next, { replace: true });
  }, [search, category, setSearchParams]);

  return (
    <>
      <SEO
        title="Buy Fresh Mushrooms Online"
        description="Browse our full range of organic oyster, shiitake, button, milky and lion's mane mushrooms, plus dried powders and gift boxes."
        path="/products"
      />
      <div className="container-page section">
        <header className="mb-8">
          <span className="eyebrow">Shop</span>
          <h1 className="mt-2 text-3xl font-bold text-brand-900 sm:text-4xl">
            Our Products
          </h1>
          <p className="mt-2 max-w-2xl text-earth-600">
            Everything is harvested to order and dispatched the same day.{" "}
            {total} products available.
          </p>
        </header>

        <ProductFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
        />

        {loading ? (
          <Spinner label="Loading products…" />
        ) : error ? (
          <p
            role="alert"
            className="rounded-xl bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
          </p>
        ) : items.length === 0 ? (
          <EmptyState
            icon={SearchX}
            title="No products match your filters"
            message="Try a different search term or clear the category filter."
            action={
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("all");
                }}
                className="btn-secondary"
              >
                Clear filters
              </button>
            }
          />
        ) : (
          <>
            <ProductGrid products={items} />
            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={setPage}
            />
          </>
        )}
      </div>
    </>
  );
}
