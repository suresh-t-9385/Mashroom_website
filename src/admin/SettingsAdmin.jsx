// src/admin/SettingsAdmin.jsx
import { useState } from "react";

export default function SettingsAdmin() {
  const [settings, setSettings] = useState({
    storeName: "FungiFresh Organics",
    supportEmail: "hello@fungifresh.example.com",
    freeShippingThreshold: 999,
    lowStockThreshold: 50,
  });
  const [saved, setSaved] = useState(false);

  const save = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const fields = [
    ["storeName", "Store name", "text"],
    ["supportEmail", "Support email", "email"],
    ["freeShippingThreshold", "Free shipping above (₹)", "number"],
    ["lowStockThreshold", "Low-stock threshold", "number"],
  ];

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-brand-900">Business settings</h1>
      <form
        onSubmit={save}
        className="mt-6 space-y-4 rounded-2xl bg-white p-6 ring-1 ring-earth-100"
      >
        {fields.map(([key, label, type]) => (
          <div key={key}>
            <label htmlFor={key} className="label">
              {label}
            </label>
            <input
              id={key}
              type={type}
              className="input"
              value={settings[key]}
              onChange={(e) =>
                setSettings((s) => ({ ...s, [key]: e.target.value }))
              }
            />
          </div>
        ))}
        <button type="submit" className="btn-primary w-full">
          Save settings
        </button>
        {saved && (
          <p role="status" className="text-center text-sm text-brand-700">
            Settings saved.
          </p>
        )}
      </form>
    </div>
  );
}
