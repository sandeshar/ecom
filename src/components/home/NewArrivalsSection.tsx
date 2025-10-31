import ProductCard from "@/components/home/cards/ProductCard";
import SectionHeading from "@/components/common/SectionHeading";
import { apiRequest } from "@/lib/api-client";
import type { Product, ProductListResponse } from "@/types/product";

async function getNewArrivals(): Promise<Product[]> {
    try {
        const response = await apiRequest<ProductListResponse>("/products", {
            query: { published: true, limit: 8, page: 1 },
            cache: "no-store",
        });
        return response.data.slice(0, 8);
    } catch (error) {
        console.error("Failed to fetch new arrivals:", error);
        return [];
    }
}

export default async function NewArrivalsSection() {
    const products = await getNewArrivals();

    if (products.length === 0) {
        return null;
    }

    const arrivals = products.map((product) => ({
        id: product._id,
        title: product.name,
        description: product.description,
        image: product.heroImage || "/placeholder.jpg",
        price: `$${product.price}`,
        rating: 4.8,
        reviews: 120,
        category: product.categories[0] || "Design",
        slug: product.slug,
    }));

    return (
        <section className="scroll-mt-32 py-16" id="new-arrivals">
            <div className="text-center">
                <SectionHeading
                    title="New Arrivals"
                    subtitle="Freshly crafted designs, just for you."
                />
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {arrivals.map((item, index) => (
                    <ProductCard index={index} item={item} key={item.id} />
                ))}
            </div>
        </section>
    );
}
