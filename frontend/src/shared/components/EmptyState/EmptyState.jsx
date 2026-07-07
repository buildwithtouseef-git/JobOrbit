export default function EmptyState({ title = "Nothing here yet", message = "There is no content to display right now." }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-slate-600 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm">{message}</p>
    </div>
  );
}
