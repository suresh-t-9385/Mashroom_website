import { Sprout, Snowflake, BadgeCheck, HeartHandshake } from "lucide-react";

const items = [
  {
    Icon: Sprout,
    title: "Grown, not sourced",
    text: "Every mushroom comes from our own indoor farm — full traceability from substrate to shelf.",
  },
  {
    Icon: Snowflake,
    title: "Cold chain, always",
    text: "Harvested at dawn, pre-cooled within the hour, and shipped in insulated packaging.",
  },
  {
    Icon: BadgeCheck,
    title: "Certified organic",
    text: "India Organic and FSSAI certified. No synthetic pesticides, ever.",
  },
  {
    Icon: HeartHandshake,
    title: "Farmer-first pricing",
    text: "Fair, transparent pricing that supports the growers who do the work.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-brand-900 py-16 sm:py-20">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">
            Why Sri Amman Mashroom
          </span>
          <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
            Freshness you can taste, standards you can verify.
          </h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl bg-brand-800/60 p-6 ring-1 ring-brand-700"
            >
              <Icon className="h-8 w-8 text-brand-300" aria-hidden="true" />
              <h3 className="mt-4 text-base font-semibold text-white">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-100/80">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
