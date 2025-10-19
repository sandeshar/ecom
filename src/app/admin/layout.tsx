import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen bg-slate-100 text-slate-900">
            <AdminSidebar />
            <div className="flex flex-1 flex-col">
                <div className="flex items-center justify-end gap-4 border-b border-slate-200 bg-white px-6 py-4 text-sm text-slate-600">
                    <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 transition hover:border-indigo-200 hover:text-indigo-600">
                        <span className="material-symbols-outlined text-base">notifications</span>
                        Alerts
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 transition hover:border-indigo-200 hover:text-indigo-600">
                        <span className="material-symbols-outlined text-base">settings</span>
                        Settings
                    </button>
                    <div className="flex items-center gap-3 rounded-full border border-slate-200 px-3 py-2">
                        <span className="material-symbols-outlined text-base text-indigo-500">account_circle</span>
                        <div>
                            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Admin</div>
                            <div className="text-sm font-medium text-slate-800">Jordan Rivera</div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}
