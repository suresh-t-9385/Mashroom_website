export default function DataTable({
  columns,
  rows,
  emptyMessage = "No records found.",
}) {
  return (
    <div className="overflow-x-auto rounded-2xl ring-1 ring-earth-100">
      <table className="min-w-full divide-y divide-earth-100 bg-white text-sm">
        <thead className="bg-earth-50">
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-earth-600"
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-earth-100">
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-10 text-center text-earth-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr key={row.id ?? i} className="hover:bg-cream-50">
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className="whitespace-nowrap px-4 py-3 text-earth-800"
                  >
                    {c.render ? c.render(row) : row[c.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
