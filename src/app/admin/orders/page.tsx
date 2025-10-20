import Link from "next/link";
import { orderTimeline, orders, type OrderStatus } from "@/data/admin/orders";

const statusStyles: Record<OrderStatus, { badge: string; text: string }> = {
    Processing: { badge: "bg-amber-50 text-amber-600", text: "text-amber-600" },
    Fulfilled: { badge: "bg-emerald-50 text-emerald-600", text: "text-emerald-600" },
    "Awaiting pickup": { badge: "bg-sky-50 text-sky-600", text: "text-sky-600" },
    "Refund requested": { badge: "bg-rose-50 text-rose-600", text: "text-rose-600" },
};

function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    }).format(value);
}

export default function AdminOrdersPage() {
    return (
        <main className="flex flex-1 flex-col">
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
                        <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 font-medium text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600">
                            <span className="material-symbols-outlined text-base">filter_alt</span>
                            Filters
                        </button>
                        <button className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-4 py-2 font-semibold text-white transition hover:bg-indigo-600">
                            <span className="material-symbols-outlined text-base">description</span>
                            Export CSV
                        </button>
                    </div>
                </div>
            </header>

            <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 py-12 lg:flex-row">
                <div className="flex-1 space-y-6">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <h2 className="text-base font-semibold text-slate-900">Latest orders</h2>
                            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                                <span className="material-symbols-outlined text-base">schedule</span>
                                Updated 3m ago
                            </div>
                        </div>
                        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-100">
                            <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
                                <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    <tr>
                                        <th className="px-4 py-3">Order</th>
                                        <th className="px-4 py-3">Customer</th>
                                        <th className="px-4 py-3">Items</th>
                                        <th className="px-4 py-3">Total</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">ETA</th>
                                        <th className="px-4 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-slate-600">
                                    {orders.map((order) => {
                                        const styles = statusStyles[order.status];
                                        return (
                                            <tr key={order.id}>
                                                <td className="px-4 py-4 font-semibold text-slate-900">
                                                    <div>{order.id}</div>
                                                    <div className="text-xs font-normal text-slate-500">{order.placedAt}</div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="font-medium text-slate-900">{order.customer}</div>
                                                    <div className="text-xs text-slate-500">{order.email}</div>
                                                </td>
                                                <td className="px-4 py-4">{order.items}</td>
                                                <td className="px-4 py-4 font-medium text-slate-900">{formatCurrency(order.total)}</td>
                                                <td className="px-4 py-4">
                                                    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${styles.badge}`}>
                                                        <span className="material-symbols-outlined text-sm">local_shipping</span>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className={`px-4 py-4 text-sm font-medium ${styles.text}`}>{order.fulfillmentEta}</td>
                                                <td className="px-4 py-4 text-right text-sm">
                                                    <div className="inline-flex items-center gap-2">
                                                        <Link
                                                            className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600"
                                                            href={`/admin/orders/${order.id.replace("#", "")}`}
                                                        >
                                                            <span className="material-symbols-outlined text-sm">open_in_new</span>
                                                            View
                                                        </Link>
                                                        <button className="inline-flex items-center gap-1 rounded-full border border-transparent bg-slate-900 px-3 py-1 text-xs font-semibold text-white transition hover:-translate-y-0.5">
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
                    </div>
                </div>
            </section>
        </main>
    );
}
