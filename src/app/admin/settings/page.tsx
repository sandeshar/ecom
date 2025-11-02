"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api-client";
import { useAuth } from "@/hooks/useAuth";

interface Settings {
    _id: string;
    storeName: string;
    supportEmail: string;
    supportPhone: string;
    timezone: string;
    currency: string;
    taxRate: number;
    shippingFee: number;
    notificationsEnabled: boolean;
    lowStockThreshold: number;
    orderNotifications: boolean;
    inventoryNotifications: boolean;
}

export default function AdminSettingsPage() {
    const { token } = useAuth();
    const [settings, setSettings] = useState<Settings | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const data = await apiRequest<Settings>("/settings");
            setSettings(data);
        } catch (error) {
            console.error("Failed to fetch settings:", error);
            setMessage({ type: "error", text: "Failed to load settings" });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);

        const formData = new FormData(e.currentTarget);
        const updatedSettings = {
            storeName: formData.get("storeName") as string,
            supportEmail: formData.get("supportEmail") as string,
            supportPhone: formData.get("supportPhone") as string,
            timezone: formData.get("timezone") as string,
            currency: formData.get("currency") as string,
            taxRate: parseFloat(formData.get("taxRate") as string) || 0,
            shippingFee: parseFloat(formData.get("shippingFee") as string) || 0,
            notificationsEnabled: formData.get("notificationsEnabled") === "on",
            lowStockThreshold: parseInt(formData.get("lowStockThreshold") as string) || 10,
            orderNotifications: formData.get("orderNotifications") === "on",
            inventoryNotifications: formData.get("inventoryNotifications") === "on",
        };

        try {
            const response = await apiRequest<{ message: string; settings: Settings }>("/settings", {
                method: "PUT",
                token,
                data: updatedSettings,
            });
            setSettings(response.settings);
            setMessage({ type: "success", text: "Settings saved successfully!" });
        } catch (error) {
            console.error("Failed to save settings:", error);
            setMessage({ type: "error", text: "Failed to save settings" });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <main className="flex flex-1 flex-col items-center justify-center">
                <div className="text-slate-600">Loading settings...</div>
            </main>
        );
    }

    if (!settings) {
        return (
            <main className="flex flex-1 flex-col items-center justify-center">
                <div className="text-red-600">Failed to load settings</div>
            </main>
        );
    }

    return (
        <main className="flex flex-1 flex-col">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex w-full max-w-4xl flex-col gap-3 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Settings</p>
                        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Store preferences</h1>
                        <p className="mt-2 max-w-xl text-sm text-slate-600">
                            Update the essentials for your storefront in seconds. Everything here keeps the business running smoothly.
                        </p>
                    </div>
                    <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600" type="button">
                        <span className="material-symbols-outlined text-base">help</span>
                        Get help
                    </button>
                </div>
            </header>

            <section className="mx-auto w-full max-w-4xl px-6 pb-16 pt-10">
                {message && (
                    <div className={`mb-4 rounded-xl border p-4 ${message.type === "success" ? "border-green-200 bg-green-50 text-green-800" : "border-red-200 bg-red-50 text-red-800"}`}>
                        {message.text}
                    </div>
                )}

                <form className="space-y-8" onSubmit={handleSubmit}>
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-base font-semibold text-slate-900">Store identity</h2>
                        <div className="mt-4 grid gap-5 sm:grid-cols-2">
                            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                                Store name
                                <input
                                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                    defaultValue={settings.storeName}
                                    name="storeName"
                                    type="text"
                                    required
                                />
                            </label>
                            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                                Support email
                                <input
                                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                    defaultValue={settings.supportEmail}
                                    name="supportEmail"
                                    type="email"
                                    required
                                />
                            </label>
                            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                                Support phone
                                <input
                                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                    defaultValue={settings.supportPhone}
                                    name="supportPhone"
                                    type="tel"
                                />
                            </label>
                            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                                Timezone
                                <select
                                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                    defaultValue={settings.timezone}
                                    name="timezone"
                                >
                                    <option>GMT-05:00 Eastern Time</option>
                                    <option>GMT-06:00 Central Time</option>
                                    <option>GMT-07:00 Mountain Time</option>
                                    <option>GMT-08:00 Pacific Time</option>
                                    <option>GMT+00:00 UTC</option>
                                </select>
                            </label>
                            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                                Currency
                                <select
                                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                    defaultValue={settings.currency}
                                    name="currency"
                                >
                                    <option>USD</option>
                                    <option>CAD</option>
                                    <option>EUR</option>
                                    <option>GBP</option>
                                </select>
                            </label>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-base font-semibold text-slate-900">Pricing & Fees</h2>
                        <div className="mt-4 grid gap-5 sm:grid-cols-2">
                            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                                Tax rate (%)
                                <input
                                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                    defaultValue={(settings.taxRate * 100).toFixed(2)}
                                    name="taxRate"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="100"
                                />
                            </label>
                            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                                Shipping fee ($)
                                <input
                                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                    defaultValue={settings.shippingFee.toFixed(2)}
                                    name="shippingFee"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                />
                            </label>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-base font-semibold text-slate-900">Inventory</h2>
                        <div className="mt-4">
                            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                                Low stock threshold
                                <input
                                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                    defaultValue={settings.lowStockThreshold}
                                    name="lowStockThreshold"
                                    type="number"
                                    min="0"
                                />
                                <span className="text-xs text-slate-500">Alert when stock falls below this number</span>
                            </label>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-base font-semibold text-slate-900">Notifications</h2>
                        <div className="mt-4 space-y-4 text-sm text-slate-600">
                            <label className="flex items-center gap-3">
                                <input
                                    className="size-4 rounded border-slate-300 text-indigo-500 focus:ring-indigo-500"
                                    defaultChecked={settings.notificationsEnabled}
                                    name="notificationsEnabled"
                                    type="checkbox"
                                />
                                Enable all notifications
                            </label>
                            <label className="flex items-center gap-3">
                                <input
                                    className="size-4 rounded border-slate-300 text-indigo-500 focus:ring-indigo-500"
                                    defaultChecked={settings.orderNotifications}
                                    name="orderNotifications"
                                    type="checkbox"
                                />
                                Send notifications for new orders
                            </label>
                            <label className="flex items-center gap-3">
                                <input
                                    className="size-4 rounded border-slate-300 text-indigo-500 focus:ring-indigo-500"
                                    defaultChecked={settings.inventoryNotifications}
                                    name="inventoryNotifications"
                                    type="checkbox"
                                />
                                Send alerts for low inventory
                            </label>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3">
                        <button
                            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600"
                            type="button"
                            onClick={() => window.location.reload()}
                        >
                            Cancel
                        </button>
                        <button
                            className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-600 disabled:opacity-50"
                            type="submit"
                            disabled={saving}
                        >
                            <span className="material-symbols-outlined text-base">save</span>
                            {saving ? "Saving..." : "Save changes"}
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
}
