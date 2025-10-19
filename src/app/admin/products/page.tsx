import Link from "next/link";
import { catalogProducts } from "@/data/products";

type ProductRow = {
    id: string;
    title: string;
    price: string;
    rating: number;
    reviews: number;
    tags: string[];
    badge?: string;
};

const products: ProductRow[] = catalogProducts.map(({ id, title, price, rating, reviews, tags, badge }) => ({
    id,
    title,
    price,
    rating,
    reviews,
    tags,
    badge,
}));

export default function AdminProductsPage() {
    return (
        <main className="flex flex-1 flex-col">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Products</p>
                        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Catalogue management</h1>
                        <p className="mt-2 max-w-2xl text-sm text-slate-600">
                            Launch new assets, manage pricing, and highlight featured drops across the marketplace.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                        <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 font-medium text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600">
                            <span className="material-symbols-outlined text-base">sort</span>
                            Sort
                        </button>
                        <Link
                            className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-4 py-2 font-semibold text-white transition hover:bg-indigo-600"
                            href="/admin/products/new"
                        >
                            <span className="material-symbols-outlined text-base">add</span>
                            New product
                        </Link>
                    </div>
                </div>
            </header>

            <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-12">
                <div className="grid gap-4 sm:grid-cols-3">
                    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Live products</div>
                        <div className="mt-3 text-3xl font-semibold text-slate-900">{products.length}</div>
                        <div className="mt-1 text-xs text-emerald-600">+3 launched this week</div>
                    </article>
                    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Featured</div>
                        <div className="mt-3 text-3xl font-semibold text-slate-900">
                            {products.filter((product) => product.badge === "Featured").length}
                        </div>
                        <div className="mt-1 text-xs text-indigo-600">Spotlight placements</div>
                    </article>
                    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Average rating</div>
                        <div className="mt-3 text-3xl font-semibold text-slate-900">
                            {(products.reduce((total, product) => total + product.rating, 0) / products.length).toFixed(1)}
                        </div>
                        <div className="mt-1 text-xs text-emerald-500">Customer satisfaction</div>
                    </article>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <h2 className="text-base font-semibold text-slate-900">Product catalogue</h2>
                        <div className="flex flex-wrap gap-2 text-xs">
                            <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 font-semibold text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600">
                                <span className="material-symbols-outlined text-sm">filter_list</span>
                                Filters
                            </button>
                            <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 font-semibold text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600">
                                <span className="material-symbols-outlined text-sm">download</span>
                                Export JSON
                            </button>
                        </div>
                    </div>
                    <div className="mt-6 overflow-hidden rounded-2xl border border-slate-100">
                        <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
                            <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                <tr>
                                    <th className="px-4 py-3">Product</th>
                                    <th className="px-4 py-3">Pricing</th>
                                    <th className="px-4 py-3">Performance</th>
                                    <th className="px-4 py-3">Tags</th>
                                    <th className="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-600">
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td className="px-4 py-4">
                                            <div className="font-semibold text-slate-900">{product.title}</div>
                                            <div className="text-xs text-slate-500 uppercase tracking-[0.3em]">{product.id}</div>
                                        </td>
                                        <td className="px-4 py-4 font-medium text-slate-900">{product.price}</td>
                                        <td className="px-4 py-4 text-sm">
                                            <span className="font-medium text-slate-900">{product.rating.toFixed(1)}</span>
                                            <span className="text-xs text-slate-500"> · {product.reviews} reviews</span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex flex-wrap gap-2">
                                                {product.tags.map((tag) => (
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600" key={`${product.id}-${tag}`}>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-right text-sm">
                                            <div className="inline-flex items-center gap-2">
                                                <Link
                                                    className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600"
                                                    href={`/products/${product.id}`}
                                                >
                                                    <span className="material-symbols-outlined text-sm">visibility</span>
                                                    Preview
                                                </Link>
                                                <Link
                                                    className="inline-flex items-center gap-1 rounded-full border border-transparent bg-slate-900 px-3 py-1 text-xs font-semibold text-white transition hover:-translate-y-0.5"
                                                    href={`/admin/products/${product.id}/edit`}
                                                >
                                                    <span className="material-symbols-outlined text-sm">edit</span>
                                                    Edit
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </main>
    );
}
