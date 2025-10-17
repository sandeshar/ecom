import { Category } from "@/data/homepage";

type CategoryCardProps = {
    item: Category;
};

export default function CategoryCard({ item }: CategoryCardProps) {
    return (
        <article className="group relative cursor-pointer overflow-hidden rounded-xl">
            <div
                className="aspect-square w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url('${item.image}')` }}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <h3 className="text-lg font-bold text-white">{item.name}</h3>
            </div>
        </article>
    );
}
