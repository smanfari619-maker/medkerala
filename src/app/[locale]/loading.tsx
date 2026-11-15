export default function LocalePageLoading() {
  return (
    <div className="min-h-[65vh] bg-[#FAF7F2] px-4 py-12 sm:px-6 lg:px-8" aria-busy="true" role="status">
      <span className="sr-only">Loading page…</span>
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="h-3 w-32 rounded bg-[#dfe6df]" />
        <div className="mt-5 h-10 max-w-2xl rounded-lg bg-[#e8e9e2] sm:h-14" />
        <div className="mt-4 h-4 max-w-xl rounded bg-[#e8e9e2]" />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div key={item} className="overflow-hidden rounded-2xl border border-[#e5e5de] bg-white p-4">
              <div className="aspect-[1.85/1] rounded-xl bg-[#e8ece6]" />
              <div className="mt-5 h-3 w-28 rounded bg-[#e8e9e2]" />
              <div className="mt-4 h-5 rounded bg-[#e8e9e2]" />
              <div className="mt-2 h-5 w-4/5 rounded bg-[#e8e9e2]" />
              <div className="mt-4 h-3 rounded bg-[#f0f0eb]" />
              <div className="mt-2 h-3 w-3/4 rounded bg-[#f0f0eb]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
