"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
    label: string;
    href: string;
    icon: string;
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
            { label: "Analytics", href: "/admin/analytics", icon: "insights" },
        ],
    },
    {
        title: "Management",
        items: [
            { label: "Products", href: "/admin/products", icon: "inventory_2" },
            { label: "Add Product", href: "/admin/products/new", icon: "add_circle" },
            { label: "Orders", href: "/admin/orders", icon: "receipt_long" },
            { label: "Customers", href: "/admin/customers", icon: "group" },
            { label: "Admins", href: "/admin/admins", icon: "shield_person" },
            { label: "Inventory", href: "/admin/inventory", icon: "warehouse" },
        ],
    },
    {
        title: "Settings",
        items: [
            { label: "Store Settings", href: "/admin/settings", icon: "tune" },
        ],
    },
];

function isActive(pathname: string, href: string) {
    if (pathname === href) return true;
    return pathname.startsWith(`${href}/`);
}

export default function AdminSidebar() {
    const pathname = usePathname();

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
                {navSections.map((section) => (
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
                                            className={`material-symbols-outlined text-base ${active ? "text-indigo-500" : "text-slate-400 group-hover:text-slate-500"
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

            <div className="mt-6 space-y-3">
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
                <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4 text-xs text-indigo-700">
                    <div className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-base text-indigo-500">rocket_launch</span>
                        <div>
                            <div className="font-semibold text-indigo-900">Upgrade automation</div>
                            <p className="mt-1">
                                Unlock AI-powered merchandising and predictive inventory tools in the Pro plan.
                            </p>
                            <Link
                                className="mt-3 inline-flex items-center gap-1 rounded-full bg-indigo-500 px-3 py-1 text-[11px] font-semibold text-white transition hover:bg-indigo-600"
                                href="/admin/settings"
                            >
                                <span className="material-symbols-outlined text-sm">bolt</span>
                                See plans
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
