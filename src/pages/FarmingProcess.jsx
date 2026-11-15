// src/pages/FarmingProcess.jsx
import SEO from "../components/seo/SEO";

const phases = [
  {
    title: "Lab & Spawn",
    body: "Our cultures are maintained in a dedicated clean room. Grain spawn is sterilised and inoculated under laminar flow to guarantee zero contamination.",
  },
  {
    title: "Substrate Preparation",
    body: "Locally sourced agricultural residue is hydrated, pasteurised and cooled before inoculation. No synthetic additives.",
  },
  {
    title: "Incubation",
    body: "Bags colonise in dark, temperature-controlled rooms for 14–18 days. CO₂ levels are monitored continuously.",
  },
  {
    title: "Fruiting",
    body: "Relative humidity is held at 85–92% with fresh air exchanges to trigger primordia formation and uniform flushes.",
  },
  {
    title: "Harvest & Grade",
    body: "Harvested by hand at peak maturity, trimmed, graded by cap size and inspected for defects.",
  },
  {
    title: "Cold Chain",
    body: "Pre-cooled to 4°C within 60 minutes, packed in breathable film and dispatched the same morning.",
  },
];

export default function FarmingProcess() {
  return (
    <>
      <SEO
        title="Our Mushroom Farming Process"
        description="Step-by-step look at how FungiFresh grows organic mushrooms — from spawn lab to cold-chain delivery."
        path="/farming-process"
      />
      <div className="container-page section">
        <header className="max-w-2xl">
          <span className="eyebrow">Our Farm</span>
          <h1 className="mt-2 text-3xl font-bold text-brand-900 sm:text-4xl">
            How we grow
          </h1>
          <p className="mt-3 text-earth-600">
            Six controlled stages. Daily monitoring. No shortcuts.
          </p>
        </header>
        <ol className="mt-10 space-y-6">
          {phases.map((p, i) => (
            <li
              key={p.title}
              className="card flex flex-col gap-3 p-6 sm:flex-row sm:gap-6"
            >
              <span className="font-display text-3xl font-bold text-brand-200">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="text-lg font-semibold text-earth-900">
                  {p.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-earth-600">
                  {p.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
