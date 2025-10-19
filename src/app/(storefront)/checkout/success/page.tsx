import Link from "next/link";

export default function CheckoutSuccessPage() {
    return (
        <main className="flex flex-1 flex-col bg-slate-950 text-white">
            <section className="relative overflow-hidden pb-24 pt-32">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-slate-900 to-slate-950" />
                <div
                    className="absolute inset-0 opacity-40"
                    style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }}
                />
                <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center">
                        <span className="material-symbols-outlined rounded-full bg-emerald-400/10 p-4 text-4xl text-emerald-300">
                            task_alt
                        </span>
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70">Order confirmed</p>
                    <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Your downloads are ready</h1>
                    <p className="max-w-2xl text-sm text-white/80 sm:text-base">
                        We&apos;ve emailed you receipts, license documents, and secure download links. You can revisit and re-download
                        assets anytime from your account dashboard.
                    </p>
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                            <span className="material-symbols-outlined text-base">download_for_offline</span>
                            Instant downloads unlocked
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                            <span className="material-symbols-outlined text-base">lock</span>
                            Receipt #DH-2047
                        </span>
                    </div>
                    <div className="mt-10 grid w-full gap-4 sm:grid-cols-2">
                        <Link
                            href="/admin"
                            className="flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5"
                        >
                            <span className="material-symbols-outlined text-base">dashboard</span>
                            Open dashboard
                        </Link>
                        <Link
                            href="/products"
                            className="flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                        >
                            <span className="material-symbols-outlined text-base">explore</span>
                            Keep discovering
                        </Link>
                    </div>
                </div>
            </section>

            <section className="-mt-10 rounded-t-3xl bg-white px-4 py-14 text-slate-900 sm:px-6 lg:px-8">
                <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
                    <div className="grid gap-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600 sm:grid-cols-3">
                        <div className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-base text-indigo-500">workspace_premium</span>
                            <div>
                                <div className="font-semibold text-slate-900">License & receipts</div>
                                <p className="mt-1 text-slate-600">
                                    Download PDF receipts, licence certificates, and share with your finance team.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-base text-indigo-500">folder_open</span>
                            <div>
                                <div className="font-semibold text-slate-900">Version history</div>
                                <p className="mt-1 text-slate-600">
                                    Every update from creators appears in your library with changelog notes.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-base text-indigo-500">group</span>
                            <div>
                                <div className="font-semibold text-slate-900">Invite teammates</div>
                                <p className="mt-1 text-slate-600">Share download seats and manage access from the admin panel.</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h2 className="text-xl font-semibold">Next steps</h2>
                                <p className="mt-2 text-sm text-slate-600">
                                    Head to your creator dashboard to manage subscriptions, request revisions, or explore royalty-free add-ons.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <Link
                                    href="/admin"
                                    className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                                >
                                    <span className="material-symbols-outlined text-base">analytics</span>
                                    View purchases
                                </Link>
                                <Link
                                    href="/products"
                                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5"
                                >
                                    <span className="material-symbols-outlined text-base">storefront</span>
                                    Explore new assets
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
