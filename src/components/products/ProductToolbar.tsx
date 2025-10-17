import { catalogProducts, productSortOptions } from "@/data/products";

export default function ProductToolbar() {
    return (
        <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white px-4 py-4 shadow-sm md:flex-row md:items-center md:justify-between md:px-6">
            <div className="flex items-center gap-3 text-sm text-slate-600">
                <span className="flex size-10 items-center justify-center rounded-full bg-indigo-50 text-sm font-semibold text-indigo-600">
                    {catalogProducts.length}
                </span>
                <div>
                    <p className="font-semibold text-slate-800">Available assets</p>
                    <p className="text-xs">Handpicked by our editorial team, updated weekly.</p>
                </div>
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
                <div className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-slate-500">
                    <span className="material-symbols-outlined text-lg">grid_view</span>
                    <span className="material-symbols-outlined text-lg">view_day</span>
                </div>

                <label className="flex items-center gap-3 text-sm text-slate-600">
                    Sort by
                    <div className="relative">
                        <select className="appearance-none rounded-full border border-slate-200 bg-white px-4 py-2 pr-10 text-sm font-medium text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                            {productSortOptions.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
                            <span className="material-symbols-outlined text-sm">unfold_more</span>
                        </span>
                    </div>
                </label>
            </div>
        </div>
    );
}
