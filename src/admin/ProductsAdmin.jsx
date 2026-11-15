import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import DataTable from "../components/common/DataTable";
import { products as seed } from "../services/mockData";
import { categories } from "../services/mockData";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../services/productService";
import { formatCurrency, slugify } from "../utils/format";

const blank = {
  name: "",
  category: "oyster",
  price: "",
  offerPrice: "",
  unit: "500g",
  stock: "",
  image: "",
  shortDescription: "",
};

export default function ProductsAdmin() {
  const [rows, setRows] = useState([...seed]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setRows([...seed]);
  }, []);

  const openNew = () => {
    setEditing("new");
    setForm(blank);
  };
  const openEdit = (p) => {
    setEditing(p.id);
    setForm({ ...p });
  };
  const close = () => {
    setEditing(null);
    setForm(blank);
  };

  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        offerPrice: form.offerPrice ? Number(form.offerPrice) : null,
        stock: Number(form.stock),
        image:
          form.image ||
          `https://picsum.photos/seed/${slugify(form.name)}/800/600`,
      };
      if (editing === "new")
        await createProduct({ ...payload, slug: slugify(form.name) });
      else await updateProduct(editing, payload);
      setRows([...seed]);
      close();
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await deleteProduct(id);
    setRows([...seed]);
  };

  const columns = [
    {
      key: "name",
      header: "Product",
      render: (r) => (
        <div className="flex items-center gap-3">
          <img
            src={r.image}
            alt=""
            width="40"
            height="40"
            className="h-10 w-10 rounded-lg object-cover"
          />
          <div>
            <p className="font-medium text-earth-900">{r.name}</p>
            <p className="text-xs text-earth-500">
              {r.category} · {r.unit}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "price",
      header: "Price",
      render: (r) => formatCurrency(r.offerPrice ?? r.price),
    },
    {
      key: "stock",
      header: "Stock",
      render: (r) => (
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${r.stock > 50 ? "bg-brand-50 text-brand-700" : r.stock > 0 ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"}`}
        >
          {r.stock}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (r) => (
        <span className="text-xs capitalize text-earth-600">{r.status}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (r) => (
        <div className="flex gap-1">
          <button
            onClick={() => openEdit(r)}
            className="rounded-lg p-1.5 text-earth-600 hover:bg-earth-100"
            aria-label={`Edit ${r.name}`}
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => remove(r.id)}
            className="rounded-lg p-1.5 text-red-600 hover:bg-red-50"
            aria-label={`Delete ${r.name}`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-brand-900">Products</h1>
          <p className="mt-1 text-sm text-earth-600">
            {rows.length} products in catalogue.
          </p>
        </div>
        <button onClick={openNew} className="btn-primary px-4 py-2 text-sm">
          <Plus className="h-4 w-4" /> Add product
        </button>
      </div>

      <div className="mt-6">
        <DataTable
          columns={columns}
          rows={rows}
          emptyMessage="No products yet."
        />
      </div>

      {editing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Product form"
        >
          <div
            className="absolute inset-0 bg-earth-900/50"
            onClick={close}
            aria-hidden="true"
          />
          <form
            onSubmit={save}
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-earth-900">
                {editing === "new" ? "Add product" : "Edit product"}
              </h2>
              <button
                type="button"
                onClick={close}
                className="rounded-lg p-1.5 hover:bg-earth-100"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <label htmlFor="p-name" className="label">
                  Name
                </label>
                <input
                  id="p-name"
                  required
                  className="input"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="p-cat" className="label">
                    Category
                  </label>
                  <select
                    id="p-cat"
                    className="input"
                    value={form.category}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, category: e.target.value }))
                    }
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="p-unit" className="label">
                    Unit
                  </label>
                  <input
                    id="p-unit"
                    className="input"
                    value={form.unit}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, unit: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label htmlFor="p-price" className="label">
                    Price (₹)
                  </label>
                  <input
                    id="p-price"
                    type="number"
                    min="0"
                    required
                    className="input"
                    value={form.price}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, price: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label htmlFor="p-offer" className="label">
                    Offer price (₹)
                  </label>
                  <input
                    id="p-offer"
                    type="number"
                    min="0"
                    className="input"
                    value={form.offerPrice ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, offerPrice: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label htmlFor="p-stock" className="label">
                    Stock
                  </label>
                  <input
                    id="p-stock"
                    type="number"
                    min="0"
                    required
                    className="input"
                    value={form.stock}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, stock: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label htmlFor="p-image" className="label">
                    Image URL
                  </label>
                  <input
                    id="p-image"
                    className="input"
                    value={form.image}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, image: e.target.value }))
                    }
                    placeholder="https://…"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="p-desc" className="label">
                  Short description
                </label>
                <textarea
                  id="p-desc"
                  rows="3"
                  className="input"
                  value={form.shortDescription}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, shortDescription: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={close}
                className="btn-secondary px-4 py-2 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={busy}
                className="btn-primary px-4 py-2 text-sm"
              >
                {busy ? "Saving…" : "Save product"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
