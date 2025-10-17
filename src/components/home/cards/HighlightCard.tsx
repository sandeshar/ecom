import { Highlight } from "@/data/homepage";

type HighlightCardProps = {
    item: Highlight;
};

export default function HighlightCard({ item }: HighlightCardProps) {
    return (
        <article className="group w-80 flex-none transform-gpu transition-transform duration-300 hover:-translate-y-2">
            <div className="relative overflow-hidden rounded-xl shadow-lg">
                <div
                    className="aspect-video w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url('${item.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 p-6">
                    <h3 className="font-bold text-white">{item.title}</h3>
                    <p className="text-sm text-white/80">{item.description}</p>
                </div>
            </div>
        </article>
    );
}
