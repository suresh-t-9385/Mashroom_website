import api from "./api";
import { products, categories } from "./mockData";

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";
const delay = (ms = 280) => new Promise((r) => setTimeout(r, ms));

export async function getCategories() {
  if (!USE_MOCK) return (await api.get("/categories")).data;
  await delay(120);
  return categories;
}

export async function getProducts({
  search = "",
  category = "all",
  sort = "featured",
  page = 1,
  limit = 9,
} = {}) {
  if (!USE_MOCK)
    return (
      await api.get("/products", {
        params: { search, category, sort, page, limit },
      })
    ).data;
  await delay();

  let list = products.filter(
    (p) => p.status === "active" || p.status === "out-of-stock",
  );
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.includes(q),
    );
  }
  if (category !== "all") list = list.filter((p) => p.category === category);

  const sorters = {
    "price-asc": (a, b) =>
      (a.offerPrice ?? a.price) - (b.offerPrice ?? b.price),
    "price-desc": (a, b) =>
      (b.offerPrice ?? b.price) - (a.offerPrice ?? a.price),
    rating: (a, b) => b.rating - a.rating,
    newest: (a, b) => String(b.id).localeCompare(String(a.id)),
    featured: (a, b) => Number(b.featured) - Number(a.featured),
  };
  list = [...list].sort(sorters[sort] || sorters.featured);

  const total = list.length;
  const start = (page - 1) * limit;
  return {
    items: list.slice(start, start + limit),
    total,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}

export async function getProductBySlug(slug) {
  if (!USE_MOCK) return (await api.get(`/products/${slug}`)).data;
  await delay(200);
  const found = products.find((p) => p.slug === slug);
  if (!found) throw new Error("Product not found");
  return found;
}

export async function getFeaturedProducts(limit = 4) {
  const { items } = await getProducts({ sort: "featured", limit });
  return items;
}

export async function getBestSellers(limit = 4) {
  if (!USE_MOCK) return (await api.get("/products/best-sellers")).data;
  await delay(200);
  return products.filter((p) => p.bestSeller).slice(0, limit);
}

/* ---------- Admin mutations (mock keeps in-memory) ---------- */

export async function createProduct(payload) {
  if (!USE_MOCK) return (await api.post("/admin/products", payload)).data;
  await delay(200);
  const id = payload.slug || `product-${Date.now()}`;
  const created = {
    ...payload,
    id,
    slug: id,
    gallery: payload.gallery || [payload.image],
  };
  products.unshift(created);
  return created;
}

export async function updateProduct(id, payload) {
  if (!USE_MOCK) return (await api.put(`/admin/products/${id}`, payload)).data;
  await delay(200);
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) throw new Error("Product not found");
  products[idx] = { ...products[idx], ...payload };
  return products[idx];
}

export async function deleteProduct(id) {
  if (!USE_MOCK) return (await api.delete(`/admin/products/${id}`)).data;
  await delay(200);
  const idx = products.findIndex((p) => p.id === id);
  if (idx > -1) products.splice(idx, 1);
  return { success: true };
}

export async function adjustStock(id, delta) {
  const product = products.find((p) => p.id === id);
  if (!product) throw new Error("Product not found");
  const stock = Math.max(0, product.stock + delta);
  return updateProduct(id, {
    stock,
    status: stock > 0 ? "active" : "out-of-stock",
  });
}
