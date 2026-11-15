// src/pages/Gallery.jsx
import SEO from "../components/seo/SEO";
import { galleryImages } from "../services/mockData";

export default function Gallery() {
  return (
    <>
      <SEO
        title="Farm Gallery"
        description="Photos from inside the FungiFresh indoor mushroom farm — grow rooms, harvests and packing."
        path="/gallery"
      />
      <div className="container-page section">
        <header className="max-w-2xl">
          <span className="eyebrow">Gallery</span>
          <h1 className="mt-2 text-3xl font-bold text-brand-900 sm:text-4xl">
            Inside the farm
          </h1>
        </header>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {galleryImages.map((g) => (
            <img
              key={g.id}
              src={g.src}
              alt={g.alt}
              width="600"
              height="600"
              loading="lazy"
              decoding="async"
              className="aspect-square w-full rounded-xl object-cover transition-transform hover:scale-[1.02]"
            />
          ))}
        </div>
      </div>
    </>
  );
}
