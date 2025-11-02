"use client";

import { useAuth } from "@/hooks/useAuth";
import { ReactNode } from "react";

interface PermissionGuardProps {
    permission?: string;
    superAdminOnly?: boolean;
    children: ReactNode;
    fallback?: ReactNode;
}

export function PermissionGuard({ permission, superAdminOnly, children, fallback = null }: PermissionGuardProps) {
    const { hasPermission, isSuperAdmin } = useAuth();

    // Check super admin only
    if (superAdminOnly && !isSuperAdmin) {
        return <>{fallback}</>;
    }

    // Check specific permission
    if (permission && !hasPermission(permission as any)) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}

interface DisableIfNoPermissionProps {
    permission?: string;
    superAdminOnly?: boolean;
    children: ReactNode;
}

export function DisableIfNoPermission({ permission, superAdminOnly, children }: DisableIfNoPermissionProps) {
    const { hasPermission, isSuperAdmin } = useAuth();

    let hasAccess = true;

    if (superAdminOnly && !isSuperAdmin) {
        hasAccess = false;
    }

    if (permission && !hasPermission(permission as any)) {
        hasAccess = false;
    }

    if (!hasAccess) {
        return (
            <div className="relative">
                <div className="pointer-events-none opacity-50">{children}</div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="rounded-full bg-slate-900/80 px-3 py-1 text-xs font-medium text-white">
                        No permission
                    </span>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
