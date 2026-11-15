import { Link } from "react-router-dom";
import SEO from "../components/seo/SEO";

export default function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you are looking for does not exist."
        path="/404"
        noIndex
      />
      <div className="container-page section text-center">
        <p className="font-display text-6xl font-bold text-brand-200">404</p>
        <h1 className="mt-4 text-3xl font-bold text-brand-900">
          We couldn't find that page
        </h1>
        <p className="mt-2 text-earth-600">
          It may have moved, or the link might be incorrect.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/" className="btn-primary">
            Back to home
          </Link>
          <Link to="/products" className="btn-secondary">
            Browse products
          </Link>
        </div>
      </div>
    </>
  );
}
