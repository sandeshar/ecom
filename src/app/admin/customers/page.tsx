const customers = [
    { name: "Jordan Rivera", email: "jordan@email.com", totalSpend: "$1,248", orders: 12, lastSeen: "2 hours ago", status: "VIP" },
    { name: "Priya Desai", email: "priya@email.com", totalSpend: "$968", orders: 9, lastSeen: "Yesterday", status: "Active" },
    { name: "Samuel Lee", email: "samuel@email.com", totalSpend: "$612", orders: 6, lastSeen: "3 days ago", status: "At risk" },
    { name: "Daphne Lewis", email: "daphne@email.com", totalSpend: "$488", orders: 5, lastSeen: "6 days ago", status: "Active" },
];

const filters = [
    { label: "All customers", icon: "groups" },
    { label: "VIP", icon: "workspace_premium" },
    { label: "New", icon: "fiber_new" },
    { label: "At risk", icon: "warning" },
];

export default function AdminCustomersPage() {
    return (
        <main className="flex flex-1 flex-col">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Customers</p>
                        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Customer list</h1>
                        <p className="mt-2 max-w-2xl text-sm text-slate-600">
                            A clean view of everyone shopping with you. Filter by the segments that matter and act quickly when engagement drops.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                        <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 font-medium text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600">
                            <span className="material-symbols-outlined text-base">person_add</span>
                            Add customer
                        </button>
                        <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 font-medium text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600">
                            <span className="material-symbols-outlined text-base">upload_file</span>
                            Import
                        </button>
                    </div>
                </div>
            </header>

            <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10">
                <div className="flex flex-wrap gap-2">
                    {filters.map((filter) => (
                        <button
                            className={`inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600 ${filter.label === "All customers" ? "bg-slate-900 text-white hover:border-slate-900 hover:text-white" : ""}`}
                            key={filter.label}
                            type="button"
                        >
                            <span className="material-symbols-outlined text-base">{filter.icon}</span>
                            {filter.label}
                        </button>
                    ))}
                </div>

                <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-slate-100 text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                            <tr>
                                <th className="px-4 py-3">Customer</th>
                                <th className="px-4 py-3">Total spend</th>
                                <th className="px-4 py-3">Orders</th>
                                <th className="px-4 py-3">Last seen</th>
                                <th className="px-4 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {customers.map((customer) => (
                                <tr key={customer.email}>
                                    <td className="px-4 py-4">
                                        <div className="font-semibold text-slate-900">{customer.name}</div>
                                        <div className="text-xs text-slate-500">{customer.email}</div>
                                    </td>
                                    <td className="px-4 py-4 font-medium text-slate-900">{customer.totalSpend}</td>
                                    <td className="px-4 py-4">{customer.orders}</td>
                                    <td className="px-4 py-4">{customer.lastSeen}</td>
                                    <td className="px-4 py-4">
                                        <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${customer.status === "VIP" ? "bg-indigo-50 text-indigo-600" : customer.status === "At risk" ? "bg-amber-50 text-amber-600" : "bg-slate-100 text-slate-600"}`}>
                                            <span className="material-symbols-outlined text-sm">verified_user</span>
                                            {customer.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}
