"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import Notify from "@/components/common/Notification";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/api-client";
import type { Order, OrderListResponse } from "@/types/order";
import { PermissionGuard } from "@/components/admin/PermissionGuard";

const statusStyles: Record<Order["status"], { badge: string; text: string }> = {
    Processing: { badge: "bg-amber-50 text-amber-600", text: "text-amber-600" },
    Fulfilled: { badge: "bg-emerald-50 text-emerald-600", text: "text-emerald-600" },
    "Awaiting pickup": { badge: "bg-sky-50 text-sky-600", text: "text-sky-600" },
    "Refund requested": { badge: "bg-rose-50 text-rose-600", text: "text-rose-600" },
    Cancelled: { badge: "bg-slate-100 text-slate-500", text: "text-slate-500" },
};

const statusOptions: Order["status"][] = ["Processing", "Fulfilled", "Awaiting pickup", "Refund requested", "Cancelled"];

type OrderStats = {
    totals: {
        totalRevenue: number;
        totalOrders: number;
        avgOrderValue: number;
    };
    statusBreakdown: Array<{ _id: string; count: number }>;
};

function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    }).format(value);
}

export default function AdminOrdersPage() {
    const { token, hasPermission } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [stats, setStats] = useState<OrderStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [banner, setBanner] = useState<{ text: string; type: "success" | "error" } | null>(null);
    const [workingOrderId, setWorkingOrderId] = useState<string | null>(null);

    const fetchOrders = useCallback(async () => {
        if (!token) return;
        setLoading(true);
        setError(null);
        try {
            const [ordersResponse, statsResponse] = await Promise.all([
                apiRequest<OrderListResponse>("/orders", {
                    query: { limit: 100, page: 1 },
                    token,
                }),
                apiRequest<OrderStats>("/orders/stats", { token }),
            ]);
            setOrders(ordersResponse.data);
            setStats(statsResponse);
        } catch (requestError) {
            const message = requestError instanceof Error ? requestError.message : "Unable to load orders";
            setError(message);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const showBanner = useCallback((state: { text: string; type: "success" | "error" } | null) => {
        setBanner(state);
        if (state) {
            setTimeout(() => setBanner(null), 3000);
        }
    }, []);

    const handleUpdateStatus = async (order: Order, status: Order["status"]) => {
        if (!token) return;
        if (order.status === status) return;
        setWorkingOrderId(order._id);
        try {
            const updated = await apiRequest<Order>(`/orders/${order._id}/status`, {
                method: "PATCH",
                data: { status },
                token,
            });
            setOrders((current) => current.map((item) => (item._id === updated._id ? updated : item)));
            showBanner({ text: `${updated.orderNumber} marked as ${updated.status}`, type: "success" });
        } catch (actionError) {
            const message = actionError instanceof Error ? actionError.message : "Unable to update status";
            showBanner({ text: message, type: "error" });
        } finally {
            setWorkingOrderId(null);
        }
    };

    const markFulfilled = (order: Order) => handleUpdateStatus(order, "Fulfilled");

    const totalRevenue = stats?.totals.totalRevenue ?? 0;
    const totalOrders = stats?.totals.totalOrders ?? orders.length;
    const avgOrderValue = stats?.totals.avgOrderValue ?? 0;
    const statusBreakdown = useMemo(() => stats?.statusBreakdown ?? [], [stats]);

    return (
        <main className="flex flex-1 flex-col">
            {banner ? <Notify text={banner.text} type={banner.type} /> : null}
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Orders</p>
                        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Fulfilment command center</h1>
                        <p className="mt-2 max-w-2xl text-sm text-slate-600">
                            Track fulfilment progress, triage refund requests, and keep customers updated in real time.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                        <button
                            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 font-medium text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600"
                            onClick={fetchOrders}
                            type="button"
                        >
                            <span className="material-symbols-outlined text-base">refresh</span>
                            Refresh
                        </button>
                    </div>
                </div>
            </header>

            <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 py-12">
                <div className="grid gap-4 sm:grid-cols-3">
                    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Total revenue</div>
                        <div className="mt-3 text-3xl font-semibold text-slate-900">{formatCurrency(totalRevenue)}</div>
                        <div className="mt-1 text-xs text-slate-500">Across {totalOrders} orders</div>
                    </article>
                    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Average order value</div>
                        <div className="mt-3 text-3xl font-semibold text-slate-900">{formatCurrency(avgOrderValue)}</div>
                        <div className="mt-1 text-xs text-slate-500">Rolling 30 days</div>
                    </article>
                    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Status snapshot</div>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
                            {statusBreakdown.length === 0
                                ? "No orders yet"
                                : statusBreakdown.map((entry) => (
                                    <span key={entry._id} className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1">
                                        <span className="font-semibold text-slate-700">{entry.count}</span>
                                        {entry._id}
                                    </span>
                                ))}
                        </div>
                    </article>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <h2 className="text-base font-semibold text-slate-900">Latest orders</h2>
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                            <span className="material-symbols-outlined text-base">schedule</span>
                            Updated now
                        </div>
                    </div>
                    {loading ? (
                        <div className="flex items-center justify-center py-20 text-sm text-slate-500">Loading orders…</div>
                    ) : error ? (
                        <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-5 text-sm text-rose-600">{error}</div>
                    ) : orders.length === 0 ? (
                        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
                            No orders have been placed yet.
                        </div>
                    ) : (
                        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-100">
                            <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
                                <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    <tr>
                                        <th className="px-4 py-3">Order</th>
                                        <th className="px-4 py-3">Customer</th>
                                        <th className="px-4 py-3">Items</th>
                                        <th className="px-4 py-3">Total</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Created</th>
                                        <th className="px-4 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-slate-600">
                                    {orders.map((order) => {
                                        const styles = statusStyles[order.status];
                                        return (
                                            <tr key={order._id}>
                                                <td className="px-4 py-4 font-semibold text-slate-900">
                                                    <div>{order.orderNumber}</div>
                                                    <div className="text-xs font-normal text-slate-500">{order.paymentStatus}</div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="font-medium text-slate-900">{order.customer.name}</div>
                                                    <div className="text-xs text-slate-500">{order.customer.email}</div>
                                                </td>
                                                <td className="px-4 py-4">{order.items.length}</td>
                                                <td className="px-4 py-4 font-medium text-slate-900">{formatCurrency(order.total)}</td>
                                                <td className="px-4 py-4">
                                                    <select
                                                        className={`rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold transition ${styles.badge}`}
                                                        disabled={workingOrderId === order._id}
                                                        onChange={(event) => handleUpdateStatus(order, event.target.value as Order["status"])}
                                                        value={order.status}
                                                    >
                                                        {statusOptions.map((status) => (
                                                            <option key={status} value={status}>
                                                                {status}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td className="px-4 py-4 text-xs text-slate-500">
                                                    {new Date(order.createdAt).toLocaleString()}
                                                </td>
                                                <td className="px-4 py-4 text-right text-xs">
                                                    <div className="flex flex-wrap justify-end gap-2">
                                                        <Link
                                                            className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 font-semibold text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600"
                                                            href={`/admin/orders/${order._id}`}
                                                        >
                                                            <span className="material-symbols-outlined text-sm">open_in_new</span>
                                                            View
                                                        </Link>
                                                        <button
                                                            className="inline-flex items-center gap-1 rounded-full border border-transparent bg-slate-900 px-3 py-1 font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                                                            disabled={workingOrderId === order._id || order.status === "Fulfilled"}
                                                            onClick={() => markFulfilled(order)}
                                                            type="button"
                                                        >
                                                            <span className="material-symbols-outlined text-sm">task_alt</span>
                                                            Mark fulfilled
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
