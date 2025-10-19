import Link from "next/link";
import { notFound } from "next/navigation";
import { catalogProducts } from "@/data/products";
import { orderTimeline, orders, type OrderStatus } from "@/data/admin/orders";

type AdminOrderDetailPageProps = {
    params: {
        orderId: string;
    };
};

type OrderLineItem = {
    sku: string;
    title: string;
    license: string;
    quantity: number;
    unitPrice: number;
    image: string;
};

const statusStyles: Record<OrderStatus, { badge: string; text: string }> = {
    Processing: { badge: "bg-amber-50 text-amber-600", text: "text-amber-600" },
    Fulfilled: { badge: "bg-emerald-50 text-emerald-600", text: "text-emerald-600" },
    "Awaiting pickup": { badge: "bg-sky-50 text-sky-600", text: "text-sky-600" },
    "Refund requested": { badge: "bg-rose-50 text-rose-600", text: "text-rose-600" },
};

function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    }).format(value);
}

function buildLineItems(total: number, itemCount: number): OrderLineItem[] {
    const safeCount = Math.max(1, itemCount);
    const sampleProducts = catalogProducts.slice(0, Math.max(1, Math.min(safeCount, catalogProducts.length)));
    const unitPrice = total / safeCount;

    return sampleProducts.map((product, index) => ({
        sku: `SKU-${product.id.toUpperCase().slice(0, 6)}`,
        title: product.title,
        license: index % 2 === 0 ? "Commercial" : "Extended",
        quantity: 1,
        unitPrice,
        image: product.image,
    }));
}

export default function AdminOrderDetailPage({ params }: AdminOrderDetailPageProps) {
    const order = orders.find((item) => item.id.replace("#", "") === params.orderId);
    if (!order) {
        return notFound();
    }

    const styles = statusStyles[order.status];
    const fees = 4;
    const tax = Math.round(order.total * 0.06 * 100) / 100;
    const subtotalTarget = Math.max(order.total - tax - fees, 0);
    const lineItems = buildLineItems(subtotalTarget, order.items);
    const subtotal = lineItems.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
    const grandTotal = subtotal + fees + tax;

    return (
        <main className="flex flex-1 flex-col">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <Link
                            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 transition hover:text-indigo-500"
                            href="/admin/orders"
                        >
                            <span className="material-symbols-outlined text-base">arrow_back</span>
                            All orders
                        </Link>
                        <h1 className="mt-4 text-3xl font-semibold text-slate-900">Order {order.id}</h1>
                        <p className="mt-1 text-sm text-slate-600">Placed {order.placedAt}</p>
                    </div>
                    <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${styles.badge}`}>
                        <span className="material-symbols-outlined text-base">local_shipping</span>
                        {order.status}
                    </span>
                </div>
            </header>

            <section className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-12">
                <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <h2 className="text-base font-semibold text-slate-900">Line items</h2>
                            <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600">
                                <span className="material-symbols-outlined text-sm">download</span>
                                Download invoice
                            </button>
                        </div>
                        <div className="mt-6 space-y-4">
                            {lineItems.map((item) => (
                                <article className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4" key={item.sku}>
                                    <div
                                        className="size-16 flex-none rounded-2xl bg-cover bg-center"
                                        style={{ backgroundImage: `url('${item.image}')` }}
                                    />
                                    <div className="flex-1">
                                        <div className="font-semibold text-slate-900">{item.title}</div>
                                        <div className="text-xs text-slate-500">{item.license} license</div>
                                        <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                                            {item.sku}
                                        </div>
                                    </div>
                                    <div className="text-right text-sm">
                                        <div className="font-semibold text-slate-900">{formatCurrency(item.unitPrice)}</div>
                                        <div className="text-xs text-slate-500">Qty {item.quantity}</div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                    <aside className="space-y-6">
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h2 className="text-base font-semibold text-slate-900">Customer</h2>
                            <p className="mt-3 text-sm text-slate-600">
                                {order.customer} · {order.email}
                            </p>
                            <div className="mt-4 space-y-2 text-xs text-slate-500">
                                <p>Fulfilment ETA: <span className={`font-semibold ${styles.text}`}>{order.fulfillmentEta}</span></p>
                                <p>Payment method: Visa ending 4242</p>
                                <p>Delivery channel: Instant download + email receipt</p>
                            </div>
                        </div>
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h2 className="text-base font-semibold text-slate-900">Totals</h2>
                            <dl className="mt-4 space-y-3 text-sm text-slate-600">
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
                                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
                                    <dt>Total collected</dt>
                                    <dd className="text-base font-semibold text-slate-900">{formatCurrency(grandTotal)}</dd>
                                </div>
                            </dl>
                        </div>
                    </aside>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <h2 className="text-base font-semibold text-slate-900">Timeline</h2>
                            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Live</span>
                        </div>
                        <ul className="mt-4 space-y-4 text-sm text-slate-600">
                            {orderTimeline.map((event) => (
                                <li className="flex items-start gap-3 rounded-2xl border border-slate-100 px-4 py-3" key={event.id}>
                                    <span className="material-symbols-outlined text-base text-indigo-500">{event.icon}</span>
                                    <div>
                                        <div className="font-semibold text-slate-900">{event.title}</div>
                                        <p className="text-xs text-slate-500">{event.description}</p>
                                        <div className="mt-1 text-xs text-slate-400">{event.timestamp}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-base font-semibold text-slate-900">Internal notes</h2>
                        <div className="mt-4 space-y-3 text-sm text-slate-600">
                            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">CX team</span>
                                    <span className="text-xs text-slate-400">Today · 10:12 AM</span>
                                </div>
                                <p className="mt-2">
                                    Confirmed customer prefers email updates. Linked licence keys delivered successfully.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Operations</span>
                                    <span className="text-xs text-slate-400">Yesterday · 6:45 PM</span>
                                </div>
                                <p className="mt-2">
                                    Refund workflow ready if courier misses pickup window. Customer flagged as VIP.
                                </p>
                            </div>
                        </div>
                        <button className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600">
                            <span className="material-symbols-outlined text-base">note_add</span>
                            Add note
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
