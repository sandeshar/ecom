import type { Testimonial } from "@/data/homepage";

const MAX_STARS = 5;

type TestimonialCardProps = {
    item: Testimonial;
};

export default function TestimonialCard({ item }: TestimonialCardProps) {
    const starIcons = Array.from({ length: MAX_STARS }, (_, index) => {
        const value = item.rating - index;

        if (value >= 1) return "star";
        if (value >= 0.5) return "star_half";
        return "star_outline";
    });

    return (
        <article className="rounded-xl bg-white p-8 shadow-lg transition-transform duration-300 hover:-translate-y-2">
            <div className="flex items-center gap-4">
                <img alt={item.name} className="size-14 rounded-full object-cover" src={item.avatar} />
                <div>
                    <h3 className="font-semibold text-slate-900">{item.name}</h3>
                    <div className="flex items-center gap-0.5 text-yellow-500">
                        {starIcons.map((icon, idx) => (
                            <span className="material-symbols-outlined text-base" key={`${item.id}-star-${idx}`}>
                                {icon}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <p className="mt-6 text-slate-900/80">{item.quote}</p>
        </article>
    );
}
