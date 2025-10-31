"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";

function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    }).format(value);
}

export default function CartPage() {
    const { items, updateQuantity, removeFromCart, subtotal, totalItems, clearCart } = useCart();

    const tax = Math.round(subtotal * 0.06 * 100) / 100;
    const shipping = subtotal > 0 ? 4.99 : 0;
    const total = subtotal + tax + shipping;

    if (items.length === 0) {
        return (
            <main className="flex flex-1 flex-col bg-slate-50">
                <section className="bg-slate-900 pb-20 pt-28 text-white">
                    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white"
                        >
                            <span className="material-symbols-outlined text-base">arrow_back</span>
                            Continue browsing
                        </Link>
                        <div className="space-y-4">
                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Your cart is empty</h1>
                            <p className="max-w-2xl text-sm text-white/70 sm:text-base">
                                Discover our collection of digital design assets and start building your creative toolkit.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-12 text-center">
                        <span className="material-symbols-outlined mb-4 text-6xl text-slate-300">shopping_cart</span>
                        <h2 className="text-xl font-semibold text-slate-900">No items in cart</h2>
                        <p className="mt-2 text-sm text-slate-600">Browse our products and add items to get started</p>
                        <Link
                            href="/products"
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
                        >
                            <span className="material-symbols-outlined text-base">shopping_bag</span>
                            Browse products
                        </Link>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main className="flex flex-1 flex-col bg-slate-50">
            <section className="bg-slate-900 pb-20 pt-28 text-white">
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white"
                    >
                        <span className="material-symbols-outlined text-base">arrow_back</span>
                        Continue browsing
                    </Link>
                    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div className="space-y-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60">Checkout flow</p>
                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Review your cart</h1>
                            <p className="max-w-2xl text-sm text-white/70 sm:text-base">
                                {totalItems} {totalItems === 1 ? "item" : "items"} ready for checkout
                            </p>
                        </div>
                        <div className="flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-white/70">
                            <span className="material-symbols-outlined text-base">shopping_cart_checkout</span>
                            Step 1 of 2
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
                    <div className="space-y-6">
                        {items.map((item) => (
                            <article
                                className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg md:grid-cols-[160px_1fr]"
                                key={item.product._id}
                            >
                                <div
                                    className="h-40 w-full rounded-2xl bg-cover bg-center"
                                    style={{
                                        backgroundImage: `url('${item.product.heroImage || "/placeholder.jpg"}')`,
                                    }}
                                />
                                <div className="flex flex-col justify-between gap-4">
                                    <div className="space-y-3">
                                        <div className="flex flex-wrap items-start justify-between gap-4">
                                            <div>
                                                <h2 className="text-lg font-semibold text-slate-900">{item.product.name}</h2>
                                                <p className="mt-1 text-sm text-slate-600">{item.product.description}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-semibold text-indigo-600">
                                                    {formatCurrency(item.product.price)}
                                                </div>
                                                <div className="text-xs text-slate-500">Per unit</div>
                                            </div>
                                        </div>
                                        {item.license && (
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <span className="material-symbols-outlined text-base text-slate-400">workspace_premium</span>
                                                {item.license}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap items-center justify-between gap-4">
                                        <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700">
                                            <button
                                                onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                                                className="flex size-8 items-center justify-center rounded-full bg-white text-slate-600 transition hover:bg-slate-100 disabled:opacity-50"
                                                disabled={item.quantity <= 1}
                                            >
                                                <span className="material-symbols-outlined text-base">remove</span>
                                            </button>
                                            <span className="px-2 text-base font-semibold">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                                                className="flex size-8 items-center justify-center rounded-full bg-white text-slate-600 transition hover:bg-slate-100"
                                            >
                                                <span className="material-symbols-outlined text-base">add</span>
                                            </button>
                                        </div>
                                        <div className="flex gap-3 text-sm">
                                            <button
                                                onClick={() => removeFromCart(item.product._id)}
                                                className="inline-flex items-center gap-2 rounded-full border border-transparent bg-rose-50 px-4 py-2 font-semibold text-rose-600 transition hover:-translate-y-0.5 hover:bg-rose-100"
                                            >
                                                <span className="material-symbols-outlined text-base">delete</span>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}

                        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-600">
                            <div className="flex items-center justify-between">
                                <p>Have a promo code or gift card?</p>
                                <button className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                                    Apply discount
                                </button>
                            </div>
                        </div>
                    </div>

                    <aside className="space-y-6">
                        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                            <h2 className="text-lg font-semibold text-slate-900">Order summary</h2>
                            <dl className="mt-6 space-y-4 text-sm">
                                <div className="flex justify-between">
                                    <dt className="text-slate-600">Subtotal ({totalItems} items)</dt>
                                    <dd className="font-semibold text-slate-900">{formatCurrency(subtotal)}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-slate-600">Tax (6%)</dt>
                                    <dd className="font-semibold text-slate-900">{formatCurrency(tax)}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-slate-600">Processing fee</dt>
                                    <dd className="font-semibold text-slate-900">{formatCurrency(shipping)}</dd>
                                </div>
                                <div className="border-t border-slate-200 pt-4">
                                    <div className="flex justify-between">
                                        <dt className="text-base font-semibold text-slate-900">Total</dt>
                                        <dd className="text-base font-semibold text-indigo-600">{formatCurrency(total)}</dd>
                                    </div>
                                </div>
                            </dl>

                            <Link
                                href="/checkout"
                                className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-indigo-600"
                            >
                                <span className="material-symbols-outlined text-base">shopping_cart_checkout</span>
                                Proceed to checkout
                            </Link>

                            <button
                                onClick={clearCart}
                                className="mt-4 w-full text-center text-sm text-slate-500 transition hover:text-slate-700"
                            >
                                Clear cart
                            </button>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm">
                            <div className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-indigo-500">verified_user</span>
                                <div>
                                    <p className="font-semibold text-slate-900">Secure checkout</p>
                                    <p className="mt-1 text-xs text-slate-600">
                                        Your payment information is encrypted and secure
                                    </p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}
