"use client";

import Notify from "@/components/common/Notification";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

const categories = ["Illustrations", "Patterns", "UI Kits", "Mockups", "Branding", "Animation", "Typography"];
const licenseOptions = ["Personal", "Commercial", "Extended"];

const inputClass = "rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100";
const labelClass = "text-xs font-semibold uppercase tracking-[0.3em] text-slate-400";

export default function AdminNewProductPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notification, setNotification] = useState<{ text: string; type: "success" | "error" } | null>(null);
    const [heroImagePreview, setHeroImagePreview] = useState<string | null>(null);
    const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

    const handleHeroImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setHeroImagePreview(URL.createObjectURL(file));
        }
    };

    const handleGalleryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const previews = Array.from(files).map(file => URL.createObjectURL(file));
            setGalleryPreviews(previews);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setNotification(null);

        const formData = new FormData(e.currentTarget);

        console.log("Submitting product:", Object.fromEntries(formData.entries()));

        try {
            const response = await fetch('http://localhost:3002/products', {
                method: 'POST',
                body: formData  // Send FormData directly
            });

            if (response.ok) {
                setNotification({ text: "Product created successfully!", type: "success" });
                // setTimeout(() => router.push('/admin/products'), 1500);
            } else {
                const error = await response.json().catch(() => ({}));
                setNotification({ text: error.message || "Failed to create product", type: "error" });
            }
        } catch {
            setNotification({ text: "Error submitting product. Please check your connection.", type: "error" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="flex flex-1 flex-col">
            {notification && <Notify text={notification.text} type={notification.type} />}
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
                <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                        <h2 className="text-base font-semibold text-slate-900">Basics</h2>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <label className="flex flex-col gap-2 text-sm text-slate-600">
                                <span className={labelClass}>Product name</span>
                                <input name="name" className={inputClass} placeholder="Aurora Abstract Kit" required />
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-600">
                                <span className={labelClass}>Slug</span>
                                <input name="slug" className={inputClass} placeholder="aurora-abstract-kit" required />
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-600 md:col-span-2">
                                <span className={labelClass}>Short description</span>
                                <textarea name="description" className={`min-h-24 ${inputClass}`} placeholder="Summarize key value props for the storefront card." rows={3} required />
                            </label>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                        <h2 className="text-base font-semibold text-slate-900">Media & content</h2>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <label className="flex flex-col gap-2 text-sm text-slate-600 md:col-span-2">
                                <span className={labelClass}>Hero image</span>
                                <input
                                    type="file"
                                    name="heroImage"
                                    accept="image/*"
                                    className={inputClass}
                                    onChange={handleHeroImageChange}
                                />
                                {heroImagePreview && (
                                    <div className="mt-3 relative rounded-2xl overflow-hidden border border-slate-200">
                                        <img src={heroImagePreview} alt="Hero preview" className="w-full h-48 object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => setHeroImagePreview(null)}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition"
                                        >
                                            <span className="material-symbols-outlined text-sm">close</span>
                                        </button>
                                    </div>
                                )}
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-600 md:col-span-2">
                                <span className={labelClass}>Gallery images (Multiple)</span>
                                <input
                                    type="file"
                                    name="galleryImages"
                                    accept="image/*"
                                    multiple
                                    className={inputClass}
                                    onChange={handleGalleryImagesChange}
                                />
                                {galleryPreviews.length > 0 && (
                                    <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {galleryPreviews.map((preview, index) => (
                                            <div key={index} className="relative rounded-xl overflow-hidden border border-slate-200">
                                                <img src={preview} alt={`Gallery ${index + 1}`} className="w-full h-32 object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => setGalleryPreviews(prev => prev.filter((_, i) => i !== index))}
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                                                >
                                                    <span className="material-symbols-outlined text-xs">close</span>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-600 md:col-span-2">
                                <span className={labelClass}>Highlights (bullet list)</span>
                                <textarea name="highlights" className={`min-h-24 ${inputClass}`} placeholder="Each line becomes a highlight" rows={4} />
                            </label>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                        <h2 className="text-base font-semibold text-slate-900">Commerce</h2>
                        <div className="mt-6 grid gap-6 md:grid-cols-3">
                            <label className="flex flex-col gap-2 text-sm text-slate-600">
                                <span className={labelClass}>Base price</span>
                                <input name="price" className={inputClass} placeholder="$42" required />
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-600">
                                <span className={labelClass}>Category</span>
                                <select name="categories" className={inputClass}>
                                    {categories.map((category) => (
                                        <option key={category}>{category}</option>
                                    ))}
                                </select>
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-600">
                                <span className={labelClass}>License tiers</span>
                                <select name="licenseTiers" className={inputClass} multiple>
                                    {licenseOptions.map((license) => (
                                        <option key={license}>{license}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <label className="flex flex-col gap-2 text-sm text-slate-600">
                                <span className={labelClass}>Tags</span>
                                <input name="tags" className={inputClass} placeholder="Comma separated" />
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-600">
                                <span className={labelClass}>Badge</span>
                                <select name="badge" className={inputClass}>
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
                                className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                <span className="material-symbols-outlined text-base">publish</span>
                                {isSubmitting ? 'Publishing...' : 'Publish product'}
                            </button>
                        </div>
                    </div>
                </form>
            </section>
        </main>
    );
}
