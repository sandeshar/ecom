const headlineMetrics = [
    { label: "Revenue", value: "$128,420", change: "+8.4%", icon: "monitoring" },
    { label: "Orders", value: "2,140", change: "+4.1%", icon: "shopping_bag" },
    { label: "Conversion", value: "3.2%", change: "+0.6%", icon: "trending_up" },
    { label: "Returning customers", value: "32%", change: "+2.3%", icon: "loyalty" },
];

const recentOrders = [
    { id: "#2047", customer: "Jordan Rivera", email: "jordan@email.com", total: "$128.00", status: "Fulfilled" },
    { id: "#2046", customer: "Daphne Lewis", email: "daphne@email.com", total: "$76.50", status: "Processing" },
    { id: "#2045", customer: "Kellan Ortiz", email: "kellan@email.com", total: "$52.00", status: "Fulfilled" },
    { id: "#2044", customer: "Priya Desai", email: "priya@email.com", total: "$248.90", status: "Awaiting pickup" },
];

const inventoryAlerts = [
    { sku: "PRO-8892", product: "Gradient Mesh Poster Pack", stock: 6, status: "Low" },
    { sku: "PRO-7715", product: "Modern UI Card Set", stock: 12, status: "Reorder" },
    { sku: "PRO-6407", product: "Brand Guidelines Kit", stock: 0, status: "Out" },
];

const followUps = [
    "Schedule email blast for new arrivals.",
    "Share restock ETA with support team.",
    "Review discounts before weekend.",
];

export default function AdminDashboardPage() {
    return (
        <main className="flex flex-1 flex-col bg-slate-50 text-slate-900">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto w-full max-w-6xl px-6 py-8">
                    <h1 className="text-2xl font-semibold">Store overview</h1>
                    <p className="mt-2 text-sm text-slate-600">
                        A focused view of sales, orders, and inventory so you can take action without digging through extra pages.
                    </p>
                </div>
            </header>

            <section className="mx-auto w-full max-w-6xl space-y-10 px-6 py-10">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {headlineMetrics.map((metric) => (
                        <article className="rounded-xl border border-slate-200 bg-white p-4" key={metric.label}>
                            <div className="flex items-start justify-between text-sm text-slate-500">
                                <span>{metric.label}</span>
                                <span className="material-symbols-outlined text-base text-indigo-500">{metric.icon}</span>
                            </div>
                            <p className="mt-3 text-2xl font-semibold">{metric.value}</p>
                            <p className="mt-1 text-xs font-medium text-emerald-500">{metric.change}</p>
                        </article>
                    ))}
                </div>

                <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
                    <article className="rounded-xl border border-slate-200 bg-white">
                        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                            <div>
                                <h2 className="text-base font-semibold">Recent orders</h2>
                                <p className="text-xs text-slate-500">Latest checkouts that may need attention.</p>
                            </div>
                            <span className="material-symbols-outlined text-base text-slate-400">receipt_long</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-sm text-slate-600">
                                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                                    <tr>
                                        <th className="px-4 py-3">Order</th>
                                        <th className="px-4 py-3">Customer</th>
                                        <th className="px-4 py-3">Total</th>
                                        <th className="px-4 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentOrders.map((order) => (
                                        <tr className="border-t border-slate-100" key={order.id}>
                                            <td className="px-4 py-3 font-semibold text-slate-900">{order.id}</td>
                                            <td className="px-4 py-3">
                                                <p className="font-medium text-slate-900">{order.customer}</p>
                                                <p className="text-xs text-slate-500">{order.email}</p>
                                            </td>
                                            <td className="px-4 py-3 font-medium text-slate-900">{order.total}</td>
                                            <td className="px-4 py-3">
                                                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                                                    <span className="material-symbols-outlined text-sm">local_shipping</span>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </article>

                    <aside className="space-y-6">
                        <section className="rounded-xl border border-slate-200 bg-white p-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-base font-semibold">Inventory alerts</h2>
                                <span className="material-symbols-outlined text-base text-rose-400">warning</span>
                            </div>
                            <ul className="mt-4 space-y-3 text-sm text-slate-600">
                                {inventoryAlerts.map((item) => (
                                    <li className="rounded-lg border border-slate-100 px-3 py-2" key={item.sku}>
                                        <p className="font-semibold text-slate-900">{item.product}</p>
                                        <p className="text-xs text-slate-500">SKU {item.sku} · Stock {item.stock} · {item.status}</p>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="rounded-xl border border-slate-200 bg-white p-4">
                            <h2 className="text-base font-semibold">Next up</h2>
                            <ul className="mt-3 space-y-2 text-sm text-slate-600">
                                {followUps.map((item) => (
                                    <li className="flex items-start gap-2" key={item}>
                                        <span className="material-symbols-outlined mt-0.5 text-sm text-indigo-400">check_circle</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </aside>
                </div>
            </section>
        </main>
    );
}
