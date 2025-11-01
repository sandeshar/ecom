"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/api-client";

type Customer = {
    name: string;
    email: string;
    phone?: string;
    totalSpend: number;
    orders: number;
    lastOrderAt: string;
};

const filters = [
    { label: "All customers", icon: "groups" },
    { label: "VIP", icon: "workspace_premium" },
    { label: "New", icon: "fiber_new" },
    { label: "At risk", icon: "warning" },
];

function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    }).format(value);
}

function formatTimeAgo(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 24) {
        if (diffHours < 1) return "Just now";
        if (diffHours === 1) return "1 hour ago";
        return `${diffHours} hours ago`;
    }
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
}

function getCustomerStatus(orders: number, totalSpend: number): { label: string; color: string } {
    if (totalSpend > 1000) return { label: "VIP", color: "bg-purple-50 text-purple-600" };
    if (orders === 1) return { label: "New", color: "bg-blue-50 text-blue-600" };
    if (orders < 3) return { label: "At risk", color: "bg-amber-50 text-amber-600" };
    return { label: "Active", color: "bg-emerald-50 text-emerald-600" };
}

export default function AdminCustomersPage() {
    const { token } = useAuth();
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCustomers = useCallback(async () => {
        if (!token) return;
        setLoading(true);
        setError(null);
        try {
            const data = await apiRequest<Customer[]>("/customers", { token });
            setCustomers(data);
        } catch (requestError) {
            const message = requestError instanceof Error ? requestError.message : "Unable to load customers";
            setError(message);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchCustomers();
    }, [fetchCustomers]);
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

                {loading ? (
                    <div className="mt-8 flex items-center justify-center rounded-2xl border border-slate-200 bg-white py-20 text-sm text-slate-500">
                        Loading customers...
                    </div>
                ) : error ? (
                    <div className="mt-8 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-5 text-sm text-rose-600">
                        {error}
                    </div>
                ) : customers.length === 0 ? (
                    <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
                        No customers yet. Orders will populate this list automatically.
                    </div>
                ) : (
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
                                {customers.map((customer) => {
                                    const status = getCustomerStatus(customer.orders, customer.totalSpend);
                                    return (
                                        <tr key={customer.email}>
                                            <td className="px-4 py-4">
                                                <div className="font-semibold text-slate-900">{customer.name}</div>
                                                <div className="text-xs text-slate-500">{customer.email}</div>
                                            </td>
                                            <td className="px-4 py-4 font-medium text-slate-900">{formatCurrency(customer.totalSpend)}</td>
                                            <td className="px-4 py-4">{customer.orders}</td>
                                            <td className="px-4 py-4">{formatTimeAgo(customer.lastOrderAt)}</td>
                                            <td className="px-4 py-4">
                                                <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${status.color}`}>
                                                    <span className="material-symbols-outlined text-sm">verified_user</span>
                                                    {status.label}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </main>
    );
}
