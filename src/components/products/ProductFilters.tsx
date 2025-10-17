import FilterGroup from "@/components/products/FilterGroup";
import { productFilters } from "@/data/products";

export default function ProductFilters() {
    return (
        <aside className="space-y-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-slate-800">Refine Results</h2>
                <button className="text-xs font-medium text-indigo-500 transition-colors hover:text-indigo-600">
                    Clear all
                </button>
            </div>

            {productFilters.map((filter) => (
                <FilterGroup filter={filter} key={filter.id} />
            ))}

            <div className="rounded-2xl bg-slate-50 px-4 py-5 text-center">
                <h3 className="text-sm font-semibold text-slate-800">Need something custom?</h3>
                <p className="mt-2 text-xs text-slate-500">
                    Work directly with our curated designers for bespoke assets tailored to your brand.
                </p>
                <button className="mt-4 inline-flex items-center justify-center rounded-full bg-indigo-500 px-4 py-2 text-xs font-semibold text-white transition-transform hover:-translate-y-0.5">
                    Request a brief
                </button>
            </div>
        </aside>
    );
}
