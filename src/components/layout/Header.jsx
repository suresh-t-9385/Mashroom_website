import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingBag, Search, User, LogOut } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/varieties", label: "Varieties" },
  { to: "/benefits", label: "Benefits" },
  { to: "/farming-process", label: "Our Farm" },
  { to: "/blog", label: "Blog" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { count } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const submitSearch = (e) => {
    e.preventDefault();
    navigate(`/products?search=${encodeURIComponent(query)}`);
    setSearchOpen(false);
    setOpen(false);
  };

  const linkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? "text-brand-700" : "text-earth-700 hover:text-brand-700"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-earth-100 bg-cream-50/90 backdrop-blur">
      <div className="bg-brand-800 text-white">
        <div className="container-page flex h-9 items-center justify-center text-center text-xs">
          Free delivery on orders above ₹999 · Harvested & shipped within 24
          hours
        </div>
      </div>

      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          className="flex items-center gap-2"
          aria-label="FungiFresh Organics home"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-700 text-lg text-white">
            🍄
          </span>
          <span className="font-display text-lg font-bold text-brand-900">
            Sri Amman Mashrooms
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden lg:flex lg:items-center lg:gap-1"
        >
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={linkClass}
              end={n.to === "/"}
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setSearchOpen((v) => !v)}
            className="rounded-lg p-2 text-earth-700 hover:bg-earth-100"
            aria-label="Search products"
          >
            <Search className="h-5 w-5" />
          </button>

          {user ? (
            <div className="hidden items-center gap-1 sm:flex">
              {isAdmin && (
                <Link
                  to="/admin"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={logout}
                className="rounded-lg p-2 text-earth-700 hover:bg-earth-100"
                aria-label="Log out"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden rounded-lg p-2 text-earth-700 hover:bg-earth-100 sm:block"
              aria-label="Log in"
            >
              <User className="h-5 w-5" />
            </Link>
          )}

          <Link
            to="/cart"
            className="relative rounded-lg p-2 text-earth-700 hover:bg-earth-100"
            aria-label={`Cart, ${count} items`}
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-brand-700 px-1 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>

          <button
            onClick={() => setOpen(true)}
            className="rounded-lg p-2 text-earth-700 hover:bg-earth-100 lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-earth-100 bg-white">
          <form
            onSubmit={submitSearch}
            className="container-page flex gap-2 py-3"
            role="search"
          >
            <label htmlFor="site-search" className="sr-only">
              Search products
            </label>
            <input
              id="site-search"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="input"
              placeholder="Search mushrooms, powders, gift boxes…"
            />
            <button type="submit" className="btn-primary">
              Search
            </button>
          </form>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-earth-900/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto bg-cream-50 p-5 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-display text-lg font-bold text-brand-900">
                Menu
              </span>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 hover:bg-earth-100"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav aria-label="Mobile" className="flex flex-col gap-1">
              {NAV.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  className={linkClass}
                  onClick={() => setOpen(false)}
                  end={n.to === "/"}
                >
                  {n.label}
                </NavLink>
              ))}
              <div className="my-3 border-t border-earth-200" />
              {user ? (
                <>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="rounded-lg px-3 py-2 text-sm font-medium text-brand-700"
                      onClick={() => setOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="rounded-lg px-3 py-2 text-left text-sm font-medium text-earth-700"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="rounded-lg px-3 py-2 text-sm font-medium text-earth-700"
                    onClick={() => setOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="rounded-lg px-3 py-2 text-sm font-medium text-earth-700"
                    onClick={() => setOpen(false)}
                  >
                    Create account
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
