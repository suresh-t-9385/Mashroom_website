const steps = [
  {
    n: "01",
    title: "Organic Substrate",
    text: "Agricultural by-products are pasteurised and inoculated in a sterile lab.",
  },
  {
    n: "02",
    title: "Climate-Controlled Growth",
    text: "Humidity, CO₂ and light are tuned per variety for 18–24 days.",
  },
  {
    n: "03",
    title: "Hand Harvest",
    text: "Each flush is picked at peak maturity, trimmed and graded by hand.",
  },
  {
    n: "04",
    title: "Cold-Chain Delivery",
    text: "Pre-cooled, vacuum-breathing packed and dispatched within hours.",
  },
];

export default function ProcessSection() {
  return (
    <section className="section container-page">
      <div className="mb-10 text-center">
        <span className="eyebrow">Our Process</span>
        <h2 className="mt-2 text-3xl font-bold text-brand-900 sm:text-4xl">
          From spore to doorstep
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-earth-600">
          Four controlled stages, each monitored daily by our growers.
        </p>
      </div>
      <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <li key={s.n} className="card p-6">
            <span className="font-display text-3xl font-bold text-brand-200">
              {s.n}
            </span>
            <h3 className="mt-2 text-lg font-semibold text-earth-900">
              {s.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-earth-600">
              {s.text}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
