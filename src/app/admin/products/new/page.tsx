import Link from "next/link";

const categories = ["Illustrations", "Patterns", "UI Kits", "Mockups", "Branding", "Animation", "Typography"];
const licenseOptions = ["Personal", "Commercial", "Extended"];

export default function AdminNewProductPage() {

    const handleSubmit = async (formData: FormData) => {
        'use server';
        const name = formData.get('name') as string;
        const slug = formData.get('slug') as string;
        const description = formData.get('description') as string;
        const heroImage = formData.get('heroImage') as string;
        const galleryImages = (formData.get('galleryImages') as string).split('\n').map(url => url.trim()).filter(url => url);
        const highlights = (formData.get('highlights') as string).split('\n').map(item => item.trim()).filter(item => item);
        const price = formData.get('price') as string;
        const categories = Array.from(formData.getAll('categories')) as string[];
        const licenseTiers = Array.from(formData.getAll('licenseTiers')) as string[];
        const tags = (formData.get('tags') as string).split(',').map(tag => tag.trim()).filter(tag => tag);
        const badge = formData.get('badge') as string;
        const productData = {
            name,
            slug,
            description,
            heroImage,
            galleryImages,
            highlights,
            price,
            categories,
            licenseTiers,
            tags,
            badge
        };
        const submitProduct = async (data: typeof productData) => {
            const response = await fetch('http://localhost:3002/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error('Failed to submit product, ' + response.statusText);
            }
        };
        console.log('Submitting product data:', productData);
        try {
            await submitProduct(productData);
            console.log('Product submitted successfully');
        } catch (error) {
            console.error('Error submitting product:', error);
        }
    };

    return (
        <main className="flex flex-1 flex-col">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Products</p>
                        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Create new product</h1>
                        <p className="mt-2 max-w-2xl text-sm text-slate-600">
                            Publish a new digital asset to the storefront catalogue. Fill in core metadata and upload preview art.
                        </p>
                    </div>
                    <Link
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600"
                        href="/admin/products"
                    >
                        <span className="material-symbols-outlined text-base">arrow_back</span>
                        Back to products
                    </Link>
                </div>
            </header>

            <section className="mx-auto w-full max-w-4xl px-6 py-12">
                <form action={handleSubmit} className="space-y-10">
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                        <h2 className="text-base font-semibold text-slate-900">Basics</h2>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <label className="flex flex-col gap-2 text-sm text-slate-600">
                                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Product name</span>
                                <input
                                    name="name"
                                    className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                    placeholder="Aurora Abstract Kit"
                                    required
                                />
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-600">
                                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Slug</span>
                                <input
                                    name="slug"
                                    className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                    placeholder="aurora-abstract-kit"
                                    required
                                />
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-600 md:col-span-2">
                                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Short description</span>
                                <textarea
                                    name="description"
                                    className="min-h-24 rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                    placeholder="Summarize key value props for the storefront card."
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
                                    name="heroImage"
                                    className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                    placeholder="https://"
                                    required
                                    type="url"
                                />
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-600 md:col-span-2">
                                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Gallery images</span>
                                <textarea
                                    name="galleryImages"
                                    className="min-h-24 rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                    placeholder="Add one image URL per line"
                                    rows={4}
                                />
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-600 md:col-span-2">
                                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Highlights (bullet list)</span>
                                <textarea
                                    name="highlights"
                                    className="min-h-24 rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                    placeholder="Each line becomes a highlight"
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
                                    name="price"
                                    className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                    placeholder="$42"
                                    required
                                />
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-600">
                                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Category</span>
                                <select name="categories" className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100">
                                    {categories.map((category) => (
                                        <option key={category}>{category}</option>
                                    ))}
                                </select>
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-600">
                                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">License tiers</span>
                                <select name="licenseTiers" className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100" multiple>
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
                                    name="tags"
                                    className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                    placeholder="Comma separated"
                                />
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-600">
                                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Badge</span>
                                <select name="badge" className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100">
                                    <option value="">None</option>
                                    <option value="Featured">Featured</option>
                                    <option value="Best Seller">Best Seller</option>
                                </select>
                            </label>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <Link
                            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-rose-200 hover:text-rose-600"
                            href="/admin/products"
                        >
                            <span className="material-symbols-outlined text-base">close</span>
                            Discard draft
                        </Link>
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
                                <span className="material-symbols-outlined text-base">publish</span>
                                Publish product
                            </button>
                        </div>
                    </div>
                </form>
            </section>
        </main>
    );
}
