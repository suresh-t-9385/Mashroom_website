import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Boxes,
  ShoppingBag,
  Users,
  Settings,
  LogOut,
  Store,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/inventory", label: "Inventory", icon: Boxes },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-earth-50 lg:flex">
      <aside className="border-b border-earth-200 bg-white lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between px-5 py-4">
          <Link to="/admin" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-700 text-white">
              🍄
            </span>
            <span className="font-display text-base font-bold text-brand-900">
              FungiFresh
            </span>
          </Link>
          <span className="rounded-full bg-earth-100 px-2 py-0.5 text-[11px] font-semibold uppercase text-earth-600">
            Admin
          </span>
        </div>
        <nav
          aria-label="Admin"
          className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:overflow-visible"
        >
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-brand-50 text-brand-800"
                    : "text-earth-600 hover:bg-earth-50"
                }`
              }
            >
              <Icon className="h-4 w-4" aria-hidden="true" /> {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-earth-200 bg-white px-5 py-3">
          <p className="text-sm text-earth-600">
            Signed in as{" "}
            <strong className="text-earth-900">{user?.name}</strong>
          </p>
          <div className="flex items-center gap-2">
            <Link to="/" className="btn-ghost px-3 py-2 text-xs">
              <Store className="h-4 w-4" /> View store
            </Link>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="btn-ghost px-3 py-2 text-xs"
            >
              <LogOut className="h-4 w-4" /> Log out
            </button>
          </div>
        </header>
        <main className="flex-1 p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
