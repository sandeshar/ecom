"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

type NavItem = {
    label: string;
    href: string;
    icon: string;
    permission?: string;
    superAdminOnly?: boolean;
};

type NavSection = {
    title: string;
    items: NavItem[];
};

const navSections: NavSection[] = [
    {
        title: "Overview",
        items: [
            { label: "Dashboard", href: "/admin", icon: "space_dashboard" },
            { label: "Analytics", href: "/admin/analytics", icon: "insights", permission: "canViewAnalytics" },
        ],
    },
    {
        title: "Management",
        items: [
            { label: "Products", href: "/admin/products", icon: "inventory_2", permission: "canViewProducts" },
            { label: "Orders", href: "/admin/orders", icon: "receipt_long", permission: "canViewOrders" },
            { label: "Customers", href: "/admin/customers", icon: "group", permission: "canViewCustomers" },
            { label: "Admins", href: "/admin/admins", icon: "shield_person", superAdminOnly: true },
            { label: "Inventory", href: "/admin/inventory", icon: "warehouse", permission: "canViewProducts" },
        ],
    },
    {
        title: "Settings",
        items: [
            { label: "Store Settings", href: "/admin/settings", icon: "tune", permission: "canEditSettings" },
        ],
    },
];

function isActive(pathname: string, href: string) {
    if (pathname === href) return true;
    return pathname.startsWith(`${href}/`);
}

export default function AdminSidebar() {
    const pathname = usePathname();
    const { user, logout, hasPermission, isSuperAdmin } = useAuth();

    // Filter nav items based on permissions
    const filteredSections = navSections.map(section => ({
        ...section,
        items: section.items.filter(item => {
            // Super admin only items
            if (item.superAdminOnly) {
                return isSuperAdmin;
            }
            // Permission-based items
            if (item.permission) {
                return hasPermission(item.permission as any);
            }
            // No restriction
            return true;
        })
    })).filter(section => section.items.length > 0);

    return (
        <aside className="sticky top-0 flex h-screen w-64 flex-col overflow-y-auto border-r border-slate-200 bg-white/95 px-4 py-6 backdrop-blur">
            <div className="flex items-center gap-3 px-2">
                <span className="flex size-10 items-center justify-center rounded-2xl bg-indigo-500 text-xl font-semibold text-white">
                    DH
                </span>
                <div>
                    <div className="text-sm font-semibold text-slate-900">Design Hub</div>
                    <div className="text-xs text-slate-500">Admin panel</div>
                </div>
            </div>

            <nav className="mt-8 flex flex-1 flex-col gap-6 text-sm font-medium text-slate-600">
                {filteredSections.map((section) => (
                    <div key={section.title}>
                        <p className="px-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                            {section.title}
                        </p>
                        <div className="mt-2 flex flex-col gap-2">
                            {section.items.map((item) => {
                                const active = isActive(pathname, item.href);
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`group inline-flex items-center gap-3 rounded-2xl px-3 py-2 transition ${active
                                            ? "bg-indigo-50 text-indigo-600 shadow-sm"
                                            : "hover:bg-slate-100 hover:text-slate-900"
                                            }`}
                                    >
                                        <span
                                            className={`material-symbols-outlined text-base ${active
                                                ? "text-indigo-500"
                                                : "text-slate-400 group-hover:text-slate-500"
                                                }`}
                                        >
                                            {item.icon}
                                        </span>
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            <div className="mt-auto space-y-4">
                <div className="rounded-2xl bg-slate-50 p-4 text-xs text-slate-500">
                    <div className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-base text-indigo-400">lightbulb</span>
                        <div>
                            <div className="font-semibold text-slate-700">Need anything?</div>
                            <p className="mt-1">
                                Reach out to the storefront team for merchandising or campaign requests.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="rounded-2xl border border-slate-200 p-4 text-xs text-slate-500">
                    <div className="flex items-center justify-between gap-2">
                        <div>
                            <div className="text-sm font-semibold text-slate-800">{user?.name ?? "Admin"}</div>
                            <div className="text-[11px] uppercase tracking-[0.3em] text-slate-400">Signed in</div>
                        </div>
                        <button
                            className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-rose-200 hover:text-rose-600"
                            onClick={logout}
                            type="button"
                        >
                            <span className="material-symbols-outlined text-sm">logout</span>
                            Log out
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
}
