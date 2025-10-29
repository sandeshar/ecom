"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import Notify from "@/components/common/Notification";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/api-client";
import { API_BASE_URL } from "@/lib/config";
import type { Order } from "@/types/order";

type AdminOrderDetailPageProps = {
    params: {
        orderId: string;
    };
};

const statusStyles: Record<Order["status"], { badge: string; text: string; icon: string }> = {
    Processing: { badge: "bg-amber-50 text-amber-600", text: "text-amber-600", icon: "shopping_cart" },
    Fulfilled: { badge: "bg-emerald-50 text-emerald-600", text: "text-emerald-600", icon: "task_alt" },
    "Awaiting pickup": { badge: "bg-sky-50 text-sky-600", text: "text-sky-600", icon: "local_shipping" },
    "Refund requested": { badge: "bg-rose-50 text-rose-600", text: "text-rose-600", icon: "payments" },
    Cancelled: { badge: "bg-slate-100 text-slate-500", text: "text-slate-500", icon: "cancel" },
};

const statusOptions: Order["status"][] = ["Processing", "Fulfilled", "Awaiting pickup", "Refund requested", "Cancelled"];
const paymentStatusOptions: Order["paymentStatus"][] = ["Pending", "Paid", "Failed", "Refunded"];

function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    }).format(value);
}

function formatDateTime(value: string) {
    return new Date(value).toLocaleString();
}

function resolveImagePath(path?: string | null) {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return `${API_BASE_URL}/uploads/${path}`;
}

export default function AdminOrderDetailPage({ params }: AdminOrderDetailPageProps) {
    const { token } = useAuth();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [banner, setBanner] = useState<{ text: string; type: "success" | "error" | "info" } | null>(null);
    const [updatingField, setUpdatingField] = useState<"status" | "payment" | null>(null);

    const fetchOrder = useCallback(async () => {
        if (!token) return;
        setLoading(true);
        setError(null);
        try {
            const data = await apiRequest<Order>(`/orders/${params.orderId}`, { token });
            setOrder(data);
        } catch (requestError) {
            const message = requestError instanceof Error ? requestError.message : "Unable to load order";
            setError(message);
        } finally {
            setLoading(false);
        }
    }, [params.orderId, token]);

    useEffect(() => {
        fetchOrder();
    }, [fetchOrder]);

    const showBanner = useCallback((state: { text: string; type: "success" | "error" | "info" } | null) => {
        setBanner(state);
        if (state) {
            setTimeout(() => setBanner(null), 3500);
        }
    }, []);

    const mutateOrder = useCallback(
        async (payload: Partial<Pick<Order, "status" | "paymentStatus">>, field: "status" | "payment") => {
            if (!token || !order) return;
            setUpdatingField(field);
            try {
                const updated = await apiRequest<Order>(`/orders/${order._id}/status`, {
                    method: "PATCH",
                    data: payload,
                    token,
                });
                setOrder(updated);
                const label = payload.status ? `Status updated to ${payload.status}` : `Payment status updated to ${payload.paymentStatus}`;
                showBanner({ text: label, type: "success" });
            } catch (mutationError) {
                const message = mutationError instanceof Error ? mutationError.message : "Unable to update order";
                showBanner({ text: message, type: "error" });
            } finally {
                setUpdatingField(null);
            }
        },
        [order, token, showBanner]
    );

    const timeline = useMemo(() => {
        if (!order) return [];
        const events = [
            {
                id: "created",
                icon: "receipt_long",
                title: "Order placed",
                description: `${order.items.length} item${order.items.length === 1 ? "" : "s"} purchased`,
                timestamp: formatDateTime(order.createdAt),
            },
        ];

        if (order.updatedAt && order.updatedAt !== order.createdAt) {
            events.push({
                id: "updated",
                icon: statusStyles[order.status]?.icon ?? "update",
                title: `Status: ${order.status}`,
                description: `Payment status ${order.paymentStatus}`,
                timestamp: formatDateTime(order.updatedAt),
            });
        }

        return events;
    }, [order]);

    if (!token) {
        return (
            <main className="flex flex-1 items-center justify-center bg-slate-50">
                <div className="rounded-3xl border border-slate-200 bg-white px-10 py-12 text-center shadow-sm">
                    <p className="text-sm text-slate-600">You must be signed in to view this order.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="flex flex-1 flex-col">
            {banner ? <Notify text={banner.text} type={banner.type} /> : null}
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <Link
                            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 transition hover:text-indigo-500"
                            href="/admin/orders"
                        >
                            <span className="material-symbols-outlined text-base">arrow_back</span>
                            All orders
                        </Link>
                        <h1 className="mt-4 text-3xl font-semibold text-slate-900">
                            {order ? order.orderNumber : "Order"}
                        </h1>
                        <p className="mt-1 text-sm text-slate-600">Placed {order ? formatDateTime(order.createdAt) : ""}</p>
                    </div>
                    {order ? (
                        <div className="flex flex-col items-end gap-3 sm:flex-row sm:items-center">
                            <select
                                className={`rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold transition ${statusStyles[order.status].badge}`}
                                disabled={updatingField === "status"}
                                onChange={(event) => {
                                    const status = event.target.value as Order["status"];
                                    if (status !== order.status) {
                                        mutateOrder({ status }, "status");
                                    }
                                }}
                                value={order.status}
                            >
                                {statusOptions.map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                            <select
                                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition"
                                disabled={updatingField === "payment"}
                                onChange={(event) => {
                                    const paymentStatus = event.target.value as Order["paymentStatus"];
                                    if (paymentStatus !== order.paymentStatus) {
                                        mutateOrder({ paymentStatus }, "payment");
                                    }
                                }}
                                value={order.paymentStatus}
                            >
                                {paymentStatusOptions.map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ) : null}
                </div>
            </header>

            <section className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-12">
                {loading ? (
                    <div className="flex flex-1 items-center justify-center rounded-3xl border border-slate-200 bg-white py-20 text-sm text-slate-500 shadow-sm">
                        Loading order…
                    </div>
                ) : error ? (
                    <div className="rounded-3xl border border-rose-200 bg-rose-50 px-6 py-10 text-center text-sm text-rose-600 shadow-sm">
                        {error}
                    </div>
                ) : !order ? (
                    <div className="rounded-3xl border border-slate-200 bg-white px-6 py-10 text-center text-sm text-slate-500 shadow-sm">
                        Order not found.
                    </div>
                ) : (
                    <>
                        <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
                            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    <h2 className="text-base font-semibold text-slate-900">Line items</h2>
                                    <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                                        {order.items.length} item{order.items.length === 1 ? "" : "s"}
                                    </div>
                                </div>
                                <div className="mt-6 space-y-4">
                                    {order.items.map((item, index) => {
                                        const heroSource = item.heroImage ?? (typeof item.product === "object" && item.product ? item.product.heroImage : undefined);
                                        const imagePath = resolveImagePath(heroSource);
                                        const sku = typeof item.product === "string" ? item.product : item.product?._id ?? "-";
                                        return (
                                            <article className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4" key={`${sku}-${index}`}>
                                                <div
                                                    className="size-16 flex-none rounded-2xl bg-slate-100 bg-cover bg-center"
                                                    style={imagePath ? { backgroundImage: `url('${imagePath}')` } : undefined}
                                                />
                                                <div className="flex-1">
                                                    <div className="font-semibold text-slate-900">{item.name}</div>
                                                    <div className="text-xs text-slate-500">SKU {sku}</div>
                                                </div>
                                                <div className="text-right text-sm">
                                                    <div className="font-semibold text-slate-900">{formatCurrency(item.price)}</div>
                                                    <div className="text-xs text-slate-500">Qty {item.quantity}</div>
                                                </div>
                                            </article>
                                        );
                                    })}
                                </div>
                            </div>
                            <aside className="space-y-6">
                                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <h2 className="text-base font-semibold text-slate-900">Customer</h2>
                                    <p className="mt-3 text-sm text-slate-600">
                                        {order.customer.name}
                                        <br />
                                        <span className="text-xs text-slate-500">{order.customer.email}</span>
                                        {order.customer.phone ? (
                                            <>
                                                <br />
                                                <span className="text-xs text-slate-500">{order.customer.phone}</span>
                                            </>
                                        ) : null}
                                    </p>
                                    <div className="mt-4 space-y-2 text-xs text-slate-500">
                                        <p>Payment status: <span className="font-semibold text-slate-700">{order.paymentStatus}</span></p>
                                        <p>Status updated: <span className="font-semibold text-slate-700">{formatDateTime(order.updatedAt)}</span></p>
                                    </div>
                                </div>
                                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <h2 className="text-base font-semibold text-slate-900">Billing address</h2>
                                    <address className="mt-3 space-y-1 text-sm text-slate-600 not-italic">
                                        <div>{order.billingAddress.line1}</div>
                                        {order.billingAddress.line2 ? <div>{order.billingAddress.line2}</div> : null}
                                        <div>
                                            {order.billingAddress.city}, {order.billingAddress.state ?? ""} {order.billingAddress.postalCode}
                                        </div>
                                        <div>{order.billingAddress.country}</div>
                                    </address>
                                </div>
                                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <h2 className="text-base font-semibold text-slate-900">Totals</h2>
                                    <dl className="mt-4 space-y-3 text-sm text-slate-600">
                                        <div className="flex items-center justify-between">
                                            <dt>Subtotal</dt>
                                            <dd>{formatCurrency(order.subtotal)}</dd>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <dt>Tax</dt>
                                            <dd>{formatCurrency(order.tax)}</dd>
                                        </div>
                                        <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
                                            <dt>Total collected</dt>
                                            <dd className="text-base font-semibold text-slate-900">{formatCurrency(order.total)}</dd>
                                        </div>
                                    </dl>
                                </div>
                            </aside>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-base font-semibold text-slate-900">Timeline</h2>
                                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">System generated</span>
                                </div>
                                <ul className="mt-4 space-y-4 text-sm text-slate-600">
                                    {timeline.map((event) => (
                                        <li className="flex items-start gap-3 rounded-2xl border border-slate-100 px-4 py-3" key={event.id}>
                                            <span className="material-symbols-outlined text-base text-indigo-500">{event.icon}</span>
                                            <div>
                                                <div className="font-semibold text-slate-900">{event.title}</div>
                                                <p className="text-xs text-slate-500">{event.description}</p>
                                                <div className="mt-1 text-xs text-slate-400">{event.timestamp}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                <h2 className="text-base font-semibold text-slate-900">Internal notes</h2>
                                {order.notes ? (
                                    <p className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600">{order.notes}</p>
                                ) : (
                                    <p className="mt-4 text-sm text-slate-500">No notes have been recorded for this order.</p>
                                )}
                                {order.metadata && Object.keys(order.metadata).length > 0 ? (
                                    <div className="mt-6 space-y-2 text-xs text-slate-500">
                                        <h3 className="font-semibold uppercase tracking-[0.3em] text-slate-400">Metadata</h3>
                                        {Object.entries(order.metadata).map(([key, value]) => (
                                            <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2" key={key}>
                                                <span className="font-medium text-slate-600">{key}</span>
                                                <span className="text-slate-500">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </>
                )}
            </section>
        </main>
    );
}
