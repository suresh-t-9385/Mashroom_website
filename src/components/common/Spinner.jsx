export default function Spinner({ label = "Loading…", fullPage = false }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={
        fullPage
          ? "flex min-h-[60vh] flex-col items-center justify-center gap-3"
          : "flex items-center justify-center gap-3 py-12"
      }
    >
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-brand-200 border-t-brand-700" />
      <span className="text-sm text-earth-600">{label}</span>
    </div>
  );
}
