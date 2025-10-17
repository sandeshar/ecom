import HighlightCard from "@/components/home/cards/HighlightCard";
import SectionHeading from "@/components/common/SectionHeading";
import { featuredHighlights } from "@/data/homepage";

export default function FeaturedSection() {
    return (
        <section className="py-16">
            <div className="text-center">
                <SectionHeading
                    title="Featured Designs"
                    subtitle="Handpicked selections from our creative community."
                />
            </div>
            <div className="mt-12 flex gap-8 overflow-x-auto pb-8 [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {featuredHighlights.map((item) => (
                    <HighlightCard item={item} key={item.id} />
                ))}
            </div>
        </section>
    );
}
