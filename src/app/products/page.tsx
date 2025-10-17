import ProductFilters from "@/components/products/ProductFilters";
import ProductHero from "@/components/products/ProductHero";
import ProductPagination from "@/components/products/ProductPagination";
import ProductResultsGrid from "@/components/products/ProductResultsGrid";
import ProductToolbar from "@/components/products/ProductToolbar";

export default function ProductsPage() {
    return (
        <main className="flex flex-1 flex-col bg-slate-50">
            <ProductHero />
            <section className="mx-auto w-full max-w-7xl px-4 pb-16 pt-12 sm:px-6 lg:px-8">
                {/* <ProductListingHeader /> */}

                <div className="mt-12 grid gap-10 lg:grid-cols-[280px_1fr]">
                    <ProductFilters />
                    <div className="space-y-6">
                        <ProductToolbar />
                        <ProductResultsGrid />
                        <ProductPagination />
                    </div>
                </div>
            </section>
        </main>
    );
}
