import Link from "next/link";
import { notFound } from "next/navigation";
import { catalogProducts, productDetails } from "@/data/products";

type AdminEditProductPageProps = {
    params: {
        productId: string;
    };
};

const categories = ["Illustrations", "Patterns", "UI Kits", "Mockups", "Branding", "Animation", "Typography"];
const licenseOptions = ["Personal", "Commercial", "Extended"];

export default function AdminEditProductPage({ params }: AdminEditProductPageProps) {
    const product = catalogProducts.find((item) => item.id === params.productId);
    if (!product) {
        return notFound();
    }

    const detail = productDetails[params.productId];
    const heroImage = detail?.heroImage ?? product.image;
    const gallery = detail?.gallery ?? [product.image];
    const highlights = detail?.highlights ?? [];
    const tagsValue = product.tags.join(", ");

    return (
        <main className="flex flex-1 flex-col">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Products</p>
                        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Edit product</h1>
                        <p className="mt-2 max-w-2xl text-sm text-slate-600">
                            Update pricing, assets, metadata, and merchandising placements for this listing.
                        </p>
                    </div>
                    <Link
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600"
                        href="/admin/products"
                    >
                        <span className="material-symbols-outlined text-base">arrow_back</span>
                        Back to catalogue
                    </Link>
                </div>
            </header>

            <section className="mx-auto w-full max-w-4xl px-6 py-12">
                <form className="space-y-10">
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                        <h2 className="text-base font-semibold text-slate-900">Basics</h2>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <label className="flex flex-col gap-2 text-sm text-slate-600">
                                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Product name</span>
                                <input
                                    className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                    defaultValue={product.title}
                                    required
                                />
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-600">
                                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Slug</span>
                                <input
                                    className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                    defaultValue={product.id}
                                    required
                                />
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-600 md:col-span-2">
                                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Short description</span>
                                <textarea
                                    className="min-h-24 rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                    defaultValue={product.description}
                                    rows={3}
                                    required
                                />
                            </label>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                        <h2 className="text-base font-semibold text-slate-900">Media & content</h2>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <label className="flex flex-col gap-2 text-sm text-slate-600 md:col-span-2">
                                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Hero image URL</span>
                                <input
                                    className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                    defaultValue={heroImage}
                                    required
                                    type="url"
                                />
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-600 md:col-span-2">
                                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Gallery images</span>
                                <textarea
                                    className="min-h-24 rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                    defaultValue={gallery.join("\n")}
                                    rows={4}
                                />
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-600 md:col-span-2">
                                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Highlights (bullet list)</span>
                                <textarea
                                    className="min-h-24 rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                    defaultValue={highlights.join("\n")}
                                    rows={4}
                                />
                            </label>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                        <h2 className="text-base font-semibold text-slate-900">Commerce</h2>
                        <div className="mt-6 grid gap-6 md:grid-cols-3">
                            <label className="flex flex-col gap-2 text-sm text-slate-600">
                                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Base price</span>
                                <input
                                    className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                    defaultValue={product.price}
                                    required
                                />
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-600">
                                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Category</span>
                                <select
                                    className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                    defaultValue={categories.find((category) => product.tags.includes(category)) ?? "Illustrations"}
                                >
                                    {categories.map((category) => (
                                        <option key={category}>{category}</option>
                                    ))}
                                </select>
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-600">
                                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">License tiers</span>
                                <select
                                    className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                    defaultValue={["Commercial"]}
                                    multiple
                                >
                                    {licenseOptions.map((license) => (
                                        <option key={license}>{license}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <label className="flex flex-col gap-2 text-sm text-slate-600">
                                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Tags</span>
                                <input
                                    className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                    defaultValue={tagsValue}
                                />
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-600">
                                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Badge</span>
                                <select
                                    className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                    defaultValue={product.badge ?? ""}
                                >
                                    <option value="">None</option>
                                    <option value="Featured">Featured</option>
                                    <option value="Best Seller">Best Seller</option>
                                </select>
                            </label>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            className="inline-flex items-center gap-2 rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:border-rose-300 hover:text-rose-700"
                            type="button"
                        >
                            <span className="material-symbols-outlined text-base">delete</span>
                            Archive product
                        </button>
                        <div className="flex items-center gap-3">
                            <button
                                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600"
                                type="button"
                            >
                                <span className="material-symbols-outlined text-base">draft</span>
                                Save draft
                            </button>
                            <button
                                className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
                                type="submit"
                            >
                                <span className="material-symbols-outlined text-base">task_alt</span>
                                Save changes
                            </button>
                        </div>
                    </div>
                </form>
            </section>
        </main>
    );
}
