import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export default function StorefrontLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="relative flex min-h-screen w-full flex-col bg-slate-50 text-slate-900">
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}
