"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
    label: string;
    href: string;
    icon: string;
};

const navItems: NavItem[] = [
    { label: "Dashboard", href: "/admin", icon: "space_dashboard" },
    { label: "Products", href: "/admin/products", icon: "inventory_2" },
    { label: "Add Product", href: "/admin/products/new", icon: "add_circle" },
    { label: "Orders", href: "/admin/orders", icon: "receipt_long" },
    { label: "Inventory", href: "/admin/inventory", icon: "warehouse" },
];

function isActive(pathname: string, href: string) {
    if (pathname === href) return true;
    return pathname.startsWith(`${href}/`);
}

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="flex h-full w-64 flex-col border-r border-slate-200 bg-white px-4 py-6">
            <div className="flex items-center gap-3 px-2">
                <span className="flex size-10 items-center justify-center rounded-2xl bg-indigo-500 text-xl font-semibold text-white">
                    DH
                </span>
                <div>
                    <div className="text-sm font-semibold text-slate-900">Design Hub</div>
                    <div className="text-xs text-slate-500">Admin panel</div>
                </div>
            </div>

            <nav className="mt-8 flex flex-1 flex-col gap-2 text-sm font-medium text-slate-600">
                {navItems.map((item) => {
                    const active = isActive(pathname, item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`group inline-flex items-center gap-3 rounded-2xl px-3 py-2 transition ${active
                                    ? "bg-indigo-50 text-indigo-600"
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
            </nav>

            <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-xs text-slate-500">
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
        </aside>
    );
}
