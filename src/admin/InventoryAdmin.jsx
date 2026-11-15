import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { products } from "../services/mockData";
import { adjustStock } from "../services/productService";

export default function InventoryAdmin() {
  const [rows, setRows] = useState([...products]);
  const [busyId, setBusyId] = useState(null);

  const adjust = async (id, delta) => {
    setBusyId(id);
    try {
      await adjustStock(id, delta);
      setRows([...products]);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-900">Inventory</h1>
      <p className="mt-1 text-sm text-earth-600">
        Adjust stock levels. Changes sync to the storefront instantly.
      </p>

      <ul className="mt-6 space-y-3">
        {rows.map((p) => (
          <li
            key={p.id}
            className="flex flex-wrap items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-earth-100"
          >
            <img
              src={p.image}
              alt=""
              width="48"
              height="48"
              className="h-12 w-12 rounded-lg object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-earth-900">{p.name}</p>
              <p className="text-xs text-earth-500">
                {p.unit} · {p.category}
              </p>
            </div>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${p.stock > 50 ? "bg-brand-50 text-brand-700" : p.stock > 0 ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"}`}
            >
              {p.stock} in stock
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => adjust(p.id, -10)}
                disabled={busyId === p.id || p.stock === 0}
                className="rounded-lg p-2 text-earth-600 hover:bg-earth-100 disabled:opacity-40"
                aria-label={`Decrease ${p.name} stock by 10`}
              >
                <Minus className="h-4 w-4" />
              </button>
              <button
                onClick={() => adjust(p.id, 10)}
                disabled={busyId === p.id}
                className="rounded-lg p-2 text-earth-600 hover:bg-earth-100 disabled:opacity-40"
                aria-label={`Increase ${p.name} stock by 10`}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
