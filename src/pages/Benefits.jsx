import { Link } from "react-router-dom";
import { HeartPulse, Brain, Shield, Dumbbell } from "lucide-react";
import SEO from "../components/seo/SEO";

const benefits = [
  {
    Icon: Dumbbell,
    title: "Plant-based protein",
    text: "Mushrooms provide 3–4g of protein per 100g with all essential amino acids present in varying amounts.",
  },
  {
    Icon: Shield,
    title: "Beta-glucan rich",
    text: "Beta-glucans are soluble fibres linked to immune modulation and healthy cholesterol levels.",
  },
  {
    Icon: Brain,
    title: "Cognitive support",
    text: "Lion's mane contains hericenones and erinacines studied for their role in nerve growth factor synthesis.",
  },
  {
    Icon: HeartPulse,
    title: "Low calorie, nutrient dense",
    text: "High in B vitamins, selenium, potassium and vitamin D when UV-exposed during growth.",
  },
];

export default function Benefits() {
  return (
    <>
      <SEO
        title="Health Benefits of Mushrooms"
        description="Evidence-based benefits of eating mushrooms: protein, beta-glucans, immune support, cognitive health and vitamin D."
        path="/benefits"
      />
      <div className="container-page section">
        <header className="max-w-2xl">
          <span className="eyebrow">Nutrition</span>
          <h1 className="mt-2 text-3xl font-bold text-brand-900 sm:text-4xl">
            Mushroom benefits, without the hype
          </h1>
          <p className="mt-3 text-earth-600">
            Mushrooms are nutritionally dense and low in calories. Here's what
            the research supports — and what it doesn't yet.
          </p>
        </header>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {benefits.map(({ Icon, title, text }) => (
            <article key={title} className="card p-6">
              <Icon className="h-8 w-8 text-brand-600" aria-hidden="true" />
              <h2 className="mt-4 text-lg font-semibold text-earth-900">
                {title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-earth-600">
                {text}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-earth-50 p-6 text-sm text-earth-700">
          <p>
            <strong>Disclaimer:</strong> This information is for general
            educational purposes and is not medical advice. Consult a qualified
            healthcare professional before using mushrooms for therapeutic
            purposes.
          </p>
          <Link to="/products" className="btn-primary mt-5">
            Shop fresh mushrooms
          </Link>
        </div>
      </div>
    </>
  );
}
