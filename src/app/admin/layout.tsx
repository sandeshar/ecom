import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminGuard from "@/components/admin/AdminGuard";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AdminGuard>
            <div className="flex min-h-screen bg-slate-100 text-slate-900">
                <AdminSidebar />
                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>
            </div>
        </AdminGuard>
    );
}
