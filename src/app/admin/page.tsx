const headlineMetrics = [
    { label: "Total revenue", value: "$128,420", delta: "+8.4%", icon: "monitoring" },
    { label: "Orders", value: "2,140", delta: "+4.1%", icon: "shopping_bag" },
    { label: "Conversion", value: "3.2%", delta: "+0.6%", icon: "trending_up" },
    { label: "Returning customers", value: "32%", delta: "+2.3%", icon: "loyalty" },
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
    { sku: "PRO-6407", product: "Brand Guidelines Kit", stock: 0, status: "Out of stock" },
];

const fulfillmentQueue = [
    { id: "#2055", customer: "Samuel Lee", promised: "Today 5:00 PM" },
    { id: "#2052", customer: "Nova Studio", promised: "Tomorrow 11:30 AM" },
    { id: "#2051", customer: "Sasha Kim", promised: "Tomorrow 4:15 PM" },
];

const teamReminders = [
    "Email campaign for spring sale drafts due Thursday.",
    "Merchandise photography session booked for next Tuesday.",
    "Update product detail page templates with new sizing chart.",
];

export default function AdminDashboardPage() {
    return (
        <main className="flex flex-1 flex-col text-slate-900">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Dashboard</p>
                        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Store control center</h1>
                        <p className="mt-2 max-w-2xl text-sm text-slate-600">
                            Monitor store revenue, manage orders, and keep inventory on track from a single, balanced overview.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                        <button
                            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 font-medium text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600"
                            type="button"
                        >
                            <span className="material-symbols-outlined text-base">calendar_today</span>
                            Last 30 days
                        </button>
                        <button
                            className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-4 py-2 font-semibold text-white transition hover:bg-indigo-600"
                            type="button"
                        >
                            <span className="material-symbols-outlined text-base">add</span>
                            New product
                        </button>
                    </div>
                </div>
            </header>

            <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {headlineMetrics.map((metric) => (
                        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" key={metric.label}>
                            <div className="flex items-center justify-between">
                                <div className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{metric.label}</div>
                                <span className="material-symbols-outlined text-lg text-indigo-500">{metric.icon}</span>
                            </div>
                            <div className="mt-3 text-2xl font-semibold text-slate-900">{metric.value}</div>
                            <div className="mt-1 text-sm font-medium text-emerald-500">{metric.delta}</div>
                        </article>
                    ))}
                </div>

                <div className="mt-10 grid gap-6 lg:grid-cols-[1.7fr_1fr]">
                    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-base font-semibold text-slate-900">Recent orders</h2>
                                <p className="text-xs text-slate-500">Live feed of the latest checkouts</p>
                            </div>
                            <button
                                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600"
                                type="button"
                            >
                                <span className="material-symbols-outlined text-base">open_in_new</span>
                                Manage orders
                            </button>
                        </header>

                        <div className="mt-6 overflow-hidden rounded-xl border border-slate-100">
                            <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
                                <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    <tr>
                                        <th className="px-4 py-3">Order</th>
                                        <th className="px-4 py-3">Customer</th>
                                        <th className="px-4 py-3">Total</th>
                                        <th className="px-4 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-slate-600">
                                    {recentOrders.map((order) => (
                                        <tr key={order.id}>
                                            <td className="px-4 py-3 font-semibold text-slate-900">{order.id}</td>
                                            <td className="px-4 py-3">
                                                <div className="font-medium text-slate-900">{order.customer}</div>
                                                <div className="text-xs text-slate-500">{order.email}</div>
                                            </td>
                                            <td className="px-4 py-3 font-medium text-slate-900">{order.total}</td>
                                            <td className="px-4 py-3">
                                                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                                                    <span className="material-symbols-outlined text-sm">local_shipping</span>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h2 className="text-base font-semibold text-slate-900">Inventory alerts</h2>
                            <p className="mt-1 text-xs text-slate-500">SKUs that need your attention</p>
                            <div className="mt-5 space-y-4 text-sm text-slate-600">
                                {inventoryAlerts.map((item) => (
                                    <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3" key={item.sku}>
                                        <div className="flex items-baseline justify-between">
                                            <div>
                                                <p className="font-semibold text-slate-900">{item.product}</p>
                                                <p className="text-xs text-slate-500">SKU {item.sku}</p>
                                            </div>
                                            <span className="text-xs font-semibold uppercase tracking-wide text-rose-500">{item.status}</span>
                                        </div>
                                        <p className="mt-2 text-xs text-slate-500">Stock remaining: {item.stock}</p>
                                    </div>
                                ))}
                            </div>
                        </article>

                        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h2 className="text-base font-semibold text-slate-900">Team reminders</h2>
                            <ul className="mt-4 space-y-3 text-sm text-slate-600">
                                {teamReminders.map((reminder) => (
                                    <li className="flex items-start gap-2" key={reminder}>
                                        <span className="material-symbols-outlined mt-0.5 text-sm text-indigo-400">star</span>
                                        <span>{reminder}</span>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    </section>
                </div>

                <section className="mt-10 grid gap-6 lg:grid-cols-2">
                    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <h2 className="text-base font-semibold text-slate-900">Fulfillment queue</h2>
                            <span className="text-xs text-slate-500">Most urgent pickups</span>
                        </div>
                        <div className="mt-5 space-y-3 text-sm text-slate-600">
                            {fulfillmentQueue.map((item) => (
                                <div className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3" key={item.id}>
                                    <div>
                                        <p className="font-semibold text-slate-900">{item.customer}</p>
                                        <p className="text-xs text-slate-500">Order {item.id}</p>
                                    </div>
                                    <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600">
                                        <span className="material-symbols-outlined text-sm">schedule</span>
                                        {item.promised}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </article>

                    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-base font-semibold text-slate-900">Operational snapshot</h2>
                        <div className="mt-5 grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
                            <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-4">
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Return rate</p>
                                <p className="mt-2 text-2xl font-semibold text-slate-900">1.8%</p>
                                <p className="mt-1 text-xs text-slate-500">Down 0.6% vs last month</p>
                            </div>
                            <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-4">
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Average fulfillment</p>
                                <p className="mt-2 text-2xl font-semibold text-slate-900">1.2 days</p>
                                <p className="mt-1 text-xs text-slate-500">Goal: under 1.5 days</p>
                            </div>
                            <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-4">
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Support backlog</p>
                                <p className="mt-2 text-2xl font-semibold text-slate-900">5 tickets</p>
                                <p className="mt-1 text-xs text-slate-500">All scheduled for same-day reply</p>
                            </div>
                            <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-4">
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Marketing KPI</p>
                                <p className="mt-2 text-2xl font-semibold text-slate-900">$4.20 CAC</p>
                                <p className="mt-1 text-xs text-slate-500">Budget tracking healthy</p>
                            </div>
                        </div>
                    </article>
                </section>
            </section>
        </main>
    );
}
