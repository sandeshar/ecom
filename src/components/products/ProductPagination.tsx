const pages = [1, 2, 3, 4, 5];

export default function ProductPagination() {
    return (
        <nav aria-label="Pagination" className="flex flex-col items-center gap-4 rounded-3xl border border-slate-200 bg-white px-6 py-6 shadow-sm sm:flex-row sm:justify-between">
            <div className="text-sm text-slate-600">Showing page 1 of 12</div>
            <div className="flex items-center gap-2">
                <button className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition-colors hover:border-indigo-500 hover:text-indigo-500">
                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                    Prev
                </button>
                <div className="flex items-center gap-1">
                    {pages.map((page) => (
                        <button
                            key={page}
                            className={`size-9 rounded-full text-xs font-semibold transition-all ${page === 1
                                    ? "bg-indigo-500 text-white shadow-sm"
                                    : "bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
                                }`}
                            type="button"
                        >
                            {page}
                        </button>
                    ))}
                </div>
                <button className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition-colors hover:border-indigo-500 hover:text-indigo-500">
                    Next
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
            </div>
        </nav>
    );
}
