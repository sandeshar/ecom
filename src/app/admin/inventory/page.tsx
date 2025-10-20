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
        <main className="flex flex-1 flex-col bg-slate-50">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto w-full max-w-6xl px-6 py-8">
                    <h1 className="text-2xl font-semibold text-slate-900">Inventory</h1>
                    <p className="mt-2 text-sm text-slate-600">Keep stock levels in check and spot low items before they block orders.</p>
                </div>
            </header>

            <section className="mx-auto w-full max-w-6xl space-y-8 px-6 py-10">
                <div className="rounded-xl border border-slate-200 bg-white">
                    <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                        <h2 className="text-base font-semibold text-slate-900">Inventory ledger</h2>
                        <span className="text-xs text-slate-500">{inventoryItems.length} SKUs</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm text-slate-600">
                            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
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
                            <tbody>
                                {inventoryItems.map((item) => (
                                    <tr className="border-t border-slate-100" key={item.sku}>
                                        <td className="px-4 py-3 font-semibold text-slate-900">{item.sku}</td>
                                        <td className="px-4 py-3">
                                            <p className="font-medium text-slate-900">{item.product}</p>
                                            <p className="text-xs text-slate-500">{item.category}</p>
                                        </td>
                                        <td className="px-4 py-3">{item.stock}</td>
                                        <td className="px-4 py-3">{item.committed}</td>
                                        <td className="px-4 py-3">{item.reorderPoint}</td>
                                        <td className="px-4 py-3">{item.leadTimeDays} days</td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${statusBadge[item.status]}`}>
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

                <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <h2 className="text-base font-semibold text-slate-900">Incoming supply</h2>
                    <ul className="mt-3 space-y-3 text-sm text-slate-600">
                        {supplierAlerts.map((alert) => (
                            <li className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2" key={alert.id}>
                                <div>
                                    <p className="font-semibold text-slate-900">{alert.supplier}</p>
                                    <p className="text-xs text-slate-500">SKU {alert.sku} · {alert.expectedDate}</p>
                                </div>
                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{alert.quantity} units</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </main>
    );
}
