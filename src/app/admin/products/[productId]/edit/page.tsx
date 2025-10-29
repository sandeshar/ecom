"use client";

import Notify from "@/components/common/Notification";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/api-client";
import { API_BASE_URL } from "@/lib/config";
import type { Product } from "@/types/product";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";

type AdminEditProductPageProps = {
    params: {
        productId: string;
    };
};

const categories = ["Illustrations", "Patterns", "UI Kits", "Mockups", "Branding", "Animation", "Typography"];
const licenseOptions = ["Personal", "Commercial", "Extended"];

const inputClass = "rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100";
const labelClass = "text-xs font-semibold uppercase tracking-[0.3em] text-slate-400";

const resolveImageUrl = (value?: string | null) => {
    if (!value) return null;
    if (value.startsWith("http://") || value.startsWith("https://")) return value;
    return `${API_BASE_URL}/uploads/${value}`;
};

export default function AdminEditProductPage({ params }: AdminEditProductPageProps) {
    const { token } = useAuth();
    const router = useRouter();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [notification, setNotification] = useState<{ text: string; type: "success" | "error" } | null>(null);
    const [heroImagePreview, setHeroImagePreview] = useState<string | null>(null);
    const [existingGallery, setExistingGallery] = useState<string[]>([]);
    const [newGalleryPreviews, setNewGalleryPreviews] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const fetched = await apiRequest<Product>(`/products/${params.productId}`, { token });
                setProduct(fetched);
                setHeroImagePreview(resolveImageUrl(fetched.heroImage));
                setExistingGallery(fetched.galleryImages ?? []);
            } catch (requestError) {
                const message = requestError instanceof Error ? requestError.message : "Unable to load product";
                setError(message);
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [params.productId, token]);

    useEffect(() => {
        return () => {
            newGalleryPreviews.forEach((preview) => URL.revokeObjectURL(preview));
        };
    }, [newGalleryPreviews]);

    const handleHeroImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setHeroImagePreview(previewUrl);
        }
    };

    const handleGalleryImagesChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const previews = Array.from(files).map((file) => URL.createObjectURL(file));
            setNewGalleryPreviews(previews);
        }
    };

    const removeExistingGalleryImage = (filename: string) => {
        setExistingGallery((current) => current.filter((item) => item !== filename));
    };

    const resolvedExistingGallery = useMemo(
        () => existingGallery.map((filename) => ({ filename, url: resolveImageUrl(filename) })),
        [existingGallery]
    );

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!product) return;
        if (!token) {
            setNotification({ text: "Authentication required", type: "error" });
            return;
        }

        setIsSubmitting(true);
        setNotification(null);

        const formData = new FormData(event.currentTarget);
        formData.append("existingGalleryImages", JSON.stringify(existingGallery));
        if (!formData.get("published")) {
            formData.append("published", "false");
        }

        try {
            const updated = await apiRequest<Product>(`/products/${product._id}`, {
                method: "PUT",
                data: formData,
                token,
                isFormData: true,
            });
            setProduct(updated);
            setHeroImagePreview(resolveImageUrl(updated.heroImage));
            setExistingGallery(updated.galleryImages ?? []);
            setNewGalleryPreviews([]);
            setNotification({ text: "Product updated successfully", type: "success" });
        } catch (submissionError) {
            const message = submissionError instanceof Error ? submissionError.message : "Unable to update product";
            setNotification({ text: message, type: "error" });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">Loading product…</div>;
    }

    if (error || !product) {
        return (
            <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
                <div className="max-w-md space-y-4">
                    <span className="material-symbols-outlined text-4xl text-rose-500">error</span>
                    <h1 className="text-2xl font-semibold text-slate-900">Unable to load product</h1>
                    <p className="text-sm text-slate-600">{error ?? "The product may have been removed."}</p>
                    <button
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600"
                        onClick={() => router.push("/admin/products")}
                        type="button"
                    >
                        <span className="material-symbols-outlined text-base">arrow_back</span>
                        Back to catalogue
                    </button>
                </div>
            </main>
        );
    }

    const tagsValue = product.tags.join(", ");
    const highlightsValue = product.highlights.join("\n");
    const galleryUploadsPreview = newGalleryPreviews.map((preview, index) => ({ id: `${preview}-${index}`, preview }));

    return (
        <main className="flex flex-1 flex-col">
            {notification ? <Notify text={notification.text} type={notification.type} /> : null}
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
                <form className="space-y-10" onSubmit={handleSubmit}>
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                        <h2 className="text-base font-semibold text-slate-900">Basics</h2>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <label className="flex flex-col gap-2 text-sm text-slate-600">
                                <span className={labelClass}>Product name</span>
                                <input name="name" className={inputClass} defaultValue={product.name} required />
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-600">
                                <span className={labelClass}>Slug</span>
                                <input name="slug" className={inputClass} defaultValue={product.slug} required />
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-600 md:col-span-2">
                                <span className={labelClass}>Short description</span>
                                <textarea name="description" className={`min-h-24 ${inputClass}`} defaultValue={product.description} rows={3} required />
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-600">
                                <span className={labelClass}>SKU</span>
                                <input name="sku" className={inputClass} defaultValue={product.sku ?? ""} />
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-600">
                                <span className={labelClass}>Inventory</span>
                                <input name="inventory" type="number" min="0" className={inputClass} defaultValue={product.inventory ?? 0} />
                            </label>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                        <h2 className="text-base font-semibold text-slate-900">Media & content</h2>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <label className="flex flex-col gap-2 text-sm text-slate-600 md:col-span-2">
                                <span className={labelClass}>Hero image</span>
                                <input type="file" name="heroImage" accept="image/*" className={inputClass} onChange={handleHeroImageChange} />
                                {heroImagePreview ? (
                                    <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200">
                                        <img alt="Hero preview" className="h-48 w-full object-cover" src={heroImagePreview} />
                                    </div>
                                ) : null}
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-600 md:col-span-2">
                                <span className={labelClass}>Gallery images</span>
                                <input type="file" name="galleryImages" accept="image/*" multiple className={inputClass} onChange={handleGalleryImagesChange} />
                                {resolvedExistingGallery.length > 0 ? (
                                    <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
                                        {resolvedExistingGallery.map(({ filename, url }) => (
                                            <div key={filename} className="relative overflow-hidden rounded-xl border border-slate-200">
                                                <img alt={filename} className="h-32 w-full object-cover" src={url ?? ""} />
                                                <button
                                                    type="button"
                                                    className="absolute right-1 top-1 rounded-full bg-rose-500/90 p-1 text-white transition hover:bg-rose-600"
                                                    onClick={() => removeExistingGalleryImage(filename)}
                                                >
                                                    <span className="material-symbols-outlined text-xs">close</span>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : null}
                                {galleryUploadsPreview.length > 0 ? (
                                    <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
                                        {galleryUploadsPreview.map((item) => (
                                            <div key={item.id} className="overflow-hidden rounded-xl border border-indigo-200">
                                                <img alt="New upload" className="h-32 w-full object-cover" src={item.preview} />
                                            </div>
                                        ))}
                                    </div>
                                ) : null}
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-600 md:col-span-2">
                                <span className={labelClass}>Highlights (bullet list)</span>
                                <textarea name="highlights" className={`min-h-24 ${inputClass}`} defaultValue={highlightsValue} rows={4} />
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-600 md:col-span-2">
                                <span className={labelClass}>Digital asset URL</span>
                                <input name="digitalAssetUrl" type="url" className={inputClass} defaultValue={product.digitalAssetUrl ?? ""} placeholder="https://cdn.example.com/file.zip" />
                            </label>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                        <h2 className="text-base font-semibold text-slate-900">Commerce</h2>
                        <div className="mt-6 grid gap-6 md:grid-cols-3">
                            <label className="flex flex-col gap-2 text-sm text-slate-600">
                                <span className={labelClass}>Base price</span>
                                <input name="price" className={inputClass} defaultValue={product.price} required />
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-600">
                                <span className={labelClass}>Category</span>
                                <select name="categories" className={inputClass} defaultValue={product.categories[0] ?? categories[0]}>
                                    {categories.map((category) => (
                                        <option key={category}>{category}</option>
                                    ))}
                                </select>
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-600">
                                <span className={labelClass}>License tiers</span>
                                <select name="licenseTiers" className={inputClass} defaultValue={product.licenseTiers} multiple>
                                    {licenseOptions.map((license) => (
                                        <option key={license}>{license}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <label className="flex flex-col gap-2 text-sm text-slate-600">
                                <span className={labelClass}>Tags</span>
                                <input name="tags" className={inputClass} defaultValue={tagsValue} placeholder="Comma separated" />
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-600">
                                <span className={labelClass}>Badge</span>
                                <select name="badge" className={inputClass} defaultValue={product.badge ?? ""}>
                                    <option value="">None</option>
                                    <option value="Featured">Featured</option>
                                    <option value="Best Seller">Best Seller</option>
                                </select>
                            </label>
                            <label className="flex items-center gap-3 text-sm text-slate-600">
                                <input className="size-4 rounded border-slate-300 text-indigo-500 focus:ring-indigo-200" type="checkbox" name="published" defaultChecked={product.published} value="true" />
                                <span>Published</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            className="inline-flex items-center gap-2 rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:border-rose-300 hover:text-rose-700"
                            onClick={() => router.push("/admin/products")}
                            type="button"
                        >
                            <span className="material-symbols-outlined text-base">close</span>
                            Cancel
                        </button>
                        <div className="flex items-center gap-3">
                            <button
                                className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-60"
                                disabled={isSubmitting}
                                type="submit"
                            >
                                <span className="material-symbols-outlined text-base">task_alt</span>
                                {isSubmitting ? "Saving…" : "Save changes"}
                            </button>
                        </div>
                    </div>
                </form>
            </section>
        </main>
    );
}
