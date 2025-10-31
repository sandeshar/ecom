import HighlightCard from "@/components/home/cards/HighlightCard";
import SectionHeading from "@/components/common/SectionHeading";
import { apiRequest } from "@/lib/api-client";
import type { Product, ProductListResponse } from "@/types/product";

async function getFeaturedProducts(): Promise<Product[]> {
    try {
        const response = await apiRequest<ProductListResponse>("/products", {
            query: { published: true, limit: 6, page: 1 },
            cache: "no-store",
        });
        return response.data.filter((p) => p.badge === "Featured" || p.badge === "Best Seller").slice(0, 4);
    } catch (error) {
        console.error("Failed to fetch featured products:", error);
        return [];
    }
}

export default async function FeaturedSection() {
    const products = await getFeaturedProducts();

    if (products.length === 0) {
        return null;
    }

    const highlights = products.map((product) => ({
        id: product._id,
        title: product.name,
        description: product.description,
        image: product.heroImage || "/placeholder.jpg",
        badge: product.badge || undefined,
        price: `$${product.price}`,
        slug: product.slug,
    }));

    return (
        <section className="scroll-mt-32 py-16" id="featured">
            <div className="text-center">
                <SectionHeading
                    title="Featured Designs"
                    subtitle="Handpicked selections from our creative community."
                />
            </div>
            <div className="mt-12 flex gap-8 overflow-x-auto pb-8 [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {highlights.map((item) => (
                    <HighlightCard item={item} key={item.id} />
                ))}
            </div>
        </section>
    );
}
