import Link from "next/link";
import { catalogProducts } from "@/data/products";

type CartConfig = {
    productId: string;
    license: string;
    quantity: number;
    seatCount?: number;
    unitPrice?: number;
};

const cartItems: CartConfig[] = [
    {
        productId: "aurora-abstract-kit",
        license: "Commercial License",
        quantity: 1,
    },
    {
        productId: "neon-future-ui",
        license: "Extended Team",
        quantity: 1,
        seatCount: 5,
        unitPrice: 89,
    },
];

function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    }).format(value);
}

export default function CartPage() {
    const resolvedItems = cartItems
        .map((item) => {
            try {
                return resolveItem(item);
            } catch (error) {
                console.error(error);
                return undefined;
            }
        })
        .filter(Boolean) as Array<ReturnType<typeof resolveItem>>;

    const subtotal = resolvedItems.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
    const savings = 12;
    const processingFees = 4;
    const total = subtotal - savings + processingFees;

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
                                Curate your digital assets before heading to checkout. You can update license types, adjust team seats,
                                and add delivery notes.
                            </p>
                        </div>
                        <div className="flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-white/70">
                            <span className="material-symbols-outlined text-base">shopping_cart_checkout</span>
                            Step 1 of 3
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
                    <div className="space-y-6">
                        {resolvedItems.map((item) => (
                            <article
                                className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg md:grid-cols-[160px_1fr]"
                                key={item.productId}
                            >
                                <div
                                    className="h-40 w-full rounded-2xl bg-cover bg-center"
                                    style={{ backgroundImage: `url('${item.image}')` }}
                                />
                                <div className="flex flex-col justify-between gap-4">
                                    <div className="space-y-3">
                                        <div className="flex flex-wrap items-start justify-between gap-4">
                                            <div>
                                                <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
                                                <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-semibold text-indigo-600">
                                                    {formatCurrency(item.unitPrice)}
                                                </div>
                                                <div className="text-xs text-slate-500">Per license</div>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                                            <span className="inline-flex items-center gap-1">
                                                <span className="material-symbols-outlined text-base text-amber-500">star</span>
                                                {item.rating.toFixed(1)} rating
                                            </span>
                                            <span className="inline-flex items-center gap-1">
                                                <span className="material-symbols-outlined text-base text-slate-400">workspace_premium</span>
                                                {item.license}
                                            </span>
                                            {item.seatCount ? (
                                                <span className="inline-flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-base text-slate-400">group</span>
                                                    {item.seatCount} seats
                                                </span>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center justify-between gap-4">
                                        <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700">
                                            <button className="flex size-8 items-center justify-center rounded-full bg-white text-slate-600 transition hover:bg-slate-100">
                                                <span className="material-symbols-outlined text-base">remove</span>
                                            </button>
                                            <span className="px-2 text-base font-semibold">{item.quantity}</span>
                                            <button className="flex size-8 items-center justify-center rounded-full bg-white text-slate-600 transition hover:bg-slate-100">
                                                <span className="material-symbols-outlined text-base">add</span>
                                            </button>
                                        </div>
                                        <div className="flex gap-3 text-sm">
                                            <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 font-semibold text-slate-600 transition hover:-translate-y-0.5">
                                                <span className="material-symbols-outlined text-base">bookmark_add</span>
                                                Save for later
                                            </button>
                                            <button className="inline-flex items-center gap-2 rounded-full border border-transparent bg-rose-50 px-4 py-2 font-semibold text-rose-600 transition hover:-translate-y-0.5 hover:bg-rose-100">
                                                <span className="material-symbols-outlined text-base">delete</span>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}

                        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-600">
                            <div className="flex flex-wrap items-center gap-4">
                                <span className="material-symbols-outlined text-base text-indigo-500">redeem</span>
                                <input
                                    className="flex-1 rounded-full border border-slate-200 px-4 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                    placeholder="Gift card or voucher"
                                />
                                <button className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5">
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>

                    <aside className="h-fit space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">Order summary</h2>
                            <dl className="mt-6 space-y-4 text-sm text-slate-600">
                                <div className="flex items-center justify-between">
                                    <dt>Subtotal</dt>
                                    <dd>{formatCurrency(subtotal)}</dd>
                                </div>
                                <div className="flex items-center justify-between text-emerald-600">
                                    <dt>Bundle savings</dt>
                                    <dd>-{formatCurrency(savings)}</dd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <dt>Processing fees</dt>
                                    <dd>{formatCurrency(processingFees)}</dd>
                                </div>
                                <div className="flex items-center justify-between text-xs uppercase tracking-[0.4em] text-slate-400">
                                    <dt>Total due</dt>
                                    <dd className="text-base font-semibold text-slate-900">{formatCurrency(total)}</dd>
                                </div>
                            </dl>
                        </div>
                        <div className="rounded-3xl bg-slate-50 p-5 text-sm text-slate-600">
                            <div className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-base text-slate-400">lock</span>
                                <div>
                                    <div className="font-semibold text-slate-900">Secure checkout</div>
                                    <p className="mt-1 text-slate-600">Payments are encrypted and processed with 3D Secure compliance.</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Link
                                href="/checkout"
                                className="flex w-full items-center justify-center gap-2 rounded-full bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                            >
                                <span className="material-symbols-outlined text-base">credit_card</span>
                                Continue to checkout
                            </Link>
                            <Link
                                href="/products"
                                className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5"
                            >
                                <span className="material-symbols-outlined text-base">arrow_backward</span>
                                Keep browsing
                            </Link>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}

function resolveItem(item: CartConfig) {
    const product = catalogProducts.find((catalogProduct) => catalogProduct.id === item.productId);
    if (!product) {
        throw new Error(`Unknown product id: ${item.productId}`);
    }

    const unitPrice =
        typeof item.unitPrice === "number" ? item.unitPrice : Number.parseFloat(product.price.replace("$", ""));

    return {
        ...item,
        title: product.title,
        description: product.description,
        image: product.image,
        priceLabel: product.price,
        unitPrice,
        rating: product.rating,
    };
}
