const preferences = {
    name: "Design Hub",
    email: "support@designhub.com",
    phone: "+1 (555) 633-1284",
    timezone: "GMT-05:00 Eastern Time",
    currency: "USD",
};

export default function AdminSettingsPage() {
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
                <form className="space-y-8">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-base font-semibold text-slate-900">Store identity</h2>
                        <div className="mt-4 grid gap-5 sm:grid-cols-2">
                            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                                Store name
                                <input
                                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                    defaultValue={preferences.name}
                                    type="text"
                                />
                            </label>
                            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                                Support email
                                <input
                                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                    defaultValue={preferences.email}
                                    type="email"
                                />
                            </label>
                            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                                Support phone
                                <input
                                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                    defaultValue={preferences.phone}
                                    type="tel"
                                />
                            </label>
                            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                                Timezone
                                <select
                                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                    defaultValue={preferences.timezone}
                                >
                                    <option>GMT-05:00 Eastern Time</option>
                                    <option>GMT-08:00 Pacific Time</option>
                                    <option>GMT+00:00 UTC</option>
                                </select>
                            </label>
                            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                                Currency
                                <select
                                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                    defaultValue={preferences.currency}
                                >
                                    <option>USD</option>
                                    <option>CAD</option>
                                    <option>EUR</option>
                                </select>
                            </label>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-base font-semibold text-slate-900">Checkout</h2>
                        <div className="mt-4 space-y-4 text-sm text-slate-600">
                            <label className="flex items-center gap-3">
                                <input className="size-4 rounded border-slate-300 text-indigo-500 focus:ring-indigo-500" defaultChecked type="checkbox" />
                                Enable guest checkout
                            </label>
                            <label className="flex items-center gap-3">
                                <input className="size-4 rounded border-slate-300 text-indigo-500 focus:ring-indigo-500" defaultChecked type="checkbox" />
                                Allow order notes
                            </label>
                            <label className="flex items-center gap-3">
                                <input className="size-4 rounded border-slate-300 text-indigo-500 focus:ring-indigo-500" type="checkbox" />
                                Require phone number for delivery
                            </label>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3">
                        <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600" type="button">
                            Cancel
                        </button>
                        <button className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-600" type="submit">
                            <span className="material-symbols-outlined text-base">save</span>
                            Save changes
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
}
