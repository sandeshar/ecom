"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect") || "/admin";
    const { login, loading, error, clearError, isAuthenticated } = useAuth();
    const [formState, setFormState] = useState({ email: "", password: "" });
    const [formError, setFormError] = useState<string | null>(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormError(null);
        clearError();

        try {
            await login(formState.email, formState.password);
            router.replace(redirect);
        } catch (submissionError) {
            const message = submissionError instanceof Error ? submissionError.message : "Unable to login";
            setFormError(message);
        }
    };

    if (isAuthenticated && !loading) {
        router.replace(redirect);
        return null;
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-900 px-6 py-16">
            <div className="w-full max-w-md space-y-8 rounded-3xl bg-white/90 p-10 shadow-2xl backdrop-blur">
                <div className="space-y-3 text-center">
                    <div className="inline-flex items-center gap-3 rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white">
                        <span className="material-symbols-outlined text-base">admin_panel_settings</span>
                        Admin Portal
                    </div>
                    <h1 className="text-3xl font-semibold text-slate-900">Sign in</h1>
                    <p className="text-sm text-slate-500">Access the catalogue, orders, and analytics dashboard.</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <label className="flex flex-col gap-2 text-sm text-slate-600">
                        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Email</span>
                        <input
                            className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                            type="email"
                            value={formState.email}
                            onChange={(event) => {
                                setFormState((prev) => ({ ...prev, email: event.target.value }));
                                if (formError) setFormError(null);
                                clearError();
                            }}
                            required
                            autoComplete="email"
                        />
                    </label>
                    <label className="flex flex-col gap-2 text-sm text-slate-600">
                        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Password</span>
                        <input
                            className="rounded-2xl border border-slate-200 px-4 py-3 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                            type="password"
                            value={formState.password}
                            onChange={(event) => {
                                setFormState((prev) => ({ ...prev, password: event.target.value }));
                                if (formError) setFormError(null);
                                clearError();
                            }}
                            required
                            autoComplete="current-password"
                        />
                    </label>

                    {(formError || error) && (
                        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
                            {formError || error}
                        </div>
                    )}

                    <button
                        className="flex w-full items-center justify-center gap-2 rounded-full bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={loading}
                        type="submit"
                    >
                        <span className="material-symbols-outlined text-base">login</span>
                        {loading ? "Signing in…" : "Sign in"}
                    </button>
                </form>

                <div className="text-center text-xs text-slate-500">
                    <p>
                        Having trouble? Contact the site maintainer via{" "}
                        <Link className="font-semibold text-indigo-500" href="mailto:admin@example.com">
                            admin@example.com
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </main>
    );
}
