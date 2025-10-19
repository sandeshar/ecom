import Link from "next/link";
import { catalogProducts } from "@/data/products";

type CheckoutItem = {
    productId: string;
    license: string;
    quantity: number;
    unitPrice?: number;
};

const checkoutItems: CheckoutItem[] = [
    { productId: "aurora-abstract-kit", license: "Commercial License", quantity: 1 },
    { productId: "neon-future-ui", license: "Extended Team", quantity: 1, unitPrice: 89 },
];

function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    }).format(value);
}

function resolveCheckoutItem(item: CheckoutItem) {
    const product = catalogProducts.find((catalogProduct) => catalogProduct.id === item.productId);
    if (!product) {
        throw new Error(`Unknown product id: ${item.productId}`);
    }

    const unitPrice =
        typeof item.unitPrice === "number" ? item.unitPrice : Number.parseFloat(product.price.replace("$", ""));

    return {
        ...item,
        title: product.title,
        image: product.image,
        description: product.description,
        unitPrice,
    };
}

export default function CheckoutPage() {
    const items = checkoutItems.map(resolveCheckoutItem);
    const subtotal = items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
    const tax = Math.round(subtotal * 0.06 * 100) / 100;
    const fees = 4;
    const total = subtotal + tax + fees;

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
                                Provide your billing details and preferred payment method. Digital downloads unlock instantly once your
                                payment is confirmed.
                            </p>
                        </div>
                        <div className="flex items-center gap-3 rounded-full bg-slate-900 px-5 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-white">
                            <span className="material-symbols-outlined text-base text-white/80">lock</span>
                            256-bit encrypted checkout
                        </div>
                    </div>
                    <ol className="flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
                        <li className="flex items-center gap-2 text-slate-900">
                            <span className="flex size-8 items-center justify-center rounded-full bg-slate-900 text-white">1</span>
                            Cart
                        </li>
                        <span className="material-symbols-outlined text-base text-slate-300">arrow_forward</span>
                        <li className="flex items-center gap-2 text-slate-900">
                            <span className="flex size-8 items-center justify-center rounded-full bg-indigo-500 text-white">2</span>
                            Details
                        </li>
                        <span className="material-symbols-outlined text-base text-slate-300">arrow_forward</span>
                        <li className="flex items-center gap-2 text-slate-300">
                            <span className="flex size-8 items-center justify-center rounded-full border border-slate-200">3</span>
                            Download
                        </li>
                    </ol>
                </div>
            </section>

            <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
                    <div className="space-y-10">
                        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                            <h2 className="text-lg font-semibold text-slate-900">Billing information</h2>
                            <form className="mt-8 grid gap-6 text-sm text-slate-600 lg:grid-cols-2">
                                <label className="flex flex-col gap-2">
                                    <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">First name</span>
                                    <input
                                        className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                        placeholder="Jordan"
                                    />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Last name</span>
                                    <input
                                        className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                        placeholder="Rivera"
                                    />
                                </label>
                                <label className="flex flex-col gap-2 lg:col-span-2">
                                    <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Company</span>
                                    <input
                                        className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                        placeholder="Rivera Creative Studio"
                                    />
                                </label>
                                <label className="flex flex-col gap-2 lg:col-span-2">
                                    <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Email</span>
                                    <input
                                        className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                        placeholder="jordan@studio.com"
                                        type="email"
                                    />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Country</span>
                                    <select className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100">
                                        <option>United States</option>
                                        <option>Canada</option>
                                        <option>United Kingdom</option>
                                        <option>Australia</option>
                                    </select>
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">VAT / Tax ID</span>
                                    <input
                                        className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                        placeholder="Optional"
                                    />
                                </label>
                                <label className="flex flex-col gap-2 lg:col-span-2">
                                    <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Address</span>
                                    <input
                                        className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                        placeholder="120 Market Street Suite 220"
                                    />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">City</span>
                                    <input
                                        className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                        placeholder="San Francisco"
                                    />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Postal code</span>
                                    <input
                                        className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                        placeholder="94105"
                                    />
                                </label>
                            </form>
                        </section>

                        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-slate-900">Payment method</h2>
                                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-400">
                                    <span className="material-symbols-outlined text-base">verified_user</span>
                                    PCI compliant
                                </div>
                            </div>
                            <div className="mt-6 grid gap-6 text-sm text-slate-600">
                                <div className="flex flex-wrap gap-4">
                                    <button className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white">
                                        <span className="material-symbols-outlined text-base">credit_score</span>
                                        Card
                                    </button>
                                    <button className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 transition hover:text-slate-900">
                                        <span className="material-symbols-outlined text-base">account_balance</span>
                                        Bank
                                    </button>
                                    <button className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 transition hover:text-slate-900">
                                        <span className="material-symbols-outlined text-base">currency_bitcoin</span>
                                        Crypto
                                    </button>
                                </div>
                                <div className="grid gap-4 lg:grid-cols-2">
                                    <label className="flex flex-col gap-2">
                                        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Card number</span>
                                        <input
                                            className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                            placeholder="4242 4242 4242 4242"
                                        />
                                    </label>
                                    <label className="flex flex-col gap-2">
                                        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Expiry</span>
                                        <input
                                            className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                            placeholder="08 / 27"
                                        />
                                    </label>
                                    <label className="flex flex-col gap-2">
                                        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">CVC</span>
                                        <input
                                            className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                            placeholder="123"
                                        />
                                    </label>
                                    <label className="flex flex-col gap-2">
                                        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Cardholder name</span>
                                        <input
                                            className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                            placeholder="Jordan Rivera"
                                        />
                                    </label>
                                </div>
                                <label className="flex items-start gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-500">
                                    <input className="mt-1 size-4 rounded border-slate-300" defaultChecked type="checkbox" />
                                    <span>
                                        Save this card for future marketplace purchases. You can manage payments from your account
                                        dashboard.
                                    </span>
                                </label>
                            </div>
                        </section>
                    </div>

                    <aside className="space-y-8">
                        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                            <h2 className="text-lg font-semibold text-slate-900">Order summary</h2>
                            <div className="mt-6 space-y-5 text-sm text-slate-600">
                                {items.map((item) => (
                                    <div className="flex items-center gap-4" key={item.productId}>
                                        <div
                                            className="size-16 rounded-2xl bg-cover bg-center"
                                            style={{ backgroundImage: `url('${item.image}')` }}
                                        />
                                        <div className="flex-1">
                                            <div className="font-semibold text-slate-900">{item.title}</div>
                                            <div className="text-xs text-slate-500">{item.license}</div>
                                        </div>
                                        <div className="text-sm font-semibold text-slate-900">
                                            {formatCurrency(item.unitPrice * item.quantity)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <dl className="mt-6 space-y-4 text-sm text-slate-600">
                                <div className="flex items-center justify-between">
                                    <dt>Subtotal</dt>
                                    <dd>{formatCurrency(subtotal)}</dd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <dt>Tax</dt>
                                    <dd>{formatCurrency(tax)}</dd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <dt>Platform fees</dt>
                                    <dd>{formatCurrency(fees)}</dd>
                                </div>
                                <div className="flex items-center justify-between text-xs uppercase tracking-[0.4em] text-slate-400">
                                    <dt>Total</dt>
                                    <dd className="text-base font-semibold text-slate-900">{formatCurrency(total)}</dd>
                                </div>
                            </dl>
                            <div className="mt-6 rounded-3xl bg-slate-900 p-5 text-white">
                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-base text-emerald-300">workspace_premium</span>
                                    <div className="text-sm text-white/80">
                                        Includes lifetime updates and upcoming add-on releases. Invite unlimited collaborators to review
                                        the source files.
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                            <h2 className="text-lg font-semibold text-slate-900">Delivery options</h2>
                            <div className="mt-6 space-y-4 text-sm text-slate-600">
                                <label className="flex items-start gap-3 rounded-3xl border border-indigo-200 bg-indigo-50 p-4">
                                    <input className="mt-1 size-4" defaultChecked name="delivery" type="radio" />
                                    <span>
                                        Instant download via email link and dashboard access. You&apos;ll receive receipts for tax reporting.
                                    </span>
                                </label>
                                <label className="flex items-start gap-3 rounded-3xl border border-slate-200 p-4">
                                    <input className="mt-1 size-4" name="delivery" type="radio" />
                                    <span>Schedule delivery with team onboarding checklist and video walkthrough.</span>
                                </label>
                            </div>
                        </section>

                        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                            <h2 className="text-lg font-semibold text-slate-900">Review & submit</h2>
                            <ul className="mt-5 space-y-3 text-sm text-slate-600">
                                <li className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-base text-indigo-500">check_circle</span>
                                    VAT invoices automatically generated
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-base text-indigo-500">check_circle</span>
                                    Extended downloads & version history
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-base text-indigo-500">check_circle</span>
                                    Priority support from creators within 24h
                                </li>
                            </ul>
                            <Link
                                href="/checkout/success"
                                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                            >
                                <span className="material-symbols-outlined text-base">rocket_launch</span>
                                Place order & download
                            </Link>
                            <p className="mt-3 text-xs text-slate-500">
                                By placing your order, you agree to the marketplace terms, creator policies, and license agreements.
                            </p>
                        </section>
                    </aside>
                </div>
            </section>
        </main>
    );
}
