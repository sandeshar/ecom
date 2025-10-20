import Link from "next/link";
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
                <div className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white/90 px-6 py-4 backdrop-blur">
                    <div className="flex flex-1 items-center gap-3 text-sm">
                        <div className="hidden flex-1 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-slate-500 transition focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-100 md:flex">
                            <span className="material-symbols-outlined text-base">search</span>
                            <input
                                className="w-full bg-transparent text-sm text-slate-600 outline-none placeholder:text-slate-400"
                                placeholder="Search orders, customers, automations..."
                                type="search"
                            />
                        </div>
                        <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 transition hover:border-indigo-200 hover:text-indigo-600">
                            <span className="material-symbols-outlined text-base">keyboard_command_key</span>
                            Cmd + K
                        </button>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                        <Link
                            className="hidden items-center gap-2 rounded-full border border-indigo-200 bg-indigo-500 px-4 py-2 font-semibold text-white transition hover:bg-indigo-600 md:inline-flex"
                            href="/admin/products/new"
                        >
                            <span className="material-symbols-outlined text-base">add</span>
                            New item
                        </Link>
                        <Link
                            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 transition hover:border-indigo-200 hover:text-indigo-600"
                            href="/admin/settings"
                        >
                            <span className="material-symbols-outlined text-base">tune</span>
                            Settings
                        </Link>
                        <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 transition hover:border-indigo-200 hover:text-indigo-600">
                            <span className="material-symbols-outlined text-base">notifications</span>
                            Alerts
                        </button>
                        <button className="hidden items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600 lg:inline-flex">
                            <span className="material-symbols-outlined text-base">dark_mode</span>
                        </button>
                        <div className="flex items-center gap-3 rounded-full border border-slate-200 px-3 py-2">
                            <span className="material-symbols-outlined text-base text-indigo-500">account_circle</span>
                            <div>
                                <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Admin</div>
                                <div className="text-sm font-medium text-slate-800">Jordan Rivera</div>
                            </div>
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
