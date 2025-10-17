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

export type ProductSpec = {
    label: string;
    value: string;
};

export type ProductFAQ = {
    question: string;
    answer: string;
};

export type ProductDetail = {
    id: string;
    heroImage: string;
    overview: string;
    gallery: string[];
    highlights: string[];
    includes: string[];
    specs: ProductSpec[];
    faqs: ProductFAQ[];
    compatibleWith: string[];
    licenseNotes: string[];
    lastUpdated: string;
    author: {
        name: string;
        role: string;
        avatar: string;
        bio: string;
        stats: { label: string; value: string }[];
    };
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

export const productDetails: Record<string, ProductDetail> = {
    "aurora-abstract-kit": {
        id: "aurora-abstract-kit",
        heroImage:
            "https://images.unsplash.com/photo-1518887614396-77dd75aef72a?auto=format&fit=crop&w=2000&q=80",
        overview:
            "A premium collection of 50 gradient-driven hero graphics, onboarding scenes, and background textures designed for modern SaaS and marketing sites.",
        gallery: [
            "https://images.unsplash.com/photo-1520256862855-398228c41684?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1512758017271-d7b84c2ea88b?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1545239351-1f8dfd9f6857?auto=format&fit=crop&w=1200&q=80",
        ],
        highlights: [
            "50 high-resolution assets in PNG and SVG for flexible use",
            "Ready-to-use Figma components to drag into any layout",
            "Color-safe palettes for both light and dark UI",
            "Preset Webflow symbols for instant hero swaps",
        ],
        includes: [
            "Figma source with auto-layouts",
            "Optimized PNG exports (6000x4000 px)",
            "Color swatch styles and documentation",
            "Commercial license certificate",
        ],
        specs: [
            { label: "File Size", value: "1.2 GB" },
            { label: "Dimensions", value: "Up to 6000 x 4000 px" },
            { label: "Format", value: "Figma, SVG, PNG" },
            { label: "Version", value: "v2.4" },
        ],
        faqs: [
            {
                question: "Can I use these backgrounds in client work?",
                answer: "Yes, the commercial license covers unlimited client projects as long as you do not resell the assets as-is.",
            },
            {
                question: "Do you provide color variants?",
                answer: "Each background includes four palette variations and editable gradient stops inside the Figma source file.",
            },
            {
                question: "Are updates included?",
                answer: "Lifetime updates are included. You'll receive email notifications when new gradients or compositions are shipped.",
            },
        ],
        compatibleWith: ["Figma", "Sketch", "Adobe XD", "Webflow"],
        licenseNotes: [
            "Unlimited personal and client usage",
            "No resale or redistribution of raw files",
            "Attribution not required",
        ],
        lastUpdated: "Sept 12, 2025",
        author: {
            name: "Lena Montoya",
            role: "Digital Illustrator",
            avatar:
                "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=200&q=80",
            bio: "Lena specialises in cinematic lighting and gradient systems for brands like Pitch, Wistia, and Squarespace.",
            stats: [
                { label: "Products", value: "12" },
                { label: "Sales", value: "9.3k" },
                { label: "Rating", value: "4.9" },
            ],
        },
    },
    "neon-future-ui": {
        id: "neon-future-ui",
        heroImage:
            "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=2000&q=80",
        overview:
            "A responsive design system inspired by sci-fi control rooms, featuring dashboards, analytics, and data visualization components.",
        gallery: [
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1531498860502-7c67cf02f77b?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1527443224154-c4a3942d88c5?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
        ],
        highlights: [
            "120 dashboard-ready UI components",
            "Auto layout tokens for responsive resizing",
            "16 color themes curated for neon aesthetics",
            "Micro-interactions exported as Lottie JSON",
        ],
        includes: [
            "Figma + Sketch design system",
            "Iconography pack (SVG)",
            "Motion handoff documentation",
            "Component audit spreadsheet",
        ],
        specs: [
            { label: "File Size", value: "860 MB" },
            { label: "Format", value: "Figma, Sketch, After Effects" },
            { label: "Components", value: "120" },
            { label: "Version", value: "v1.9" },
        ],
        faqs: [
            {
                question: "Does it include dark and light themes?",
                answer: "Yes, toggle between neon dark and muted light themes using shared color styles.",
            },
            {
                question: "Can I import this into Framer?",
                answer: "The kit ships with a Framer-ready library plus Frame presets for quick prototyping.",
            },
            {
                question: "Is motion included?",
                answer: "Six hero-level Lottie animations are included with editable After Effects project files.",
            },
        ],
        compatibleWith: ["Figma", "Sketch", "Framer", "After Effects"],
        licenseNotes: [
            "Use on unlimited dashboards",
            "Do not resell components individually",
            "Credit is appreciated when sharing previews",
        ],
        lastUpdated: "Aug 24, 2025",
        author: {
            name: "Studio Voxel",
            role: "Interface Collective",
            avatar:
                "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
            bio: "Studio Voxel helps crypto, fintech, and AI startups launch cohesive data-heavy products in weeks.",
            stats: [
                { label: "Clients", value: "84" },
                { label: "Team", value: "6" },
                { label: "Avg. Rating", value: "4.8" },
            ],
        },
    },
    "earthy-patterns": {
        id: "earthy-patterns",
        heroImage:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2000&q=80",
        overview:
            "A curated library of hand-drawn, tile-ready patterns inspired by organic textures, clay ceramics, and botanical motifs.",
        gallery: [
            "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
        ],
        highlights: [
            "36 seamless patterns in vector and raster formats",
            "Editable stroke widths and grain textures",
            "Includes Procreate brushes for embellishing",
            "Bonus brand guideline template",
        ],
        includes: [
            "Illustrator + EPS source files",
            "300 DPI JPEG + transparent PNG",
            "Procreate brush set (.brushset)",
            "Brand lookbook PDF",
        ],
        specs: [
            { label: "Pattern Count", value: "36" },
            { label: "Tile Size", value: "4096 x 4096 px" },
            { label: "Format", value: "AI, EPS, PNG, JPG" },
            { label: "Version", value: "v1.3" },
        ],
        faqs: [
            {
                question: "Are the patterns seamless?",
                answer: "Yes, every pattern tiles seamlessly with edge-aligned motifs and tested repeats.",
            },
            {
                question: "Is Procreate supported?",
                answer: "Two brush sets are included for iPad freelancers who want to customise motifs on the fly.",
            },
            {
                question: "What about print usage?",
                answer: "Print on merchandise up to 2500 units per design without extended licensing.",
            },
        ],
        compatibleWith: ["Illustrator", "Affinity Designer", "Procreate", "Photoshop"],
        licenseNotes: [
            "Unlimited digital usage",
            "Merchandise cap at 2500 units",
            "No POD marketplaces like Redbubble",
        ],
        lastUpdated: "Jul 18, 2025",
        author: {
            name: "Mira Campos",
            role: "Surface Designer",
            avatar:
                "https://images.unsplash.com/photo-1550525811-e5869dd03032?auto=format&fit=crop&w=200&q=80",
            bio: "Mira creates earthy visuals for eco-focused brands, with work featured by Etsy and Adobe Stock.",
            stats: [
                { label: "Collections", value: "8" },
                { label: "Retail Partners", value: "15" },
                { label: "Avg. Review", value: "4.7" },
            ],
        },
    },
    "minimal-branding": {
        id: "minimal-branding",
        heroImage:
            "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=2000&q=80",
        overview:
            "An all-in-one starter kit for positioning bold, minimalist brands with typography, colour systems, and logo marks.",
        gallery: [
            "https://images.unsplash.com/photo-1487611459768-bd414656ea10?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1462396881884-de2c07cb95ed?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=1200&q=80",
        ],
        highlights: [
            "18 logo concepts with vector construction",
            "Typeface pairings with OpenType features",
            "36-page brand guideline template",
            "Export presets for social and packaging",
        ],
        includes: [
            "Figma + Illustrator source files",
            "Editable brand strategy workbook",
            "Mockup library with smart objects",
            "Colour palette swatches (.ase)",
        ],
        specs: [
            { label: "Guideline Pages", value: "36" },
            { label: "Logo Concepts", value: "18" },
            { label: "Mockups", value: "25" },
            { label: "Version", value: "v3.1" },
        ],
        faqs: [
            {
                question: "Does it include brand strategy prompts?",
                answer: "Yes, the workbook guides discovery workshops with editable sections for stakeholder quotes.",
            },
            {
                question: "Can I tweak the mockups?",
                answer: "Each mockup uses smart objects compatible with Photoshop and Photopea.",
            },
            {
                question: "Is there a license for fonts?",
                answer: "Font recommendations are included; commercial licenses must be purchased separately.",
            },
        ],
        compatibleWith: ["Figma", "Illustrator", "Photoshop", "Affinity Designer"],
        licenseNotes: [
            "Sell up to 3 branded identities per client",
            "Fonts not included",
            "Redistribution of mockups is prohibited",
        ],
        lastUpdated: "Oct 2, 2025",
        author: {
            name: "Noir Studio",
            role: "Brand Collective",
            avatar:
                "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80",
            bio: "Noir Studio crafts confident brand systems for DTC and boutique hospitality teams worldwide.",
            stats: [
                { label: "Identity Launches", value: "140" },
                { label: "Avg. Project NPS", value: "72" },
                { label: "Team", value: "9" },
            ],
        },
    },
    "motion-pack": {
        id: "motion-pack",
        heroImage:
            "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=2000&q=80",
        overview:
            "A library of animated SVGs, micro-interactions, and Lottie files to enhance onboarding flows and hero sections.",
        gallery: [
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
        ],
        highlights: [
            "48 hero animations optimized for web",
            "Configurable stroke widths through JSON",
            "Includes After Effects project files",
            "Three speed variants for each animation",
        ],
        includes: [
            "Lottie JSON exports",
            "After Effects source project",
            "Implementation guide (React + Webflow)",
            "Usage licensing document",
        ],
        specs: [
            { label: "Animations", value: "72" },
            { label: "File Size", value: "540 MB" },
            { label: "Format", value: "JSON, AE" },
            { label: "Version", value: "v1.6" },
        ],
        faqs: [
            {
                question: "How do I recolor the animations?",
                answer: "Use the provided AE project or edit stroke colors directly in the JSON with our helper script.",
            },
            {
                question: "Are they compatible with React Native?",
                answer: "Yes, each animation ships with a testing preview inside Expo for mobile teams.",
            },
            {
                question: "Do you include web performance tips?",
                answer: "We include a guide on lazy loading, reduced motion fallbacks, and Webflow embeds.",
            },
        ],
        compatibleWith: ["After Effects", "Lottie", "React", "Webflow"],
        licenseNotes: [
            "Unlimited project installs",
            "Do not distribute as sticker packs",
            "Credit motion artists when possible",
        ],
        lastUpdated: "Jun 30, 2025",
        author: {
            name: "Motioncraft",
            role: "Animation Studio",
            avatar:
                "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=200&q=80",
            bio: "Motioncraft helps SaaS products feel alive with purposeful motion and accessibility-friendly defaults.",
            stats: [
                { label: "Frames Rendered", value: "1.2M" },
                { label: "Clients", value: "62" },
                { label: "Avg. Rating", value: "4.8" },
            ],
        },
    },
    "serif-type-suite": {
        id: "serif-type-suite",
        heroImage:
            "https://images.unsplash.com/photo-1580402494682-1fe41b14ab7f?auto=format&fit=crop&w=2000&q=80",
        overview:
            "A curated serif type system with 12 families, alternate glyphs, and editorial-ready typography templates.",
        gallery: [
            "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1200&q=80",
        ],
        highlights: [
            "12 font families with stylistic alternates",
            "Editorial templates for Webflow and Figma",
            "Baseline grids and typographic scales",
            "OpenType features including small caps",
        ],
        includes: [
            "OTF + WOFF2 font files",
            "Figma typography starter library",
            "Webflow template clone link",
            "Usage and pairing guide (PDF)",
        ],
        specs: [
            { label: "Font Families", value: "12" },
            { label: "Styles", value: "144" },
            { label: "Format", value: "OTF, WOFF2" },
            { label: "Version", value: "v2.2" },
        ],
        faqs: [
            {
                question: "Do I need a separate web font license?",
                answer: "Web licensing is included up to 2 million monthly page views.",
            },
            {
                question: "Can I convert to variable fonts?",
                answer: "Variable font files are included for two flagship families with configuration notes.",
            },
            {
                question: "Are there Cyrillic characters?",
                answer: "Latin Extended A + Cyrillic subsets are covered across headline styles.",
            },
        ],
        compatibleWith: ["Figma", "Adobe Fonts", "Webflow", "Canva"],
        licenseNotes: [
            "Embed in up to 5 client websites",
            "Desktop installs capped at 25 seats",
            "Do not package with themes for resale",
        ],
        lastUpdated: "May 22, 2025",
        author: {
            name: "Atelier Typefoundry",
            role: "Type Designers",
            avatar:
                "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80",
            bio: "Atelier Typefoundry builds editorial-first typefaces for magazines, substack writers, and premium blogs.",
            stats: [
                { label: "Fonts Released", value: "38" },
                { label: "Licenses", value: "12k" },
                { label: "Avg. Rating", value: "4.8" },
            ],
        },
    },
    "vibrant-social": {
        id: "vibrant-social",
        heroImage:
            "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=2000&q=80",
        overview:
            "A punchy social media template pack optimised for short-form video teasers, carousels, and campaign recaps.",
        gallery: [
            "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1521572166624-1de611854092?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=1200&q=80",
        ],
        highlights: [
            "150 feed and story templates",
            "Editable headline and caption styles",
            "Export presets for reels and shorts",
            "Performance tracking notion workspace",
        ],
        includes: [
            "Figma + Canva templates",
            "Caption prompt library",
            "Notion campaign tracker",
            "Colour scheme variants",
        ],
        specs: [
            { label: "Templates", value: "150" },
            { label: "Aspect Ratios", value: "1:1, 4:5, 9:16" },
            { label: "Format", value: "Figma, Canva" },
            { label: "Version", value: "v1.5" },
        ],
        faqs: [
            {
                question: "Is Canva support included?",
                answer: "Yes, every layout has a Canva variant with free font pairings.",
            },
            {
                question: "How do I track performance?",
                answer: "Use the Notion dashboard to log KPIs, budgets, and creative notes across campaigns.",
            },
            {
                question: "Do you provide animation?",
                answer: "A bonus folder includes 12 animated story frames in MP4 and GIF formats.",
            },
        ],
        compatibleWith: ["Figma", "Canva", "Photoshop", "Notion"],
        licenseNotes: [
            "Unlimited social accounts",
            "Do not resell templates as-is",
            "One seat per purchase",
        ],
        lastUpdated: "Apr 11, 2025",
        author: {
            name: "Glow Studio",
            role: "Content Strategists",
            avatar:
                "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80",
            bio: "Glow Studio powers campaigns for creators and consumer brands with high-energy visuals and messaging systems.",
            stats: [
                { label: "Campaigns", value: "210" },
                { label: "Active Clients", value: "38" },
                { label: "Avg. Rating", value: "4.6" },
            ],
        },
    },
    "cerulean-illustrations": {
        id: "cerulean-illustrations",
        heroImage:
            "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=2000&q=80",
        overview:
            "A character illustration pack with inclusive casting, narrative poses, and product onboarding scenes.",
        gallery: [
            "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1545239351-1f8dfd9f6857?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1200&q=80",
        ],
        highlights: [
            "60 unique characters with layered shading",
            "Pose variations for onboarding, product, and support moments",
            "Inclusive skin tones, body types, and mobility devices",
            "Vector and transparent PNG exports",
        ],
        includes: [
            "Figma component library",
            "Illustrator source files",
            "Scene builder with background props",
            "Diversity guideline PDF",
        ],
        specs: [
            { label: "Characters", value: "60" },
            { label: "Scenes", value: "24" },
            { label: "Format", value: "Figma, AI, PNG" },
            { label: "Version", value: "v2.1" },
        ],
        faqs: [
            {
                question: "Are the characters customizable?",
                answer: "Yes, swap outfits, hairstyles, and colour palettes using overrides inside Figma.",
            },
            {
                question: "Do you include accessibility guidance?",
                answer: "We include contrast-ready palettes and usage tips for accessible storytelling.",
            },
            {
                question: "Can I commission custom poses?",
                answer: "Email the attached studio link for custom scene requests starting at $120 per pose.",
            },
        ],
        compatibleWith: ["Figma", "Illustrator", "Sketch", "After Effects"],
        licenseNotes: [
            "Unlimited web and product usage",
            "Merchandise allowance up to 5000 units",
            "Credit required for editorial publications",
        ],
        lastUpdated: "Mar 4, 2025",
        author: {
            name: "Cerulean Collective",
            role: "Illustration Studio",
            avatar:
                "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=200&q=80",
            bio: "Cerulean Collective creates inclusive illustration systems for inclusive product teams at Notion, Linear, and Stripe.",
            stats: [
                { label: "Studio Size", value: "5" },
                { label: "Enterprise Clients", value: "14" },
                { label: "Avg. Rating", value: "4.9" },
            ],
        },
    },
};
