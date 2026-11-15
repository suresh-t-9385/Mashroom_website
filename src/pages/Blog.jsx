// src/pages/Blog.jsx
import SEO from "../components/seo/SEO";
import { blogPosts } from "../services/mockData";
import { formatDate } from "../utils/format";

export default function Blog() {
  return (
    <>
      <SEO
        title="Blog & Articles"
        description="Mushroom recipes, storage tips, farming insights and nutrition research from the FungiFresh team."
        path="/blog"
      />
      <div className="container-page section">
        <header className="max-w-2xl">
          <span className="eyebrow">Journal</span>
          <h1 className="mt-2 text-3xl font-bold text-brand-900 sm:text-4xl">
            Articles & recipes
          </h1>
        </header>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.id} className="card overflow-hidden">
              <img
                src={post.image}
                alt=""
                width="400"
                height="240"
                loading="lazy"
                className="aspect-[5/3] w-full object-cover"
              />
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                  {post.tag}
                </p>
                <h2 className="mt-2 text-lg font-semibold leading-snug text-earth-900">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-earth-600">{post.excerpt}</p>
                <p className="mt-4 text-xs text-earth-500">
                  {formatDate(post.date)} · {post.author}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
