import Link from "next/link";
import type { CatalogProduct } from "@/data/products";

const MAX_STARS = 5;

type ProductListingCardProps = {
    product: CatalogProduct;
};

export default function ProductListingCard({ product }: ProductListingCardProps) {
    const starIcons = Array.from({ length: MAX_STARS }, (_, index) => {
        const value = product.rating - index;

        if (value >= 1) return "star";
        if (value >= 0.5) return "star_half";
        return "star_outline";
    });

    return (
        <article className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
            <div className="relative">
                <div
                    className="aspect-[3/2] w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${product.image}')` }}
                />
                {product.badge ? (
                    <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-600 shadow-sm">
                        {product.badge}
                    </span>
                ) : null}
                <button
                    aria-label="Add to favourites"
                    className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-full bg-white/80 text-slate-600 transition-transform hover:scale-110 hover:text-indigo-500"
                >
                    <span className="material-symbols-outlined text-lg">favorite</span>
                </button>
            </div>

            <div className="flex flex-1 flex-col gap-4 p-6">
                <div className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                        <Link className="text-lg font-semibold text-slate-900 transition hover:text-indigo-600" href={`/products/${product.id}`}>
                            {product.title}
                        </Link>
                        <span className="text-base font-semibold text-indigo-600">{product.price}</span>
                    </div>
                    <p className="text-sm text-slate-600">{product.description}</p>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500">
                    <div className="flex items-center gap-1 text-amber-500">
                        {starIcons.map((icon, index) => (
                            <span className="material-symbols-outlined text-sm" key={`${product.id}-star-${index}`}>
                                {icon}
                            </span>
                        ))}
                    </div>
                    <span>
                        {product.rating.toFixed(1)} · {product.reviews} reviews
                    </span>
                </div>

                <div className="mt-auto flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-600"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                    <Link
                        className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-indigo-500 hover:text-indigo-500"
                        href={`/products/${product.id}`}
                    >
                        <span className="material-symbols-outlined text-sm">visibility</span>
                        Preview
                    </Link>
                    <button className="flex items-center gap-2 rounded-full bg-indigo-500 px-4 py-2 text-xs font-semibold text-white transition-transform hover:-translate-y-0.5">
                        <span className="material-symbols-outlined text-sm">download</span>
                        Download
                    </button>
                </div>
            </div>
        </article>
    );
}
