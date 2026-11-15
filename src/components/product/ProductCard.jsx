import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { formatCurrency } from "../../utils/format";
import { useCart } from "../../context/CartContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const price = product.offerPrice ?? product.price;
  const onOffer = product.offerPrice && product.offerPrice < product.price;
  const outOfStock = product.stock <= 0;

  return (
    <article className="card group flex flex-col overflow-hidden transition-shadow hover:shadow-md">
      <Link
        to={`/products/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-earth-100"
      >
        <img
          src={product.image}
          alt={product.name}
          width="400"
          height="300"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {onOffer && (
          <span className="absolute left-3 top-3 rounded-full bg-brand-700 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
            Save{" "}
            {Math.round(
              ((product.price - product.offerPrice) / product.price) * 100,
            )}
            %
          </span>
        )}
        {outOfStock && (
          <span className="absolute inset-0 grid place-items-center bg-earth-900/55 text-sm font-semibold uppercase tracking-wide text-white">
            Out of stock
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-center gap-1 text-xs text-earth-500">
          <Star
            className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
            aria-hidden="true"
          />
          <span className="font-medium text-earth-700">{product.rating}</span>
          <span>({product.reviews})</span>
        </div>

        <h3 className="text-base font-semibold leading-snug text-earth-900">
          <Link
            to={`/products/${product.slug}`}
            className="hover:text-brand-700"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-earth-600">
          {product.shortDescription}
        </p>

        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            <p className="text-lg font-bold text-brand-800">
              {formatCurrency(price)}
            </p>
            <p className="text-xs text-earth-500">
              {onOffer && (
                <span className="mr-1 line-through">
                  {formatCurrency(product.price)}
                </span>
              )}
              per {product.unit}
            </p>
          </div>
          <button
            onClick={() => addItem(product, 1)}
            disabled={outOfStock}
            className="btn-primary px-3 py-2 disabled:cursor-not-allowed"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </article>
  );
}
