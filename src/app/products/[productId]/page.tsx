import Link from "next/link";
import { notFound } from "next/navigation";
import ProductListingCard from "@/components/products/ProductListingCard";
import {
    catalogProducts,
    productBreadcrumbs,
    productDetails,
    type CatalogProduct,
} from "@/data/products";
import type { Metadata } from "next";

type ProductDetailPageProps = {
    params: {
        productId: string;
    };
};

type Breadcrumb = {
    label: string;
    href?: string;
};

const MAX_STARS = 5;

function getStarIcons(rating: number) {
    return Array.from({ length: MAX_STARS }, (_, index) => {
        const value = rating - index;
        if (value >= 1) return "star";
        if (value >= 0.5) return "star_half";
        return "star_outline";
    });
}

export function generateMetadata({ params }: ProductDetailPageProps): Metadata {
    const product = catalogProducts.find((item) => item.id === params.productId);

    if (!product) {
        return {
            title: "Product not found | Design Hub",
        };
    }

    return {
        title: `${product.title} | Design Hub`,
        description: product.description,
    };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
    const catalogProduct = catalogProducts.find((item) => item.id === params.productId);
    const detail = productDetails[params.productId];

    if (!catalogProduct || !detail) {
        return notFound();
    }

    const breadcrumbs: Breadcrumb[] = [...productBreadcrumbs, { label: catalogProduct.title }];
    const starIcons = getStarIcons(catalogProduct.rating);
    const recommended = catalogProducts.filter((item) => item.id !== catalogProduct.id).slice(0, 4);

    return (
        <main className="flex flex-1 flex-col bg-slate-50">
            <section className="relative overflow-hidden pb-16 pt-28 text-white">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${detail.heroImage}')` }}
                />
                <div className="absolute inset-0 bg-slate-950/70" />

                <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
                    <Link
                        href="/products"
                        className="group inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-white/80 backdrop-blur transition hover:border-white/40 hover:text-white"
                    >
                        <span className="material-symbols-outlined text-base transition-transform group-hover:-translate-x-1">
                            arrow_back
                        </span>
                        Marketplace
                    </Link>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-3 text-xs text-white/70">
                                {breadcrumbs.map((breadcrumb, index) => (
                                    <span className="flex items-center gap-3" key={`${breadcrumb.label}-${index}`}>
                                        {breadcrumb.href ? (
                                            <Link
                                                className="transition hover:text-white"
                                                href={breadcrumb.href}
                                            >
                                                {breadcrumb.label}
                                            </Link>
                                        ) : (
                                            <span>{breadcrumb.label}</span>
                                        )}
                                        {index < breadcrumbs.length - 1 ? <span className="text-white/30">/</span> : null}
                                    </span>
                                ))}
                            </div>
                            <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
                                {catalogProduct.title}
                            </h1>
                            <p className="max-w-2xl text-base text-white/80 sm:text-lg">{detail.overview}</p>
                        </div>
                        <div className="flex flex-col items-start gap-4 rounded-3xl bg-white/10 p-6 text-white shadow-xl backdrop-blur md:text-right">
                            <div className="text-sm uppercase tracking-[0.4em] text-white/60">Starting at</div>
                            <div className="text-3xl font-semibold">{catalogProduct.price}</div>
                            <div className="flex items-center gap-3 text-sm text-white/70">
                                <div className="flex items-center gap-1 text-amber-400">
                                    {starIcons.map((icon, index) => (
                                        <span className="material-symbols-outlined text-lg" key={`${catalogProduct.id}-rating-${index}`}>
                                            {icon}
                                        </span>
                                    ))}
                                </div>
                                <span>
                                    {catalogProduct.rating.toFixed(1)} · {catalogProduct.reviews} reviews
                                </span>
                            </div>
                            <div className="flex w-full flex-col gap-3 text-sm sm:flex-row md:flex-col lg:flex-row lg:text-right">
                                <Link
                                    href="/checkout"
                                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5"
                                >
                                    <span className="material-symbols-outlined text-base">flash_on</span>
                                    Instant download
                                </Link>
                                <Link
                                    href="/cart"
                                    className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white transition hover:border-white"
                                >
                                    <span className="material-symbols-outlined text-base">shopping_cart</span>
                                    Add to cart
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-[1.7fr_1fr]">
                    <div className="space-y-10">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="relative col-span-2 overflow-hidden rounded-3xl">
                                <div
                                    className="aspect-[16/9] w-full bg-cover bg-center"
                                    style={{ backgroundImage: `url('${detail.gallery[0]}')` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/30 via-slate-900/0 to-slate-900/30" />
                            </div>
                            {detail.gallery.slice(1).map((image, index) => (
                                <div
                                    className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100"
                                    key={`${detail.id}-gallery-${index}`}
                                >
                                    <div
                                        className="aspect-[4/3] w-full bg-cover bg-center"
                                        style={{ backgroundImage: `url('${image}')` }}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="grid gap-10 rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
                            <div className="space-y-6">
                                <h2 className="text-2xl font-semibold text-slate-900">What you&apos;ll love</h2>
                                <ul className="grid gap-4 sm:grid-cols-2">
                                    {detail.highlights.map((highlight) => (
                                        <li className="flex items-start gap-3 rounded-3xl bg-slate-50 p-5 text-sm text-slate-700" key={highlight}>
                                            <span className="material-symbols-outlined mt-1 text-base text-indigo-500">auto_awesome</span>
                                            <span>{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900">What&apos;s inside</h3>
                                    <ul className="mt-4 space-y-3 text-sm text-slate-600">
                                        {detail.includes.map((includeItem) => (
                                            <li className="flex items-center gap-3" key={includeItem}>
                                                <span className="material-symbols-outlined text-base text-slate-400">check_circle</span>
                                                {includeItem}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900">Compatibility</h3>
                                    <ul className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
                                        {detail.compatibleWith.map((tool) => (
                                            <li
                                                className="rounded-full bg-slate-100 px-4 py-2 text-slate-700"
                                                key={tool}
                                            >
                                                {tool}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-slate-900">Technical specs</h3>
                                <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                                    {detail.specs.map((spec) => (
                                        <div
                                            className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                                            key={`${spec.label}-${spec.value}`}
                                        >
                                            <dt className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                                                {spec.label}
                                            </dt>
                                            <dd className="mt-2 text-sm text-slate-700">{spec.value}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>

                            <div className="rounded-3xl bg-slate-900 px-8 py-10 text-white">
                                <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="size-16 rounded-2xl bg-cover bg-center ring-2 ring-indigo-500/50"
                                            style={{ backgroundImage: `url('${detail.author.avatar}')` }}
                                        />
                                        <div>
                                            <div className="text-sm uppercase tracking-[0.3em] text-white/70">Creator</div>
                                            <div className="mt-1 text-lg font-semibold">{detail.author.name}</div>
                                            <div className="text-sm text-white/60">{detail.author.role}</div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-white/70 md:max-w-xl">
                                        {detail.author.bio}
                                    </div>
                                    <div className="flex gap-4">
                                        {detail.author.stats.map((stat) => (
                                            <div className="rounded-3xl bg-white/10 px-6 py-4 text-center" key={stat.label}>
                                                <div className="text-xs uppercase tracking-[0.3em] text-white/60">
                                                    {stat.label}
                                                </div>
                                                <div className="mt-2 text-lg font-semibold">{stat.value}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-10 shadow-sm md:grid-cols-2">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900">FAQs</h3>
                                <ul className="mt-5 space-y-4 text-sm text-slate-700">
                                    {detail.faqs.map((faq) => (
                                        <li key={faq.question}>
                                            <div className="font-semibold text-slate-900">{faq.question}</div>
                                            <div className="mt-2 text-slate-600">{faq.answer}</div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900">License</h3>
                                <ul className="mt-5 space-y-3 text-sm text-slate-600">
                                    {detail.licenseNotes.map((note) => (
                                        <li className="flex items-start gap-3" key={note}>
                                            <span className="material-symbols-outlined text-base text-indigo-500">verified</span>
                                            <span>{note}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-6 rounded-3xl border border-dashed border-indigo-200 bg-indigo-50 p-5 text-xs text-indigo-600">
                                    Last updated on {detail.lastUpdated}. Future updates are included with your purchase.
                                </div>
                            </div>
                        </div>
                    </div>

                    <aside className="space-y-8">
                        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                            <h2 className="text-lg font-semibold text-slate-900">Purchase options</h2>
                            <div className="mt-6 space-y-5">
                                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-sm font-semibold text-slate-900">Commercial License</div>
                                            <div className="text-xs text-slate-500">Unlimited client projects</div>
                                        </div>
                                        <div className="text-lg font-semibold text-indigo-600">{catalogProduct.price}</div>
                                    </div>
                                    <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5">
                                        <span className="material-symbols-outlined text-base">shopping_bag</span>
                                        Add to cart
                                    </button>
                                </div>
                                <div className="rounded-3xl border border-indigo-200 bg-indigo-50 p-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-sm font-semibold text-indigo-900">Extended License</div>
                                            <div className="text-xs text-indigo-600">Up to 10 team seats</div>
                                        </div>
                                        <div className="text-lg font-semibold text-indigo-900">$89</div>
                                    </div>
                                    <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-indigo-200 bg-white px-5 py-3 text-sm font-semibold text-indigo-700 transition hover:-translate-y-0.5">
                                        <span className="material-symbols-outlined text-base">workspace_premium</span>
                                        Upgrade license
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                            <h2 className="text-lg font-semibold text-slate-900">Need help?</h2>
                            <p className="mt-3 text-sm text-slate-600">
                                Book a handoff session to customise assets or request a bespoke illustration to match this pack.
                            </p>
                            <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5">
                                <span className="material-symbols-outlined text-base">support_agent</span>
                                Contact studio
                            </button>
                        </div>
                    </aside>
                </div>
            </section>

            <section className="border-t border-slate-200 bg-white py-16">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold text-slate-900">You might also like</h2>
                        <Link className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-500" href="/products">
                            Explore marketplace
                        </Link>
                    </div>
                    <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                        {recommended.map((product: CatalogProduct) => (
                            <ProductListingCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
