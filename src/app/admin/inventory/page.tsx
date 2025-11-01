"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/api-client";
import type { Product, ProductListResponse } from "@/types/product";

type InventoryStatus = "Healthy" | "Low" | "Reorder" | "Out";

type InventoryRow = {
    _id: string;
    sku: string;
    product: string;
    category: string;
    stock: number;
    status: InventoryStatus;
    price: number;
};

function getInventoryStatus(stock: number): InventoryStatus {
    if (stock === 0) return "Out";
    if (stock < 5) return "Low";
    if (stock < 15) return "Reorder";
    return "Healthy";
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    }).format(value);
}

const statusBadge: Record<InventoryStatus, string> = {
    Healthy: "bg-emerald-50 text-emerald-600",
    Low: "bg-amber-50 text-amber-600",
    Reorder: "bg-sky-50 text-sky-600",
    Out: "bg-rose-50 text-rose-600",
};

export default function AdminInventoryPage() {
    const { token } = useAuth();
    const [inventoryItems, setInventoryItems] = useState<InventoryRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchInventory = useCallback(async () => {
        if (!token) return;
        setLoading(true);
        setError(null);
        try {
            const response = await apiRequest<ProductListResponse>("/products", {
                query: { limit: 200, page: 1 },
                token,
            });

            const items = response.data.map((product: Product) => ({
                _id: product._id,
                sku: product.sku || "N/A",
                product: product.name,
                category: product.categories?.[0] || "Uncategorized",
                stock: product.inventory ?? 0,
                status: getInventoryStatus(product.inventory ?? 0),
                price: product.price,
            }));

            setInventoryItems(items);
        } catch (requestError) {
            const message = requestError instanceof Error ? requestError.message : "Unable to load inventory";
            setError(message);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchInventory();
    }, [fetchInventory]);

    const totalStock = inventoryItems.reduce((sum, item) => sum + item.stock, 0);
    const lowStockCount = inventoryItems.filter(item => item.status === "Low" || item.status === "Out").length;
    const outOfStockCount = inventoryItems.filter(item => item.status === "Out").length;
    const totalValue = inventoryItems.reduce((sum, item) => sum + (item.stock * item.price), 0);

    return (
        <main className="flex flex-1 flex-col bg-slate-50">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Inventory</p>
                        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Stock management</h1>
                        <p className="mt-2 max-w-2xl text-sm text-slate-600">
                            Keep stock levels in check and spot low items before they block orders.
                        </p>
                    </div>
                    <button
                        onClick={fetchInventory}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600"
                        type="button"
                    >
                        <span className="material-symbols-outlined text-base">refresh</span>
                        Refresh
                    </button>
                </div>
            </header>

            <section className="mx-auto w-full max-w-6xl space-y-8 px-6 py-10">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Total Stock</div>
                        <div className="mt-3 text-3xl font-semibold text-slate-900">{totalStock}</div>
                        <div className="mt-1 text-xs text-slate-500">Units across all products</div>
                    </article>
                    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Inventory Value</div>
                        <div className="mt-3 text-3xl font-semibold text-slate-900">{formatCurrency(totalValue)}</div>
                        <div className="mt-1 text-xs text-emerald-600">At current prices</div>
                    </article>
                    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Low Stock Items</div>
                        <div className="mt-3 text-3xl font-semibold text-slate-900">{lowStockCount}</div>
                        <div className="mt-1 text-xs text-amber-600">Needs attention</div>
                    </article>
                    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Out of Stock</div>
                        <div className="mt-3 text-3xl font-semibold text-slate-900">{outOfStockCount}</div>
                        <div className="mt-1 text-xs text-rose-600">Urgent restock</div>
                    </article>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                        <div>
                            <h2 className="text-base font-semibold text-slate-900">Inventory ledger</h2>
                            <p className="text-xs text-slate-500">{inventoryItems.length} products tracked</p>
                        </div>
                        <Link
                            href="/admin/products"
                            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600"
                        >
                            <span className="material-symbols-outlined text-sm">edit</span>
                            Manage products
                        </Link>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-20 text-sm text-slate-500">
                            Loading inventory...
                        </div>
                    ) : error ? (
                        <div className="m-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-5 text-sm text-rose-600">
                            {error}
                        </div>
                    ) : inventoryItems.length === 0 ? (
                        <div className="py-20 text-center text-sm text-slate-500">
                            No products with inventory tracking. Add products with inventory values.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-sm text-slate-600">
                                <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    <tr>
                                        <th className="px-6 py-3">SKU</th>
                                        <th className="px-6 py-3">Product</th>
                                        <th className="px-6 py-3">Category</th>
                                        <th className="px-6 py-3">Stock</th>
                                        <th className="px-6 py-3">Unit Price</th>
                                        <th className="px-6 py-3">Total Value</th>
                                        <th className="px-6 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {inventoryItems.map((item) => (
                                        <tr key={item._id} className="transition hover:bg-slate-50">
                                            <td className="px-6 py-4 font-semibold text-slate-900">{item.sku}</td>
                                            <td className="px-6 py-4">
                                                <p className="font-medium text-slate-900">{item.product}</p>
                                            </td>
                                            <td className="px-6 py-4 text-xs text-slate-500">{item.category}</td>
                                            <td className="px-6 py-4 font-medium text-slate-900">{item.stock}</td>
                                            <td className="px-6 py-4">{formatCurrency(item.price)}</td>
                                            <td className="px-6 py-4 font-semibold text-slate-900">
                                                {formatCurrency(item.stock * item.price)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${statusBadge[item.status]}`}>
                                                    <span className="material-symbols-outlined text-sm">
                                                        {item.status === "Out" ? "error" : item.status === "Low" ? "warning" : "check_circle"}
                                                    </span>
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {!loading && lowStockCount > 0 && (
                    <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-2xl text-amber-600">warning</span>
                            <div>
                                <h2 className="text-base font-semibold text-amber-900">Low Stock Alert</h2>
                                <p className="text-sm text-amber-700">
                                    {lowStockCount} product{lowStockCount !== 1 ? 's' : ''} running low.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
}