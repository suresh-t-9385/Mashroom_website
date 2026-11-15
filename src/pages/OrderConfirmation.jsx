import { Link, useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import SEO from "../components/seo/SEO";

export default function OrderConfirmation() {
  const { orderId } = useParams();
  return (
    <>
      <SEO
        title="Order Confirmed"
        path={`/order-confirmation/${orderId}`}
        noIndex
        description="Your order has been placed."
      />
      <div className="container-page section max-w-xl text-center">
        <CheckCircle2
          className="mx-auto h-16 w-16 text-brand-600"
          aria-hidden="true"
        />
        <h1 className="mt-6 text-3xl font-bold text-brand-900">
          Thank you for your order!
        </h1>
        <p className="mt-3 text-earth-600">
          Your order <strong className="text-earth-900">{orderId}</strong> has
          been received. A confirmation email with tracking details is on its
          way.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/order-tracking" className="btn-primary">
            Track my order
          </Link>
          <Link to="/products" className="btn-secondary">
            Continue shopping
          </Link>
        </div>
      </div>
    </>
  );
}
