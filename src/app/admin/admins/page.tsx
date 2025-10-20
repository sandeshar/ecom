const teamMembers = [
    { name: "Jordan Rivera", email: "jordan@email.com", role: "Owner", status: "Active", lastLogin: "Today" },
    { name: "Priya Desai", email: "priya@email.com", role: "Operations", status: "Active", lastLogin: "Yesterday" },
    { name: "Samuel Lee", email: "samuel@email.com", role: "Support", status: "Active", lastLogin: "2 days ago" },
    { name: "Daphne Lewis", email: "daphne@email.com", role: "Marketing", status: "Pending", lastLogin: "Invite sent" },
];

export default function AdminTeamPage() {
    return (
        <main className="flex flex-1 flex-col">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Team</p>
                        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Manage admins</h1>
                        <p className="mt-2 max-w-2xl text-sm text-slate-600">
                            Control who has access to the store backend. Invite collaborators and adjust roles without digging through settings.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                        <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 font-medium text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600">
                            <span className="material-symbols-outlined text-base">person_add</span>
                            Invite admin
                        </button>
                    </div>
                </div>
            </header>

            <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-slate-100 text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                            <tr>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Role</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Last login</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {teamMembers.map((member) => (
                                <tr key={member.email}>
                                    <td className="px-4 py-4">
                                        <div className="font-semibold text-slate-900">{member.name}</div>
                                        <div className="text-xs text-slate-500">{member.email}</div>
                                    </td>
                                    <td className="px-4 py-4 text-sm font-medium text-slate-900">{member.role}</td>
                                    <td className="px-4 py-4">
                                        <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${member.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                                            <span className="material-symbols-outlined text-sm">verified_user</span>
                                            {member.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4">{member.lastLogin}</td>
                                    <td className="px-4 py-4">
                                        <div className="inline-flex items-center gap-2">
                                            <button className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600" type="button">
                                                <span className="material-symbols-outlined text-base">edit</span>
                                                Edit
                                            </button>
                                            <button className="inline-flex items-center gap-1 rounded-full border border-rose-200 px-3 py-1 text-xs font-semibold text-rose-600 transition hover:bg-rose-50" type="button">
                                                <span className="material-symbols-outlined text-base">lock_person</span>
                                                Revoke
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}
