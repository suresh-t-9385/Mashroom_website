import { Star } from "lucide-react";
import { testimonials } from "../../services/mockData";

export default function Testimonials() {
  return (
    <section className="bg-cream-100 py-16 sm:py-20">
      <div className="container-page">
        <div className="mb-10 text-center">
          <span className="eyebrow">Testimonials</span>
          <h2 className="mt-2 text-3xl font-bold text-brand-900 sm:text-4xl">
            Loved by chefs and home cooks
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.id} className="card flex h-full flex-col p-6">
              <div
                className="flex gap-0.5"
                aria-label={`${t.rating} out of 5 stars`}
              >
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-earth-700">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 border-t border-earth-100 pt-4">
                <p className="text-sm font-semibold text-earth-900">{t.name}</p>
                <p className="text-xs text-earth-500">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
