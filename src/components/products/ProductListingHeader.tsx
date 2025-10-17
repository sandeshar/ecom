import Link from "next/link";
import { productBreadcrumbs } from "@/data/products";

export default function ProductListingHeader() {
    return (
        <header className="space-y-6">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-500">
                {productBreadcrumbs.map((crumb, index) => {
                    const isLast = index === productBreadcrumbs.length - 1;

                    if (isLast) {
                        return (
                            <span key={crumb.label} className="text-slate-700">
                                {crumb.label}
                            </span>
                        );
                    }

                    return (
                        <span className="flex items-center gap-2" key={crumb.label}>
                            <Link className="transition-colors hover:text-indigo-500" href={crumb.href ?? "#"}>
                                {crumb.label}
                            </Link>
                            <span aria-hidden className="text-slate-400">
                                /
                            </span>
                        </span>
                    );
                })}
            </nav>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Digital Design Assets</h2>
                    <p className="max-w-2xl text-sm text-slate-600 md:text-base">
                        Elevate your projects with premium components, illustrations, and templates ready to drop into your workflow.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-indigo-500 hover:text-indigo-500">
                        <span className="material-symbols-outlined text-base">playlist_add_check</span>
                        Saved Filters
                    </button>
                    <button className="flex items-center gap-2 rounded-full bg-indigo-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md">
                        <span className="material-symbols-outlined text-base">file_upload</span>
                        Submit Asset
                    </button>
                </div>
            </div>
        </header>
    );
}
