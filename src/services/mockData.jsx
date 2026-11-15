import { img } from "../utils/image";

export const categories = [
  {
    id: "oyster",
    name: "Oyster Mushrooms",
    image: img("oyster-cat"),
    blurb: "Delicate, buttery caps — our bestseller.",
  },
  {
    id: "shiitake",
    name: "Shiitake",
    image: img("shiitake-cat"),
    blurb: "Rich, smoky umami for stocks & stir-fries.",
  },
  {
    id: "button",
    name: "Button & Cremini",
    image: img("button-cat"),
    blurb: "Everyday kitchen staples, always fresh.",
  },
  {
    id: "milky",
    name: "Milky Mushrooms",
    image: img("milky-cat"),
    blurb: "Meaty texture, high protein content.",
  },
  {
    id: "lions-mane",
    name: "Lion's Mane",
    image: img("lions-cat"),
    blurb: "Functional superfood for focus & memory.",
  },
  {
    id: "dried",
    name: "Dried & Powders",
    image: img("dried-cat"),
    blurb: "Pantry-ready concentrates and blends.",
  },
];

const base = (
  slug,
  name,
  category,
  price,
  offerPrice,
  unit,
  stock,
  extra = {},
) => ({
  id: slug,
  slug,
  name,
  category,
  price,
  offerPrice,
  unit,
  stock,
  status: stock > 0 ? "active" : "out-of-stock",
  image: img(slug),
  gallery: [img(`${slug}-1`), img(`${slug}-2`), img(`${slug}-3`)],
  shortDescription:
    extra.shortDescription ||
    "Farm-fresh, hand-picked and delivered within 24 hours.",
  description:
    extra.description ||
    "Grown in our climate-controlled indoor farm using organic substrate and no synthetic pesticides. Harvested at peak freshness and cooled immediately to preserve texture and flavour.",
  benefits: extra.benefits || [
    "High in protein",
    "Rich in antioxidants",
    "Low in calories",
  ],
  rating: extra.rating ?? 4.7,
  reviews: extra.reviews ?? 42,
  featured: extra.featured ?? false,
  bestSeller: extra.bestSeller ?? false,
});

export let products = [
  base(
    "oyster-mushroom-500g",
    "Fresh Oyster Mushroom",
    "oyster",
    240,
    189,
    "500g",
    120,
    {
      featured: true,
      bestSeller: true,
      rating: 4.9,
      reviews: 214,
      shortDescription:
        "Velvety, mild-flavoured caps — perfect for stir-fries and soups.",
    },
  ),
  base(
    "shiitake-mushroom-250g",
    "Shiitake Mushroom",
    "shiitake",
    320,
    279,
    "250g",
    80,
    {
      featured: true,
      bestSeller: true,
      rating: 4.8,
      reviews: 168,
    },
  ),
  base(
    "button-mushroom-500g",
    "Fresh Button Mushroom",
    "button",
    180,
    149,
    "500g",
    200,
    {
      bestSeller: true,
      rating: 4.6,
      reviews: 312,
    },
  ),
  base("milky-mushroom-500g", "Milky Mushroom", "milky", 260, 219, "500g", 60, {
    featured: true,
    rating: 4.7,
    reviews: 96,
  }),
  base(
    "lions-mane-250g",
    "Lion's Mane Mushroom",
    "lions-mane",
    480,
    399,
    "250g",
    45,
    {
      featured: true,
      rating: 4.9,
      reviews: 88,
      benefits: [
        "Supports cognition",
        "Nerve growth factor support",
        "High in beta-glucans",
      ],
    },
  ),
  base(
    "oyster-mushroom-1kg",
    "Fresh Oyster Mushroom (Bulk)",
    "oyster",
    440,
    399,
    "1kg",
    50,
    { rating: 4.7, reviews: 74 },
  ),
  base(
    "cremini-mushroom-500g",
    "Cremini Mushroom",
    "button",
    220,
    189,
    "500g",
    90,
    { rating: 4.5, reviews: 61 },
  ),
  base(
    "dried-shiitake-100g",
    "Dried Shiitake",
    "dried",
    380,
    329,
    "100g",
    150,
    {
      rating: 4.8,
      reviews: 53,
      shortDescription: "Sun-dried for deep umami. Rehydrate in 20 minutes.",
    },
  ),
  base(
    "lions-mane-powder-100g",
    "Lion's Mane Extract Powder",
    "dried",
    690,
    599,
    "100g",
    70,
    {
      featured: true,
      rating: 4.9,
      reviews: 41,
      benefits: ["10:1 dual extract", "No fillers", "Supports focus & memory"],
    },
  ),
  base(
    "oyster-powder-150g",
    "Oyster Mushroom Powder",
    "dried",
    420,
    359,
    "150g",
    0,
    { rating: 4.4, reviews: 22 },
  ),
  base(
    "gourmet-mix-box",
    "Gourmet Mushroom Mix Box",
    "oyster",
    620,
    549,
    "750g",
    35,
    {
      bestSeller: true,
      rating: 4.9,
      reviews: 129,
      shortDescription: "A chef-curated selection of four seasonal varieties.",
    },
  ),
  base(
    "shiitake-mushroom-500g",
    "Shiitake Mushroom (Family Pack)",
    "shiitake",
    580,
    499,
    "500g",
    40,
    { rating: 4.7, reviews: 37 },
  ),
];

export const testimonials = [
  {
    id: 1,
    name: "Anjali Menon",
    role: "Home Chef, Bengaluru",
    quote:
      "The oyster mushrooms arrive cold, clean and impossibly fresh. My family notices the difference every single week.",
    rating: 5,
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Restaurant Owner",
    quote:
      "Consistent quality and reliable delivery windows. Our kitchen has not looked elsewhere in 14 months.",
    rating: 5,
  },
  {
    id: 3,
    name: "Dr. Meera Iyer",
    role: "Nutritionist",
    quote:
      "I recommend their lion's mane and shiitake to clients. Traceable, organic and genuinely fresh.",
    rating: 5,
  },
];

export const blogPosts = [
  {
    id: 1,
    slug: "how-to-store-mushrooms",
    title: "How to Store Mushrooms So They Last Twice as Long",
    excerpt:
      "The paper bag trick, the fridge drawer myth, and why washing early is a mistake.",
    date: "2026-02-18",
    author: "FungiFresh Team",
    image: img("blog-storage"),
    tag: "Storage",
  },
  {
    id: 2,
    slug: "lions-mane-benefits",
    title: "Lion's Mane: What the Research Actually Says",
    excerpt:
      "A balanced look at beta-glucans, nerve growth factor and cognitive health claims.",
    date: "2026-02-09",
    author: "Dr. Meera Iyer",
    image: img("blog-lions"),
    tag: "Nutrition",
  },
  {
    id: 3,
    slug: "indoor-mushroom-farming-101",
    title: "Indoor Mushroom Farming 101: Humidity, Light and Air",
    excerpt:
      "The three variables that decide whether your grow succeeds — and the ranges to target.",
    date: "2026-01-30",
    author: "FungiFresh Farm",
    image: img("blog-farming"),
    tag: "Farming",
  },
];

export const galleryImages = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  src: img(`gallery-${i + 1}`, 600, 600),
  alt: `Inside the FungiFresh farm — grow room view ${i + 1}`,
}));
