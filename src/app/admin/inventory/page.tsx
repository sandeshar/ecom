type InventoryStatus = "Healthy" | "Low" | "Reorder" | "Out";

type InventoryRow = {
    sku: string;
    product: string;
    category: string;
    stock: number;
    committed: number;
    reorderPoint: number;
    status: InventoryStatus;
    leadTimeDays: number;
};

type SupplierAlert = {
    id: string;
    supplier: string;
    sku: string;
    expectedDate: string;
    quantity: number;
};

const inventoryItems: InventoryRow[] = [
    {
        sku: "PRO-8892",
        product: "Gradient Mesh Poster Pack",
        category: "Illustration",
        stock: 6,
        committed: 2,
        reorderPoint: 10,
        status: "Low",
        leadTimeDays: 5,
    },
    {
        sku: "PRO-7715",
        product: "Modern UI Card Set",
        category: "UI Kit",
        stock: 12,
        committed: 4,
        reorderPoint: 12,
        status: "Reorder",
        leadTimeDays: 7,
    },
    {
        sku: "PRO-6407",
        product: "Brand Guidelines Kit",
        category: "Branding",
        stock: 0,
        committed: 0,
        reorderPoint: 8,
        status: "Out",
        leadTimeDays: 9,
    },
    {
        sku: "PRO-5321",
        product: "Motion Elements Toolkit",
        category: "Animation",
        stock: 28,
        committed: 6,
        reorderPoint: 15,
        status: "Healthy",
        leadTimeDays: 6,
    },
    {
        sku: "PRO-4250",
        product: "Serif Type Suite",
        category: "Typography",
        stock: 18,
        committed: 3,
        reorderPoint: 10,
        status: "Healthy",
        leadTimeDays: 4,
    },
];

const supplierAlerts: SupplierAlert[] = [
    { id: "alert-01", supplier: "DesignOps Collective", sku: "PRO-7715", expectedDate: "Oct 17", quantity: 40 },
    { id: "alert-02", supplier: "Gradient Labs", sku: "PRO-8892", expectedDate: "Oct 20", quantity: 60 },
    { id: "alert-03", supplier: "Northwind Media", sku: "PRO-6407", expectedDate: "Oct 23", quantity: 75 },
];

const statusBadge: Record<InventoryStatus, string> = {
    Healthy: "bg-emerald-50 text-emerald-600",
    Low: "bg-amber-50 text-amber-600",
    Reorder: "bg-sky-50 text-sky-600",
    Out: "bg-rose-50 text-rose-600",
};

export default function AdminInventoryPage() {
    return (
        <main className="flex flex-1 flex-col">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Inventory</p>
                        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Stock intelligence</h1>
                        <p className="mt-2 max-w-2xl text-sm text-slate-600">
                            Balance stock health, upcoming purchase orders, and fulfilment commitments across every sku.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                        <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 font-medium text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600">
                            <span className="material-symbols-outlined text-base">file_upload</span>
                            Import CSV
                        </button>
                        <button className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-4 py-2 font-semibold text-white transition hover:bg-indigo-600">
                            <span className="material-symbols-outlined text-base">add_circle</span>
                            New stock entry
                        </button>
                    </div>
                </div>
            </header>

            <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12 lg:flex-row">
                <div className="flex-1 space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Total stock on hand</div>
                            <div className="mt-3 text-3xl font-semibold text-slate-900">1,284 units</div>
                            <div className="mt-1 text-xs text-emerald-600">+6.2% vs last month</div>
                        </article>
                        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Reorder pending</div>
                            <div className="mt-3 text-3xl font-semibold text-slate-900">7 SKUs</div>
                            <div className="mt-1 text-xs text-amber-500">Priority replenishment</div>
                        </article>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <h2 className="text-base font-semibold text-slate-900">Inventory ledger</h2>
                            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                                <span className="material-symbols-outlined text-base">stacked_bar_chart</span>
                                Live sync
                            </div>
                        </div>
                        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-100">
                            <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
                                <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    <tr>
                                        <th className="px-4 py-3">SKU</th>
                                        <th className="px-4 py-3">Product</th>
                                        <th className="px-4 py-3">Stock</th>
                                        <th className="px-4 py-3">Committed</th>
                                        <th className="px-4 py-3">Reorder point</th>
                                        <th className="px-4 py-3">Lead time</th>
                                        <th className="px-4 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-slate-600">
                                    {inventoryItems.map((item) => (
                                        <tr key={item.sku}>
                                            <td className="px-4 py-4 font-semibold text-slate-900">{item.sku}</td>
                                            <td className="px-4 py-4">
                                                <div className="font-medium text-slate-900">{item.product}</div>
                                                <div className="text-xs text-slate-500">{item.category}</div>
                                            </td>
                                            <td className="px-4 py-4">{item.stock}</td>
                                            <td className="px-4 py-4">{item.committed}</td>
                                            <td className="px-4 py-4">{item.reorderPoint}</td>
                                            <td className="px-4 py-4">{item.leadTimeDays} days</td>
                                            <td className="px-4 py-4">
                                                <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${statusBadge[item.status]}`}>
                                                    <span className="material-symbols-outlined text-sm">inventory</span>
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <aside className="w-full max-w-sm space-y-6">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-base font-semibold text-slate-900">Supplier alerts</h2>
                        <ul className="mt-4 space-y-4 text-sm text-slate-600">
                            {supplierAlerts.map((alert) => (
                                <li className="rounded-2xl border border-slate-100 bg-slate-50 p-4" key={alert.id}>
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{alert.supplier}</div>
                                            <div className="mt-1 text-sm font-semibold text-slate-900">SKU {alert.sku}</div>
                                        </div>
                                        <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-600">
                                            {alert.quantity} units
                                        </span>
                                    </div>
                                    <p className="mt-3 text-xs text-slate-500">Expected arrival · {alert.expectedDate}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-base font-semibold text-slate-900">Cycle count</h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Schedule weekly audits to keep digital counts aligned with warehouse reality.
                        </p>
                        <button className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600">
                            <span className="material-symbols-outlined text-sm">event</span>
                            Book audit slot
                        </button>
                    </div>
                </aside>
            </section>
        </main>
    );
}
