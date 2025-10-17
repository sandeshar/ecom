import Link from "next/link";

const kpiCards = [
    { label: "Gross revenue", value: "$128,400", trend: "+12.4%", icon: "stacked_line_chart", accent: "text-emerald-500" },
    { label: "Active creators", value: "248", trend: "+18", icon: "diversity_3", accent: "text-indigo-500" },
    { label: "Average order", value: "$56.20", trend: "+6.1%", icon: "shopping_bag", accent: "text-amber-500" },
    { label: "Refund rate", value: "1.2%", trend: "-0.4%", icon: "shield_person", accent: "text-rose-500" },
];

const recentOrders = [
    {
        id: "#2047",
        customer: "Jordan Rivera",
        product: "Aurora Abstract Kit",
        total: "$38",
        status: "Completed",
        time: "2m ago",
    },
    {
        id: "#2046",
        customer: "Daphne Lewis",
        product: "Neon Future UI",
        total: "$89",
        status: "Processing",
        time: "18m ago",
    },
    {
        id: "#2045",
        customer: "Kellan Ortiz",
        product: "Minimal Branding",
        total: "$52",
        status: "Completed",
        time: "1h ago",
    },
    {
        id: "#2042",
        customer: "Nora Singh",
        product: "Cerulean Illustrations",
        total: "$42",
        status: "Disputed",
        time: "3h ago",
    },
];

const pipelineStages = [
    { label: "New submissions", value: 32, description: "Awaiting review", icon: "inbox" },
    { label: "Review in progress", value: 12, description: "Feedback shared", icon: "draft" },
    { label: "Launch-ready", value: 7, description: "Scheduled releases", icon: "rocket" },
];

const topCreators = [
    { name: "Lena Montoya", sales: "$24,120", products: 12, avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=200&q=80" },
    { name: "Studio Voxel", sales: "$19,870", products: 8, avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80" },
    { name: "Mira Campos", sales: "$15,430", products: 6, avatar: "https://images.unsplash.com/photo-1550525811-e5869dd03032?auto=format&fit=crop&w=200&q=80" },
];

export default function AdminDashboardPage() {
    return (
        <main className="flex flex-1 flex-col bg-slate-950 text-white">
            <section className="relative overflow-hidden pb-20 pt-28">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-slate-950 to-slate-950" />
                <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "56px 56px" }} />
                <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div className="space-y-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60">Admin overview</p>
                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Creator marketplace control centre</h1>
                            <p className="max-w-2xl text-sm text-white/70 sm:text-base">
                                Monitor revenue, manage creator submissions, and keep your marketplace operations running smoothly from
                                one dashboard.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                                <span className="material-symbols-outlined text-base">schedule</span>
                                Last sync: 2m ago
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                                <span className="material-symbols-outlined text-base">notifications_active</span>
                                4 alerts
                            </span>
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {kpiCards.map((card) => (
                            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur" key={card.label}>
                                <div className="flex items-center justify-between text-white/60">
                                    <span className="text-xs uppercase tracking-[0.3em]">{card.label}</span>
                                    <span className={`material-symbols-outlined text-xl ${card.accent}`}>{card.icon}</span>
                                </div>
                                <div className="mt-4 text-3xl font-semibold">{card.value}</div>
                                <div className="mt-2 text-sm text-white/60">{card.trend} vs last 30 days</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative z-10 -mt-12 bg-slate-50 px-4 pb-16 pt-12 text-slate-900 sm:px-6 lg:px-8">
                <div className="mx-auto grid w-full max-w-7xl gap-10">
                    <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-slate-900">Recent orders</h2>
                                <Link className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-500" href="#">
                                    View all
                                </Link>
                            </div>
                            <div className="mt-6 space-y-4">
                                {recentOrders.map((order) => (
                                    <div className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-6" key={order.id}>
                                        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{order.id}</div>
                                        <div className="md:col-span-2">
                                            <div className="text-sm font-semibold text-slate-900">{order.customer}</div>
                                            <div className="text-xs text-slate-500">{order.product}</div>
                                        </div>
                                        <div className="text-sm font-semibold text-slate-900">{order.total}</div>
                                        <div>
                                            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                                                <span className="material-symbols-outlined text-base">task_alt</span>
                                                {order.status}
                                            </span>
                                        </div>
                                        <div className="text-xs text-slate-500 md:text-right">{order.time}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                <h2 className="text-lg font-semibold text-slate-900">Submission pipeline</h2>
                                <div className="mt-6 space-y-4">
                                    {pipelineStages.map((stage) => (
                                        <div
                                            className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4"
                                            key={stage.label}
                                        >
                                            <div>
                                                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                                                    <span className="material-symbols-outlined text-base text-indigo-500">{stage.icon}</span>
                                                    {stage.label}
                                                </div>
                                                <div className="mt-1 text-xs text-slate-500">{stage.description}</div>
                                            </div>
                                            <div className="text-2xl font-semibold text-slate-900">{stage.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                <h2 className="text-lg font-semibold text-slate-900">Quick actions</h2>
                                <div className="mt-5 grid gap-3 text-sm text-slate-600">
                                    <Link
                                        className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:-translate-y-0.5"
                                        href="#"
                                    >
                                        <span className="inline-flex items-center gap-2 text-slate-700">
                                            <span className="material-symbols-outlined text-base text-indigo-500">calendar_clock</span>
                                            Schedule launch window
                                        </span>
                                        <span className="material-symbols-outlined text-base text-slate-400">chevron_right</span>
                                    </Link>
                                    <Link
                                        className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:-translate-y-0.5"
                                        href="#"
                                    >
                                        <span className="inline-flex items-center gap-2 text-slate-700">
                                            <span className="material-symbols-outlined text-base text-indigo-500">contact_support</span>
                                            Respond to support ticket
                                        </span>
                                        <span className="material-symbols-outlined text-base text-slate-400">chevron_right</span>
                                    </Link>
                                    <Link
                                        className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:-translate-y-0.5"
                                        href="#"
                                    >
                                        <span className="inline-flex items-center gap-2 text-slate-700">
                                            <span className="material-symbols-outlined text-base text-indigo-500">clinical_notes</span>
                                            Update creator terms
                                        </span>
                                        <span className="material-symbols-outlined text-base text-slate-400">chevron_right</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-slate-900">Creator performance</h2>
                                <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                                    Last 30 days
                                </span>
                            </div>
                            <div className="mt-6 overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6">
                                <p className="text-sm text-slate-600">
                                    Revenue growth and refund rate trending positively. Motion assets show the largest week-over-week
                                    increase with a 22% lift in conversions.
                                </p>
                                <div className="mt-6 grid gap-4 text-xs text-slate-500 sm:grid-cols-3">
                                    <div className="rounded-2xl bg-white p-4">
                                        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Motion</div>
                                        <div className="mt-2 text-lg font-semibold text-slate-900">+22%</div>
                                        <div className="text-slate-500">Conversion uplift</div>
                                    </div>
                                    <div className="rounded-2xl bg-white p-4">
                                        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Branding</div>
                                        <div className="mt-2 text-lg font-semibold text-slate-900">+14%</div>
                                        <div className="text-slate-500">Repeat buyers</div>
                                    </div>
                                    <div className="rounded-2xl bg-white p-4">
                                        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Illustration</div>
                                        <div className="mt-2 text-lg font-semibold text-slate-900">+9%</div>
                                        <div className="text-slate-500">Average order size</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-slate-900">Top creators</h2>
                            <div className="mt-6 space-y-4">
                                {topCreators.map((creator) => (
                                    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4" key={creator.name}>
                                        <div
                                            className="size-12 rounded-2xl bg-cover bg-center"
                                            style={{ backgroundImage: `url('${creator.avatar}')` }}
                                        />
                                        <div className="flex-1">
                                            <div className="font-semibold text-slate-900">{creator.name}</div>
                                            <div className="text-xs text-slate-500">{creator.products} marketplace products</div>
                                        </div>
                                        <div className="text-sm font-semibold text-slate-900">{creator.sales}</div>
                                    </div>
                                ))}
                            </div>
                            <Link
                                href="#"
                                className="mt-6 flex items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5"
                            >
                                <span className="material-symbols-outlined text-base">group_add</span>
                                Onboard new creator
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900">Operational insights</h2>
                                <p className="mt-1 text-sm text-slate-600">Stay ahead of risks with proactive alerts and automation queues.</p>
                            </div>
                            <div className="flex gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-600">
                                    <span className="material-symbols-outlined text-base">task_alt</span>
                                    Healthy
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-amber-600">
                                    <span className="material-symbols-outlined text-base">warning</span>
                                    2 warnings
                                </span>
                            </div>
                        </div>
                        <div className="mt-6 grid gap-4 text-sm text-slate-600 md:grid-cols-2">
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold text-slate-900">Payout queue</span>
                                    <span className="rounded-full bg-slate-200 px-3 py-1 text-xs text-slate-600">8 pending</span>
                                </div>
                                <p className="mt-2 text-xs text-slate-500">
                                    Average payout time is 36 hours. Enable instant payouts for verified creators to reduce support load.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold text-slate-900">Support load</span>
                                    <span className="rounded-full bg-slate-200 px-3 py-1 text-xs text-slate-600">5 escalations</span>
                                </div>
                                <p className="mt-2 text-xs text-slate-500">
                                    Most escalations relate to license upgrades. Consider automating license swaps via the API.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
