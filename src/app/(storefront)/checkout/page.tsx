"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { useCart } from "@/hooks/useCart";
import { apiRequest } from "@/lib/api-client";

function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    }).format(value);
}

export default function CheckoutPage() {
    const router = useRouter();
    const { items, subtotal, totalItems, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const tax = Math.round(subtotal * 0.06 * 100) / 100;
    const fees = subtotal > 0 ? 4.99 : 0;
    const total = subtotal + tax + fees;

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        country: "United States",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            // Prepare order data (backend will generate orderNumber)
            const orderData = {
                items: items.map((item) => ({
                    productId: item.product._id,
                    quantity: item.quantity,
                })),
                customer: {
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    phone: formData.phone,
                },
                billingAddress: {
                    line1: formData.address,
                    line2: formData.company || undefined,
                    city: formData.city,
                    state: formData.state,
                    postalCode: formData.postalCode,
                    country: formData.country,
                },
                subtotal,
                tax,
                shipping: fees,
                total,
            };

            // Create order via API
            const response = await apiRequest<{ orderNumber: string }>("/orders", {
                method: "POST",
                data: orderData,
            });

            // Clear cart and redirect to success page
            clearCart();
            router.push(`/checkout/success?orderNumber=${response.orderNumber}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to process order");
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <main className="flex flex-1 flex-col items-center justify-center bg-slate-50 px-4 py-16">
                <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                    <span className="material-symbols-outlined mx-auto mb-4 text-6xl text-slate-300">shopping_cart</span>
                    <h1 className="text-2xl font-semibold text-slate-900">Your cart is empty</h1>
                    <p className="mt-2 text-sm text-slate-600">Add some products before checking out</p>
                    <Link
                        href="/products"
                        className="mt-6 inline-flex items-center gap-2 rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
                    >
                        <span className="material-symbols-outlined text-base">shopping_bag</span>
                        Browse products
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="flex flex-1 flex-col bg-slate-50">
            <section className="bg-white pb-16 pt-28 shadow-sm">
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
                    <Link
                        href="/cart"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
                    >
                        <span className="material-symbols-outlined text-base">arrow_back</span>
                        Back to cart
                    </Link>
                    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div className="space-y-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Checkout</p>
                            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Confirm your details</h1>
                            <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
                                Provide your billing details. Digital downloads unlock instantly once your order is confirmed.
                            </p>
                        </div>
                        <div className="flex items-center gap-3 rounded-full bg-slate-900 px-5 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-white">
                            <span className="material-symbols-outlined text-base text-white/80">lock</span>
                            Secure checkout
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
                        <div className="space-y-10">
                            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                                <h2 className="text-lg font-semibold text-slate-900">Billing information</h2>
                                <div className="mt-8 grid gap-6 text-sm text-slate-600 lg:grid-cols-2">
                                    <label className="flex flex-col gap-2">
                                        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">First name *</span>
                                        <input
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                            placeholder="Jordan"
                                            required
                                        />
                                    </label>
                                    <label className="flex flex-col gap-2">
                                        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Last name *</span>
                                        <input
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                            placeholder="Rivera"
                                            required
                                        />
                                    </label>
                                    <label className="flex flex-col gap-2 lg:col-span-2">
                                        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Email *</span>
                                        <input
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                            placeholder="jordan@studio.com"
                                            required
                                        />
                                    </label>
                                    <label className="flex flex-col gap-2">
                                        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Phone</span>
                                        <input
                                            name="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                            placeholder="+1 (555) 123-4567"
                                        />
                                    </label>
                                    <label className="flex flex-col gap-2">
                                        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Company</span>
                                        <input
                                            name="company"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                            className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                            placeholder="Optional"
                                        />
                                    </label>
                                    <label className="flex flex-col gap-2 lg:col-span-2">
                                        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Address *</span>
                                        <input
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                            placeholder="120 Market Street Suite 220"
                                            required
                                        />
                                    </label>
                                    <label className="flex flex-col gap-2">
                                        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">City *</span>
                                        <input
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                            placeholder="San Francisco"
                                            required
                                        />
                                    </label>
                                    <label className="flex flex-col gap-2">
                                        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">State</span>
                                        <input
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                            placeholder="CA"
                                        />
                                    </label>
                                    <label className="flex flex-col gap-2">
                                        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Postal code *</span>
                                        <input
                                            name="postalCode"
                                            value={formData.postalCode}
                                            onChange={handleInputChange}
                                            className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                            placeholder="94105"
                                            required
                                        />
                                    </label>
                                    <label className="flex flex-col gap-2">
                                        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Country *</span>
                                        <select
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                            required
                                        >
                                            <option>United States</option>
                                            <option>Canada</option>
                                            <option>United Kingdom</option>
                                            <option>Australia</option>
                                        </select>
                                    </label>
                                </div>
                            </section>

                            {error && (
                                <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-600">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined">error</span>
                                        <p>{error}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <aside className="space-y-6">
                            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                                <h2 className="text-lg font-semibold text-slate-900">Order summary</h2>
                                <div className="mt-6 space-y-4">
                                    {items.map((item) => (
                                        <div key={item.product._id} className="flex gap-4">
                                            <div
                                                className="size-16 flex-shrink-0 rounded-lg bg-cover bg-center"
                                                style={{ backgroundImage: `url('${item.product.heroImage}')` }}
                                            />
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-slate-900">{item.product.name}</p>
                                                <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="text-sm font-semibold text-slate-900">
                                                {formatCurrency(item.product.price * item.quantity)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <dl className="mt-6 space-y-4 border-t border-slate-200 pt-6 text-sm">
                                    <div className="flex justify-between">
                                        <dt className="text-slate-600">Subtotal</dt>
                                        <dd className="font-semibold text-slate-900">{formatCurrency(subtotal)}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-slate-600">Tax (6%)</dt>
                                        <dd className="font-semibold text-slate-900">{formatCurrency(tax)}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-slate-600">Processing fee</dt>
                                        <dd className="font-semibold text-slate-900">{formatCurrency(fees)}</dd>
                                    </div>
                                    <div className="border-t border-slate-200 pt-4">
                                        <div className="flex justify-between">
                                            <dt className="text-base font-semibold text-slate-900">Total</dt>
                                            <dd className="text-base font-semibold text-indigo-600">{formatCurrency(total)}</dd>
                                        </div>
                                    </div>
                                </dl>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <span className="material-symbols-outlined text-base">shopping_cart_checkout</span>
                                    {loading ? "Processing..." : "Complete order"}
                                </button>

                                <p className="mt-4 text-center text-xs text-slate-500">
                                    By completing this order, you agree to our terms and conditions
                                </p>
                            </div>

                            <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm">
                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-indigo-500">verified_user</span>
                                    <div>
                                        <p className="font-semibold text-slate-900">Secure checkout</p>
                                        <p className="mt-1 text-xs text-slate-600">
                                            256-bit SSL encrypted payment processing
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </form>
            </section>
        </main>
    );
}
