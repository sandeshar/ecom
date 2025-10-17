import type { CSSProperties } from "react";
import { Product } from "@/data/homepage";

type ProductCardProps = {
    item: Product;
    index: number;
};

export default function ProductCard({ item, index }: ProductCardProps) {
    const animationStyle = {
        "--stagger-index": index + 1,
    } as CSSProperties;

    return (
        <article
            className="group animate-fade-in stagger-animation rounded-xl bg-white shadow-lg transition-shadow duration-300 hover:-translate-y-1 hover:shadow-2xl"
            style={animationStyle}
        >
            <div className="overflow-hidden rounded-t-xl">
                <div
                    className="aspect-square w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url('${item.image}')` }}
                />
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-900/70">{item.description}</p>
            </div>
        </article>
    );
}
