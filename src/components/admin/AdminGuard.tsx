"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const LOGIN_ROUTE = "/login";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (loading) return;
        if (!isAuthenticated) {
            router.replace(`${LOGIN_ROUTE}?redirect=${encodeURIComponent(pathname)}`);
        }
    }, [isAuthenticated, loading, router, pathname]);

    if (!isAuthenticated) {
        return loading ? (
            <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">Checking credentials…</div>
        ) : null;
    }

    return <>{children}</>;
}
