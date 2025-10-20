const kpis = [
    { label: "Revenue", value: "$128k", change: "+8.4%", context: "vs last month", icon: "stacked_line_chart" },
    { label: "Orders", value: "2,140", change: "+4.1%", context: "Completed", icon: "shopping_cart" },
    { label: "Average order value", value: "$59.95", change: "+$2.50", context: "Per order", icon: "paid" },
    { label: "Conversion rate", value: "3.2%", change: "+0.6%", context: "Storewide", icon: "trending_up" },
];

const channelBreakdown = [
    { channel: "Organic", revenue: "$42,300", share: "33%", icon: "eco" },
    { channel: "Paid", revenue: "$36,900", share: "29%", icon: "ads_click" },
    { channel: "Email", revenue: "$22,110", share: "17%", icon: "mail" },
    { channel: "Social", revenue: "$18,760", share: "15%", icon: "share" },
];

const quickInsights = [
    "Top product: Modern UI Card Set ($18.9k).",
    "Highest converting channel: Email at 4.7%.",
    "Best repeat customer cohort: March 2024 registrations.",
];

export default function AdminAnalyticsPage() {
    return (
        <main className="flex flex-1 flex-col">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Analytics</p>
                        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Store performance snapshot</h1>
                        <p className="mt-2 max-w-2xl text-sm text-slate-600">
                            Keep a pulse on the essentials without getting lost in dashboards. These highlights show exactly what needs attention.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                        <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 font-medium text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600">
                            <span className="material-symbols-outlined text-base">today</span>
                            Last 30 days
                        </button>
                        <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 font-medium text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600">
                            <span className="material-symbols-outlined text-base">file_download</span>
                            Export CSV
                        </button>
                    </div>
                </div>
            </header>

            <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {kpis.map((item) => (
                        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" key={item.label}>
                            <div className="flex items-center justify-between">
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{item.label}</p>
                                <span className="material-symbols-outlined text-lg text-indigo-500">{item.icon}</span>
                            </div>
                            <div className="mt-4 text-2xl font-semibold text-slate-900">{item.value}</div>
                            <p className="mt-1 text-xs font-medium text-emerald-500">{item.change}</p>
                            <p className="mt-2 text-xs text-slate-500">{item.context}</p>
                        </article>
                    ))}
                </div>

                <div className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
                    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-base font-semibold text-slate-900">Revenue by channel</h2>
                                <p className="text-xs text-slate-500">Know which levers are working before scaling spend.</p>
                            </div>
                            <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 transition hover:border-indigo-200 hover:text-indigo-600">
                                <span className="material-symbols-outlined text-base">equalizer</span>
                                Adjust
                            </button>
                        </header>

                        <div className="mt-6 space-y-4">
                            {channelBreakdown.map((row) => (
                                <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3" key={row.channel}>
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-lg text-indigo-500">{row.icon}</span>
                                        <div>
                                            <p className="font-semibold text-slate-900">{row.channel}</p>
                                            <p className="text-xs text-slate-500">Share {row.share}</p>
                                        </div>
                                    </div>
                                    <div className="text-sm font-semibold text-slate-900">{row.revenue}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-base font-semibold text-slate-900">Quick insights</h2>
                        <ul className="mt-4 space-y-3 text-sm text-slate-600">
                            {quickInsights.map((item) => (
                                <li className="flex items-start gap-2" key={item}>
                                    <span className="material-symbols-outlined mt-0.5 text-sm text-indigo-400">auto_awesome</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </aside>
                </div>
            </section>
        </main>
    );
}
