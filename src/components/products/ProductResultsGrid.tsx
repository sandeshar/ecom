"use client";

import { useEffect, useState } from "react";
import ProductListingCard from "@/components/products/ProductListingCard";
import { apiRequest } from "@/lib/api-client";
import type { Product, ProductListResponse } from "@/types/product";

export default function ProductResultsGrid() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoading(true);
                const response = await apiRequest<ProductListResponse>("/products", {
                    query: { published: true, limit: 50, page: 1 },
                    cache: "no-store",
                });
                setProducts(response.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load products");
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="h-96 animate-pulse rounded-3xl bg-slate-200" />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-center text-rose-600">
                <p className="font-semibold">Failed to load products</p>
                <p className="mt-2 text-sm">{error}</p>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">
                <span className="material-symbols-outlined mx-auto mb-4 text-5xl text-slate-300">inventory_2</span>
                <p className="text-lg font-semibold text-slate-700">No products found</p>
                <p className="mt-2 text-sm text-slate-500">Check back soon for new arrivals</p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => {
                const catalogProduct = {
                    id: product._id,
                    title: product.name,
                    description: product.description,
                    image: product.heroImage || "/placeholder.jpg",
                    price: `$${product.price}`,
                    rating: 4.7,
                    reviews: 85,
                    tags: product.tags || [],
                    badge: product.badge || undefined,
                };
                return <ProductListingCard key={product._id} product={catalogProduct} />;
            })}
        </div>
    );
}
