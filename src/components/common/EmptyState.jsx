export default function EmptyState({ icon: Icon, title, message, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-earth-200 bg-white px-6 py-16 text-center">
      {Icon && (
        <Icon className="mb-4 h-10 w-10 text-earth-300" aria-hidden="true" />
      )}
      <h3 className="text-lg font-semibold text-earth-900">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-earth-600">{message}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
