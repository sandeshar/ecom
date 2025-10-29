export type Product = {
    _id: string;
    name: string;
    slug: string;
    description: string;
    heroImage?: string | null;
    galleryImages: string[];
    highlights: string[];
    price: number;
    categories: string[];
    licenseTiers: string[];
    tags: string[];
    badge?: string;
    sku?: string;
    inventory?: number;
    digitalAssetUrl?: string;
    published: boolean;
    createdAt: string;
    updatedAt: string;
};

export type ProductListResponse = {
    data: Product[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
};
