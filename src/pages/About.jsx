// src/pages/About.jsx
import SEO from "../components/seo/SEO";
import { img } from "../utils/image";

export default function About() {
  return (
    <>
      <SEO
        title="About Us"
        description="FungiFresh Organics is a Bengaluru-based indoor mushroom farm supplying certified organic gourmet mushrooms across India."
        path="/about"
      />
      <div className="container-page section grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="eyebrow">About</span>
          <h1 className="mt-2 text-3xl font-bold text-brand-900 sm:text-4xl">
            We started with one grow room and a stubborn idea
          </h1>
          <p className="mt-4 text-earth-700">
            In 2019 we converted a warehouse unit into a single grow room
            because we couldn't find consistently fresh mushrooms anywhere in
            Bengaluru. Today we operate 14 climate-controlled rooms and supply
            homes, restaurants and retailers across South India.
          </p>
          <p className="mt-4 text-earth-700">
            We still do the unglamorous things: pasteurising our own substrate,
            checking CO₂ charts at 6 a.m., and rejecting any flush that doesn't
            meet grade. Freshness isn't a marketing word here — it's a
            cold-chain protocol.
          </p>
          <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-earth-100 pt-6">
            {[
              ["14", "Grow rooms"],
              ["6+", "Years farming"],
              ["1200+", "Repeat customers"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="text-2xl font-bold text-brand-800">{n}</dt>
                <dd className="text-xs text-earth-500">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <img
          src={img("about-farm", 800, 800)}
          alt="FungiFresh grow room with mushroom bags on shelving"
          width="800"
          height="800"
          className="aspect-square w-full rounded-3xl object-cover"
          loading="lazy"
        />
      </div>
    </>
  );
}
