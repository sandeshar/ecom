import ProductListingCard from "@/components/products/ProductListingCard";
import { catalogProducts } from "@/data/products";

export default function ProductResultsGrid() {
    return (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {catalogProducts.map((product) => (
                <ProductListingCard key={product.id} product={product} />
            ))}
        </div>
    );
}
