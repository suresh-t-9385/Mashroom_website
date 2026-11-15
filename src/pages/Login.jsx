// src/pages/Login.jsx
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SEO from "../components/seo/SEO";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await login(form);
      navigate(user.role === "admin" ? "/admin" : from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Customer Login"
        description="Log in to your FungiFresh account."
        path="/login"
        noIndex
      />
      <div className="container-page section max-w-md">
        <h1 className="text-3xl font-bold text-brand-900">Welcome back</h1>
        <p className="mt-2 text-sm text-earth-600">
          Log in to track orders and reorder favourites.
        </p>

        <form onSubmit={submit} className="card mt-8 space-y-4 p-6">
          <div>
            <label htmlFor="login-email" className="label">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              required
              className="input"
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
            />
          </div>
          <div>
            <label htmlFor="login-password" className="label">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              required
              className="input"
              value={form.password}
              onChange={(e) =>
                setForm((f) => ({ ...f, password: e.target.value }))
              }
            />
          </div>
          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
          <p className="text-center text-sm text-earth-600">
            New here?{" "}
            <Link
              to="/register"
              className="font-semibold text-brand-700 hover:underline"
            >
              Create an account
            </Link>
          </p>
          <p className="rounded-lg bg-earth-50 p-3 text-center text-xs text-earth-500">
            Demo: customer@example.com / customer123 · admin@fungifresh.com /
            admin123
          </p>
        </form>
      </div>
    </>
  );
}
