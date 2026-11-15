import { categories } from "../../services/mockData";

export default function ProductFilters({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
}) {
  return (
    <div className="mb-8 flex flex-col gap-3 rounded-2xl bg-white p-4 ring-1 ring-earth-100 md:flex-row md:items-center">
      <div className="flex-1">
        <label htmlFor="product-search" className="sr-only">
          Search products
        </label>
        <input
          id="product-search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search mushrooms…"
          className="input"
        />
      </div>

      <div>
        <label htmlFor="filter-category" className="sr-only">
          Filter by category
        </label>
        <select
          id="filter-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input md:w-52"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-sort" className="sr-only">
          Sort products
        </label>
        <select
          id="filter-sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="input md:w-52"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top rated</option>
          <option value="newest">Newest</option>
        </select>
      </div>
    </div>
  );
}
