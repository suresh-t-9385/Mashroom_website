import SEO from "../components/seo/SEO";

export default function LegalPage({
  title,
  description,
  path,
  updated,
  sections,
}) {
  return (
    <>
      <SEO title={title} description={description} path={path} />
      <div className="container-page section max-w-3xl">
        <h1 className="text-3xl font-bold text-brand-900">{title}</h1>
        <p className="mt-2 text-sm text-earth-500">Last updated: {updated}</p>
        <div className="mt-10 space-y-8">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-xl font-semibold text-earth-900">
                {s.heading}
              </h2>
              {s.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="mt-3 text-sm leading-relaxed text-earth-700"
                >
                  {p}
                </p>
              ))}
              {s.bullets && (
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-earth-700">
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
