import { ProductFilter } from "@/data/products";

type FilterGroupProps = {
    filter: ProductFilter;
};

export default function FilterGroup({ filter }: FilterGroupProps) {
    const variant = filter.variant ?? "checkbox";

    return (
        <section aria-labelledby={`filter-${filter.id}`} className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 id={`filter-${filter.id}`} className="text-sm font-semibold text-slate-800">
                    {filter.title}
                </h3>
                <button className="text-xs font-medium text-indigo-500 transition-colors hover:text-indigo-600">
                    View all
                </button>
            </div>

            {variant === "checkbox" ? (
                <ul className="space-y-3 text-sm text-slate-600">
                    {filter.options.map((option) => (
                        <li key={option.id} className="flex items-center justify-between gap-3">
                            <label className="flex cursor-pointer items-center gap-3">
                                <input className="size-4 rounded border-slate-300 text-indigo-500 focus:ring-indigo-400" type="checkbox" />
                                <span>{option.label}</span>
                            </label>
                            {option.count ? <span className="text-xs text-slate-400">{option.count}</span> : null}
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="flex flex-wrap gap-3">
                    {filter.options.map((option) => (
                        <button
                            key={option.id}
                            className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 transition-colors hover:border-indigo-500 hover:text-indigo-500"
                            type="button"
                        >
                            <span
                                aria-hidden
                                className="size-5 rounded-full"
                                style={{ backgroundColor: option.colorHex ?? "#64748b" }}
                            />
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </section>
    );
}
