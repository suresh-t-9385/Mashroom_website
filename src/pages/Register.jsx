// src/pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SEO from "../components/seo/SEO";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    if (form.password.length < 8)
      return setError("Password must be at least 8 characters.");
    if (form.password !== form.confirm)
      return setError("Passwords do not match.");
    setLoading(true);
    try {
      await register(form);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    ["name", "Full name", "text", "name"],
    ["email", "Email", "email", "email"],
    ["password", "Password", "password", "new-password"],
    ["confirm", "Confirm password", "password", "new-password"],
  ];

  return (
    <>
      <SEO
        title="Create Account"
        description="Create your FungiFresh Organics account."
        path="/register"
        noIndex
      />
      <div className="container-page section max-w-md">
        <h1 className="text-3xl font-bold text-brand-900">
          Create your account
        </h1>
        <form onSubmit={submit} className="card mt-8 space-y-4 p-6">
          {fields.map(([name, label, type, ac]) => (
            <div key={name}>
              <label htmlFor={name} className="label">
                {label}
              </label>
              <input
                id={name}
                type={type}
                autoComplete={ac}
                required
                className="input"
                value={form[name]}
                onChange={(e) =>
                  setForm((f) => ({ ...f, [name]: e.target.value }))
                }
              />
            </div>
          ))}
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
            {loading ? "Creating account…" : "Create account"}
          </button>
          <p className="text-center text-sm text-earth-600">
            Already registered?{" "}
            <Link
              to="/login"
              className="font-semibold text-brand-700 hover:underline"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
