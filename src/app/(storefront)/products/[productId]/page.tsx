"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api-client";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/types/product";

const MAX_STARS = 5;

function getStarIcons(rating: number) {
    return Array.from({ length: MAX_STARS }, (_, index) => {
        const value = rating - index;
        if (value >= 1) return "star";
        if (value >= 0.5) return "star_half";
        return "star_outline";
    });
}

export default function ProductDetailPage() {
    const params = useParams();
    const productId = params.productId as string;
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { addToCart } = useCart();

    useEffect(() => {
        async function fetchProduct() {
            try {
                setLoading(true);
                const data = await apiRequest<Product>(`/products/${productId}`, {
                    cache: "no-store",
                });
                setProduct(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load product");
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [productId]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, 1);
            alert("Added to cart!");
        }
    };

    if (loading) {
        return (
            <main className="flex flex-1 items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="size-16 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-500" />
                    <p className="mt-4 text-sm text-slate-600">Loading product...</p>
                </div>
            </main>
        );
    }

    if (error || !product) {
        return (
            <main className="flex flex-1 items-center justify-center bg-slate-50">
                <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-center">
                    <span className="material-symbols-outlined mx-auto mb-4 text-5xl text-rose-300">error</span>
                    <p className="text-lg font-semibold text-rose-700">Product not found</p>
                    <p className="mt-2 text-sm text-rose-600">{error || "The product you're looking for doesn't exist"}</p>
                    <Link
                        href="/products"
                        className="mt-6 inline-flex items-center gap-2 rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-700"
                    >
                        <span className="material-symbols-outlined text-base">arrow_back</span>
                        Back to products
                    </Link>
                </div>
            </main>
        );
    }

    const rating = 4.7;
    const reviews = 85;
    const starIcons = getStarIcons(rating);

    return (
        <main className="flex flex-1 flex-col bg-slate-50">
            <section className="relative overflow-hidden pb-16 pt-28 text-white">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${product.heroImage}')` }}
                />
                <div className="absolute inset-0 bg-slate-950/70" />

                <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
                    <Link
                        href="/products"
                        className="group inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-white/80 backdrop-blur transition hover:border-white/40 hover:text-white"
                    >
                        <span className="material-symbols-outlined text-base transition-transform group-hover:-translate-x-1">
                            arrow_back
                        </span>
                        Marketplace
                    </Link>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-3 text-xs text-white/70">
                                <Link className="transition hover:text-white" href="/products">Products</Link>
                                <span className="text-white/30">/</span>
                                <span>{product.name}</span>
                            </div>
                            <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
                                {product.name}
                            </h1>
                            <p className="max-w-2xl text-base text-white/80 sm:text-lg">{product.description}</p>
                        </div>
                        <div className="flex flex-col items-start gap-4 rounded-3xl bg-white/10 p-6 text-white shadow-xl backdrop-blur md:text-right">
                            <div className="text-sm uppercase tracking-[0.4em] text-white/60">Price</div>
                            <div className="text-3xl font-semibold">${product.price}</div>
                            <div className="flex items-center gap-3 text-sm text-white/70">
                                <div className="flex items-center gap-1 text-amber-400">
                                    {starIcons.map((icon, index) => (
                                        <span className="material-symbols-outlined text-lg" key={`rating-${index}`}>
                                            {icon}
                                        </span>
                                    ))}
                                </div>
                                <span>
                                    {rating.toFixed(1)} · {reviews} reviews
                                </span>
                            </div>
                            <div className="flex w-full flex-col gap-3 text-sm">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5"
                                >
                                    <span className="material-symbols-outlined text-base">shopping_cart</span>
                                    Add to cart
                                </button>
                                <Link
                                    href="/checkout"
                                    className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white transition hover:border-white"
                                >
                                    <span className="material-symbols-outlined text-base">flash_on</span>
                                    Buy now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto w-full max-w-7xl px-4 pb-16 pt-12 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-[1.7fr_1fr]">
                    <div className="space-y-10">
                        {product.galleryImages && product.galleryImages.length > 0 && (
                            <div className="grid gap-4 sm:grid-cols-2">
                                {product.galleryImages.map((image, index) => (
                                    <div
                                        className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100"
                                        key={`gallery-${index}`}
                                    >
                                        <div
                                            className="aspect-[4/3] w-full bg-cover bg-center"
                                            style={{ backgroundImage: `url('${image}')` }}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="grid gap-10 rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
                            <div className="space-y-6">
                                <h2 className="text-2xl font-semibold text-slate-900">Product Details</h2>
                                {product.highlights && product.highlights.length > 0 && (
                                    <ul className="grid gap-4 sm:grid-cols-2">
                                        {product.highlights.map((highlight, index) => (
                                            <li className="flex items-start gap-3 rounded-3xl bg-slate-50 p-5 text-sm text-slate-700" key={`highlight-${index}`}>
                                                <span className="material-symbols-outlined mt-1 text-base text-indigo-500">auto_awesome</span>
                                                <span>{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {product.categories && product.categories.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900">Categories</h3>
                                    <ul className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
                                        {product.categories.map((category) => (
                                            <li
                                                className="rounded-full bg-slate-100 px-4 py-2 text-slate-700"
                                                key={category}
                                            >
                                                {category}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {product.tags && product.tags.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900">Tags</h3>
                                    <ul className="mt-4 flex flex-wrap gap-2 text-xs">
                                        {product.tags.map((tag) => (
                                            <li
                                                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-600"
                                                key={tag}
                                            >
                                                #{tag}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    <aside className="space-y-8">
                        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                            <h2 className="text-lg font-semibold text-slate-900">Product Info</h2>
                            <dl className="mt-6 space-y-4 text-sm">
                                {product.sku && (
                                    <div className="flex justify-between">
                                        <dt className="text-slate-600">SKU</dt>
                                        <dd className="font-semibold text-slate-900">{product.sku}</dd>
                                    </div>
                                )}
                                {product.inventory !== undefined && (
                                    <div className="flex justify-between">
                                        <dt className="text-slate-600">Available</dt>
                                        <dd className="font-semibold text-slate-900">{product.inventory} units</dd>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <dt className="text-slate-600">Status</dt>
                                    <dd className={`font-semibold ${product.published ? "text-emerald-600" : "text-slate-500"}`}>
                                        {product.published ? "Published" : "Draft"}
                                    </dd>
                                </div>
                                {product.licenseTiers && product.licenseTiers.length > 0 && (
                                    <div>
                                        <dt className="mb-2 text-slate-600">License Tiers</dt>
                                        <dd className="flex flex-wrap gap-2">
                                            {product.licenseTiers.map((tier) => (
                                                <span
                                                    key={tier}
                                                    className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700"
                                                >
                                                    {tier}
                                                </span>
                                            ))}
                                        </dd>
                                    </div>
                                )}
                            </dl>
                        </div>

                        {product.badge && (
                            <div className="rounded-3xl border border-indigo-200 bg-indigo-50 p-6">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-2xl text-indigo-600">workspace_premium</span>
                                    <div>
                                        <div className="text-sm font-semibold text-indigo-900">{product.badge}</div>
                                        <div className="text-xs text-indigo-600">Specially curated for you</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </aside>
                </div>
            </section>
        </main>
    );
}
