"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import Notify from "@/components/common/Notification";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/api-client";
import type { Product, ProductListResponse } from "@/types/product";

type BannerState = { text: string; type: "success" | "error" } | null;

function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    }).format(value);
}

export default function AdminProductsPage() {
    const { token } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [banner, setBanner] = useState<BannerState>(null);
    const [workingProductId, setWorkingProductId] = useState<string | null>(null);

    const fetchProducts = useCallback(async () => {
        if (!token) return;
        setLoading(true);
        setError(null);
        try {
            const response = await apiRequest<ProductListResponse>('/products', {
                query: { limit: 200, page: 1 },
                token,
            });
            setProducts(response.data);
        } catch (requestError) {
            const message = requestError instanceof Error ? requestError.message : 'Unable to load products';
            setError(message);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const liveCount = useMemo(() => products.filter((product) => product.published).length, [products]);
    const draftCount = useMemo(() => products.filter((product) => !product.published).length, [products]);
    const totalInventory = useMemo(
        () => products.reduce((total, product) => total + (product.inventory ?? 0), 0),
        [products]
    );

    const showBanner = useCallback((state: BannerState) => {
        setBanner(state);
        if (state) {
            setTimeout(() => setBanner(null), 3000);
        }
    }, []);

    const handleTogglePublish = async (product: Product) => {
        if (!token) return;
        setWorkingProductId(product._id);
        try {
            const updated = await apiRequest<Product>(`/products/${product._id}/publish`, {
                method: "PATCH",
                token,
            });
            setProducts((current) => current.map((item) => (item._id === updated._id ? updated : item)));
            showBanner({ text: `${updated.name} is now ${updated.published ? "live" : "draft"}.`, type: "success" });
        } catch (actionError) {
            const message = actionError instanceof Error ? actionError.message : "Unable to update product";
            showBanner({ text: message, type: "error" });
        } finally {
            setWorkingProductId(null);
        }
    };

    const handleDelete = async (product: Product) => {
        if (!token) return;
        const confirmation = window.confirm(`Delete ${product.name}? This cannot be undone.`);
        if (!confirmation) return;
        setWorkingProductId(product._id);
        try {
            await apiRequest(`/products/${product._id}`, {
                method: "DELETE",
                token,
            });
            setProducts((current) => current.filter((item) => item._id !== product._id));
            showBanner({ text: `${product.name} deleted`, type: "success" });
        } catch (actionError) {
            const message = actionError instanceof Error ? actionError.message : "Unable to delete product";
            showBanner({ text: message, type: "error" });
        } finally {
            setWorkingProductId(null);
        }
    };

    return (
        <main className="flex flex-1 flex-col">
            {banner ? <Notify text={banner.text} type={banner.type} /> : null}
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
                        <div className="mt-3 text-3xl font-semibold text-slate-900">{liveCount}</div>
                        <div className="mt-1 text-xs text-emerald-600">{draftCount} drafts awaiting publish</div>
                    </article>
                    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Total catalogue</div>
                        <div className="mt-3 text-3xl font-semibold text-slate-900">{products.length}</div>
                        <div className="mt-1 text-xs text-indigo-600">Includes unpublished</div>
                    </article>
                    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Inventory</div>
                        <div className="mt-3 text-3xl font-semibold text-slate-900">{totalInventory}</div>
                        <div className="mt-1 text-xs text-slate-500">Available digital seats</div>
                    </article>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <h2 className="text-base font-semibold text-slate-900">Product catalogue</h2>
                        <button
                            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600"
                            onClick={fetchProducts}
                            type="button"
                        >
                            <span className="material-symbols-outlined text-sm">refresh</span>
                            Refresh
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-20 text-sm text-slate-500">Loading products…</div>
                    ) : error ? (
                        <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-5 text-sm text-rose-600">
                            {error}
                        </div>
                    ) : products.length === 0 ? (
                        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
                            No products found. Start by adding your first product.
                        </div>
                    ) : (
                        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-100">
                            <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
                                <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    <tr>
                                        <th className="px-4 py-3">Product</th>
                                        <th className="px-4 py-3">Pricing</th>
                                        <th className="px-4 py-3">Inventory</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Created</th>
                                        <th className="px-4 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-slate-600">
                                    {products.map((product) => (
                                        <tr key={product._id}>
                                            <td className="px-4 py-4">
                                                <div className="font-semibold text-slate-900">{product.name}</div>
                                                <div className="text-xs text-slate-500">Slug: {product.slug}</div>
                                            </td>
                                            <td className="px-4 py-4 font-semibold text-slate-900">
                                                {formatCurrency(product.price)}
                                            </td>
                                            <td className="px-4 py-4">{product.inventory ?? "—"}</td>
                                            <td className="px-4 py-4">
                                                <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${product.published
                                                    ? "bg-emerald-50 text-emerald-600"
                                                    : "bg-slate-100 text-slate-600"
                                                    }`}>
                                                    <span className="material-symbols-outlined text-sm">
                                                        {product.published ? "visibility" : "visibility_off"}
                                                    </span>
                                                    {product.published ? "Published" : "Draft"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-xs text-slate-500">
                                                {new Date(product.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-4 text-right text-xs">
                                                <div className="flex flex-wrap justify-end gap-2">
                                                    <Link
                                                        className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 font-semibold text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600"
                                                        href={`/products/${product.slug}`}
                                                    >
                                                        <span className="material-symbols-outlined text-sm">visibility</span>
                                                        View
                                                    </Link>
                                                    <Link
                                                        className="inline-flex items-center gap-1 rounded-full border border-transparent bg-slate-900 px-3 py-1 font-semibold text-white transition hover:-translate-y-0.5"
                                                        href={`/admin/products/${product._id}`}
                                                    >
                                                        <span className="material-symbols-outlined text-sm">edit</span>
                                                        Edit
                                                    </Link>
                                                    <button
                                                        className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 font-semibold text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600"
                                                        disabled={workingProductId === product._id}
                                                        onClick={() => handleTogglePublish(product)}
                                                        type="button"
                                                    >
                                                        <span className="material-symbols-outlined text-sm">
                                                            {product.published ? "visibility_off" : "publish"}
                                                        </span>
                                                        {product.published ? "Unpublish" : "Publish"}
                                                    </button>
                                                    <button
                                                        className="inline-flex items-center gap-1 rounded-full border border-transparent bg-rose-50 px-3 py-1 font-semibold text-rose-600 transition hover:bg-rose-100"
                                                        disabled={workingProductId === product._id}
                                                        onClick={() => handleDelete(product)}
                                                        type="button"
                                                    >
                                                        <span className="material-symbols-outlined text-sm">delete</span>
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
