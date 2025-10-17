export type ProductBreadcrumb = {
    label: string;
    href?: string;
};

export type ProductFilterOption = {
    id: string;
    label: string;
    count?: number;
    colorHex?: string;
};

export type ProductFilter = {
    id: string;
    title: string;
    options: ProductFilterOption[];
    variant?: "color" | "checkbox";
};

export type ProductSortOption = {
    id: string;
    label: string;
};

export type CatalogProduct = {
    id: string;
    title: string;
    description: string;
    image: string;
    price: string;
    rating: number;
    reviews: number;
    tags: string[];
    badge?: string;
};

export const productBreadcrumbs: ProductBreadcrumb[] = [
    { label: "Home", href: "/" },
    { label: "Marketplace", href: "/products" },
    { label: "Digital Assets" },
];

export const productFilters: ProductFilter[] = [
    {
        id: "categories",
        title: "Categories",
        options: [
            { id: "illustrations", label: "Illustrations", count: 64 },
            { id: "patterns", label: "Patterns", count: 48 },
            { id: "ui-kits", label: "UI Kits", count: 32 },
            { id: "mockups", label: "Mockups", count: 27 },
            { id: "branding", label: "Branding", count: 19 },
        ],
    },
    {
        id: "style",
        title: "Style",
        options: [
            { id: "minimal", label: "Minimal", count: 54 },
            { id: "bold", label: "Bold", count: 42 },
            { id: "playful", label: "Playful", count: 36 },
            { id: "corporate", label: "Corporate", count: 28 },
        ],
    },
    {
        id: "color",
        title: "Colour Palette",
        variant: "color",
        options: [
            { id: "color-1", label: "Sky", colorHex: "#38bdf8" },
            { id: "color-2", label: "Violet", colorHex: "#8b5cf6" },
            { id: "color-3", label: "Amber", colorHex: "#f59e0b" },
            { id: "color-4", label: "Rose", colorHex: "#f43f5e" },
            { id: "color-5", label: "Slate", colorHex: "#64748b" },
        ],
    },
    {
        id: "license",
        title: "License",
        options: [
            { id: "personal", label: "Personal", count: 112 },
            { id: "commercial", label: "Commercial", count: 94 },
            { id: "extended", label: "Extended", count: 41 },
        ],
    },
];

export const productSortOptions: ProductSortOption[] = [
    { id: "popular", label: "Most Popular" },
    { id: "newest", label: "Newest" },
    { id: "price-low", label: "Price: Low to High" },
    { id: "price-high", label: "Price: High to Low" },
    { id: "rating", label: "Highest Rating" },
];

export const catalogProducts: CatalogProduct[] = [
    {
        id: "aurora-abstract-kit",
        title: "Aurora Abstract Kit",
        description: "50 gradient-rich backgrounds perfect for landing pages and hero sections.",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAIKtic_KdOjj1KNmAoFtyiH6p2IdLhKUloo5uJIL-gYZhpWrK4F_RkmDvGgc0QJ85oXEAzboLdVso1UdplDyBHwkfey-Gx-lM9mEJYxYs72ZUNFZtA7keDm8PS_hnAY67Zr2NNFtZPgDKnYwzXNijTj45YhvUQ0Q8zjCb-UIa49Z5am1Wc4QYl-6djeTKJ9LjhsOZdb02gFB4gIHqn8JUzVhoKu3mcv4CoGQOzgZqs3hzNMqS-",
        price: "$38",
        rating: 4.8,
        reviews: 128,
        tags: ["Illustrations", "Gradient"],
        badge: "Best Seller",
    },
    {
        id: "neon-future-ui",
        title: "Neon Future UI Pack",
        description: "Fully editable UI kit inspired by futuristic dashboards and analytics.",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCUiguJQz-YC1F0n3lGuUSJNlwSGv7lO5NaCnIU9J0PqG6i_97B2qrFJL8RYq6HgtzAm5MWKGAfIsThMiEaKHzO6nK77bKddS7nFNGq5RJ5kChzewrIgX6ylZU-_Vw-SvSe5dh3VcZbZk9h80J3hgFe41HsGfe06WNjbt2gGjOx3sZWHeWwWmQDrtPnWQ8s0Vz5blb3g6YCJxGY-7Y-Zg",
        price: "$45",
        rating: 4.7,
        reviews: 96,
        tags: ["UI Kit", "Dark"],
    },
    {
        id: "earthy-patterns",
        title: "Earthy Pattern Collection",
        description: "Hand-drawn seamless patterns inspired by natural textures and tones.",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAhtSun1SgoLtVHzVrFmR8rnS4icMBQNteGYoYgMvbFzYUPPzr7GwkV3CJSIgJa66MzcItet25mp4qxqoPIf3Vsmv0Pf9-ln70X0jL0hdw4fJQ4aVoEoIxf1nFL4xtO3X-tnAVDVt3kWMyw3_DJ2FnftlIn9Ug4d7fYMUdQOJxo6g6qkIyI92KFXbMS4IYudwwF2Ik6VQeVZvbxY13a",
        price: "$29",
        rating: 4.6,
        reviews: 74,
        tags: ["Patterns", "Organic"],
    },
    {
        id: "minimal-branding",
        title: "Minimal Branding Starter",
        description: "Logo templates, typography pairings, and colour palettes for bold brands.",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDPfWcF_IEFjSxjiwg8P9Wol3MAslcsmuQC32tM8BXlJWf6xwI8pQg7nA-9dcbP_GrZIJkN2vdr-9CYWyWTf9gPSzbIKTBt8mEohK6AJc2QbAyelGvvyl-HTKUkDfI9bdY7u5N3KRVvwa74yKTfgP40oWcgUyWnU1xeyf8gTBEEA8qttsmqxMyO92-lbfCorJhf-qem2kNCI-frkHWUs",
        price: "$52",
        rating: 4.9,
        reviews: 182,
        tags: ["Branding", "Templates"],
        badge: "Featured",
    },
    {
        id: "motion-pack",
        title: "Motion Elements Toolkit",
        description: "Animated SVGs and Lottie files to elevate product interactions.",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCWEYwD9f8lYLuOowxkQWXpknA0f67S5AlFBHN-_q4YZtdOwRbGXGz1rH3U5cJ9urh3bGb3oMcdWF9Y3Vgy7-32fNq4V0l4lDEW_fJb2FxbTBewFVC9n3dwmfsyijqsYvH1JM0Kxa7oA9ZZf0jzU8ZxVc6S_4RzVCyCgfo",
        price: "$34",
        rating: 4.5,
        reviews: 68,
        tags: ["Animation", "Motion"],
    },
    {
        id: "serif-type-suite",
        title: "Serif Type Suite",
        description: "A curated serif type system with alternate glyphs and ligatures.",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAk2uGtULKD82Ke14KY7Kqo2Ue3qLEAzoFkM4sLgKu3_1q-0wGf1EVb6LT9lYVI5wRrVf8iT8YGLTMiBSVmK-l5oJXl8Ag1UC9f7Kp5WQeQYJKhY9zAhIrxETvCCgkUYzXig3KD7eQwHoPExrhNGty-tCgqO-Y4IrONmv0",
        price: "$24",
        rating: 4.4,
        reviews: 51,
        tags: ["Typography", "Fonts"],
    },
    {
        id: "vibrant-social",
        title: "Vibrant Social Templates",
        description: "Editable social media templates optimised for engagement and reach.",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuC8UxJQvdrqfbm-d55OagrC3S2Fbr1egNVQCcAKuk6kh9zLxLsZ2lczXg2lOb-0Zwu7aGJRxc9iy0BCSUjSzrlCRbe9pQSYq2tjOUfmlfqIM_P4_UCLg7G3gzySl0Wps6p-DFdbKXOb3SzIWwp6ljzqEjYFNRdi1qHrtZD0",
        price: "$19",
        rating: 4.2,
        reviews: 37,
        tags: ["Templates", "Social"],
    },
    {
        id: "cerulean-illustrations",
        title: "Cerulean Illustration Pack",
        description: "A set of character illustrations with earthy tones and inclusive styling.",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuABw7ucaD9qD8pU96q-4v0o4hHz9sGCKd9FkWFNrV5SpGIWeTZKg3pUEzoYI5sAV8nwhapVYnS756a-If4Lk3O6Pqb5KxFFGcMfeSdWUNZtyz6dIJQce1tBOu6aBSYm7KaO8Zr1oWT3vU9WthLLxjZSeLnpR6RJO5pZ4iE",
        price: "$42",
        rating: 4.9,
        reviews: 205,
        tags: ["Illustrations", "Characters"],
    },
];
