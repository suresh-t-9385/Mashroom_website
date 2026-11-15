import { useState } from "react";

export default function ProductGallery({ images, alt }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="overflow-hidden rounded-2xl bg-earth-100">
        <img
          src={images[active]}
          alt={`${alt} — image ${active + 1}`}
          width="720"
          height="540"
          fetchpriority="high"
          className="aspect-[4/3] w-full object-cover"
        />
      </div>
      <div className="mt-3 flex gap-3" role="group" aria-label="Product images">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            aria-pressed={i === active}
            className={`overflow-hidden rounded-xl ring-2 transition ${i === active ? "ring-brand-600" : "ring-transparent hover:ring-earth-200"}`}
          >
            <img
              src={src}
              alt=""
              width="96"
              height="72"
              loading="lazy"
              className="h-16 w-24 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
