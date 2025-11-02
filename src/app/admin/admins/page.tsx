"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api-client";
import { useAuth } from "@/hooks/useAuth";

interface AdminPermissions {
    canViewProducts: boolean;
    canCreateProducts: boolean;
    canEditProducts: boolean;
    canDeleteProducts: boolean;
    canViewOrders: boolean;
    canEditOrders: boolean;
    canDeleteOrders: boolean;
    canViewCustomers: boolean;
    canViewAnalytics: boolean;
    canEditSettings: boolean;
    canManageAdmins: boolean;
}

interface Admin {
    _id: string;
    email: string;
    name: string;
    role: "superadmin" | "admin";
    permissions: AdminPermissions;
    status: "active" | "inactive";
    lastLogin: string | null;
    createdAt: string;
}

export default function AdminTeamPage() {
    const { token, user } = useAuth();
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    useEffect(() => {
        fetchAdmins();
    }, [token]);

    const fetchAdmins = async () => {
        if (!token) return;
        try {
            const data = await apiRequest("GET", "/admins", token);
            setAdmins(data);
        } catch (error) {
            console.error("Failed to fetch admins:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage(null);

        const formData = new FormData(e.currentTarget);
        const adminData = {
            email: formData.get("email") as string,
            name: formData.get("name") as string,
            role: formData.get("role") as string,
            password: formData.get("password") as string,
            permissions: editingAdmin
                ? {
                    canViewProducts: formData.get("canViewProducts") === "on",
                    canCreateProducts: formData.get("canCreateProducts") === "on",
                    canEditProducts: formData.get("canEditProducts") === "on",
                    canDeleteProducts: formData.get("canDeleteProducts") === "on",
                    canViewOrders: formData.get("canViewOrders") === "on",
                    canEditOrders: formData.get("canEditOrders") === "on",
                    canDeleteOrders: formData.get("canDeleteOrders") === "on",
                    canViewCustomers: formData.get("canViewCustomers") === "on",
                    canViewAnalytics: formData.get("canViewAnalytics") === "on",
                    canEditSettings: formData.get("canEditSettings") === "on",
                }
                : undefined,
        };

        try {
            if (editingAdmin) {
                await apiRequest("PUT", `/admins/${editingAdmin._id}`, token, {
                    name: adminData.name,
                    role: adminData.role,
                    permissions: adminData.permissions,
                    status: formData.get("status") as string,
                });
                setMessage({ type: "success", text: "Admin updated successfully" });
            } else {
                await apiRequest("POST", "/admins", token, adminData);
                setMessage({ type: "success", text: "Admin created successfully" });
            }
            fetchAdmins();
            setShowModal(false);
            setEditingAdmin(null);
        } catch (error: any) {
            setMessage({ type: "error", text: error.message || "Failed to save admin" });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this admin?")) return;

        try {
            await apiRequest("DELETE", `/admins/${id}`, token);
            setMessage({ type: "success", text: "Admin deleted successfully" });
            fetchAdmins();
        } catch (error: any) {
            setMessage({ type: "error", text: error.message || "Failed to delete admin" });
        }
    };

    const formatDate = (date: string | null) => {
        if (!date) return "Never";
        const d = new Date(date);
        const now = new Date();
        const diff = now.getTime() - d.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days === 0) return "Today";
        if (days === 1) return "Yesterday";
        if (days < 7) return `${days} days ago`;
        return d.toLocaleDateString();
    };

    if (loading) {
        return (
            <main className="flex flex-1 items-center justify-center">
                <div className="text-slate-600">Loading admins...</div>
            </main>
        );
    }

    return (
        <main className="flex flex-1 flex-col">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Team</p>
                        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Manage admins</h1>
                        <p className="mt-2 max-w-2xl text-sm text-slate-600">
                            Control who has access to the store backend. Invite collaborators and adjust roles.
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setEditingAdmin(null);
                            setShowModal(true);
                        }}
                        className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-600"
                    >
                        <span className="material-symbols-outlined text-base">person_add</span>
                        Add admin
                    </button>
                </div>
            </header>

            <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10">
                {message && (
                    <div className={`mb-4 rounded-xl border p-4 ${message.type === "success" ? "border-green-200 bg-green-50 text-green-800" : "border-red-200 bg-red-50 text-red-800"}`}>
                        {message.text}
                    </div>
                )}

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-slate-100 text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                            <tr>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Role</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Last login</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {admins.map((admin) => (
                                <tr key={admin._id} className="transition hover:bg-slate-50">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-slate-900">{admin.name}</div>
                                        <div className="text-xs text-slate-500">{admin.email}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${admin.role === "superadmin"
                                                    ? "bg-purple-50 text-purple-600"
                                                    : "bg-blue-50 text-blue-600"
                                                }`}
                                        >
                                            <span className="material-symbols-outlined text-sm">
                                                {admin.role === "superadmin" ? "workspace_premium" : "person"}
                                            </span>
                                            {admin.role === "superadmin" ? "Super Admin" : "Admin"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${admin.status === "active"
                                                    ? "bg-emerald-50 text-emerald-600"
                                                    : "bg-slate-50 text-slate-600"
                                                }`}
                                        >
                                            <span className="size-1.5 rounded-full bg-current" />
                                            {admin.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">{formatDate(admin.lastLogin)}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => {
                                                    setEditingAdmin(admin);
                                                    setShowModal(true);
                                                }}
                                                className="text-indigo-600 transition hover:text-indigo-700"
                                            >
                                                <span className="material-symbols-outlined text-xl">edit</span>
                                            </button>
                                            {user?.email !== admin.email && (
                                                <button
                                                    onClick={() => handleDelete(admin._id)}
                                                    className="text-red-600 transition hover:text-red-700"
                                                >
                                                    <span className="material-symbols-outlined text-xl">delete</span>
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-2xl font-semibold text-slate-900">
                                {editingAdmin ? "Edit Admin" : "Add New Admin"}
                            </h2>
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setEditingAdmin(null);
                                }}
                                className="text-slate-400 transition hover:text-slate-600"
                            >
                                <span className="material-symbols-outlined text-2xl">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                                    Name
                                    <input
                                        className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                        defaultValue={editingAdmin?.name}
                                        name="name"
                                        type="text"
                                        required
                                    />
                                </label>
                                <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                                    Email
                                    <input
                                        className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                        defaultValue={editingAdmin?.email}
                                        name="email"
                                        type="email"
                                        required
                                        disabled={!!editingAdmin}
                                    />
                                </label>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                                    Role
                                    <select
                                        className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                        defaultValue={editingAdmin?.role || "admin"}
                                        name="role"
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="superadmin">Super Admin</option>
                                    </select>
                                </label>
                                {editingAdmin && (
                                    <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                                        Status
                                        <select
                                            className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                            defaultValue={editingAdmin.status}
                                            name="status"
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </label>
                                )}
                            </div>

                            {!editingAdmin && (
                                <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                                    Password
                                    <input
                                        className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                        name="password"
                                        type="password"
                                        required
                                        minLength={6}
                                    />
                                </label>
                            )}

                            {editingAdmin && editingAdmin.role === "admin" && (
                                <div className="rounded-xl border border-slate-200 p-4">
                                    <h3 className="mb-3 font-semibold text-slate-900">Permissions</h3>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <label className="flex items-center gap-2 text-sm text-slate-600">
                                            <input
                                                className="rounded border-slate-300 text-indigo-500"
                                                defaultChecked={editingAdmin.permissions.canViewProducts}
                                                name="canViewProducts"
                                                type="checkbox"
                                            />
                                            View Products
                                        </label>
                                        <label className="flex items-center gap-2 text-sm text-slate-600">
                                            <input
                                                className="rounded border-slate-300 text-indigo-500"
                                                defaultChecked={editingAdmin.permissions.canCreateProducts}
                                                name="canCreateProducts"
                                                type="checkbox"
                                            />
                                            Create Products
                                        </label>
                                        <label className="flex items-center gap-2 text-sm text-slate-600">
                                            <input
                                                className="rounded border-slate-300 text-indigo-500"
                                                defaultChecked={editingAdmin.permissions.canEditProducts}
                                                name="canEditProducts"
                                                type="checkbox"
                                            />
                                            Edit Products
                                        </label>
                                        <label className="flex items-center gap-2 text-sm text-slate-600">
                                            <input
                                                className="rounded border-slate-300 text-indigo-500"
                                                defaultChecked={editingAdmin.permissions.canDeleteProducts}
                                                name="canDeleteProducts"
                                                type="checkbox"
                                            />
                                            Delete Products
                                        </label>
                                        <label className="flex items-center gap-2 text-sm text-slate-600">
                                            <input
                                                className="rounded border-slate-300 text-indigo-500"
                                                defaultChecked={editingAdmin.permissions.canViewOrders}
                                                name="canViewOrders"
                                                type="checkbox"
                                            />
                                            View Orders
                                        </label>
                                        <label className="flex items-center gap-2 text-sm text-slate-600">
                                            <input
                                                className="rounded border-slate-300 text-indigo-500"
                                                defaultChecked={editingAdmin.permissions.canEditOrders}
                                                name="canEditOrders"
                                                type="checkbox"
                                            />
                                            Edit Orders
                                        </label>
                                        <label className="flex items-center gap-2 text-sm text-slate-600">
                                            <input
                                                className="rounded border-slate-300 text-indigo-500"
                                                defaultChecked={editingAdmin.permissions.canDeleteOrders}
                                                name="canDeleteOrders"
                                                type="checkbox"
                                            />
                                            Delete Orders
                                        </label>
                                        <label className="flex items-center gap-2 text-sm text-slate-600">
                                            <input
                                                className="rounded border-slate-300 text-indigo-500"
                                                defaultChecked={editingAdmin.permissions.canViewCustomers}
                                                name="canViewCustomers"
                                                type="checkbox"
                                            />
                                            View Customers
                                        </label>
                                        <label className="flex items-center gap-2 text-sm text-slate-600">
                                            <input
                                                className="rounded border-slate-300 text-indigo-500"
                                                defaultChecked={editingAdmin.permissions.canViewAnalytics}
                                                name="canViewAnalytics"
                                                type="checkbox"
                                            />
                                            View Analytics
                                        </label>
                                        <label className="flex items-center gap-2 text-sm text-slate-600">
                                            <input
                                                className="rounded border-slate-300 text-indigo-500"
                                                defaultChecked={editingAdmin.permissions.canEditSettings}
                                                name="canEditSettings"
                                                type="checkbox"
                                            />
                                            Edit Settings
                                        </label>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center justify-end gap-3 pt-4">
                                <button
                                    className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300"
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false);
                                        setEditingAdmin(null);
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-600"
                                    type="submit"
                                >
                                    {editingAdmin ? "Update Admin" : "Create Admin"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}
<span className="material-symbols-outlined text-sm">verified_user</span>
{ member.status }
                                        </span >
                                    </td >
                                    <td className="px-4 py-4">{member.lastLogin}</td>
                                    <td className="px-4 py-4">
                                        <div className="inline-flex items-center gap-2">
                                            <button className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600" type="button">
                                                <span className="material-symbols-outlined text-base">edit</span>
                                                Edit
                                            </button>
                                            <button className="inline-flex items-center gap-1 rounded-full border border-rose-200 px-3 py-1 text-xs font-semibold text-rose-600 transition hover:bg-rose-50" type="button">
                                                <span className="material-symbols-outlined text-base">lock_person</span>
                                                Revoke
                                            </button>
                                        </div>
                                    </td>
                                </tr >
                            ))}
                        </tbody >
                    </table >
                </div >
            </section >
        </main >
    );
}
