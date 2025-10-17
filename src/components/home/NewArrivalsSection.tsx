import ProductCard from "@/components/home/cards/ProductCard";
import SectionHeading from "@/components/common/SectionHeading";
import { newArrivals } from "@/data/homepage";

export default function NewArrivalsSection() {
    return (
    <section className="scroll-mt-32 py-16" id="new-arrivals">
            <div className="text-center">
                <SectionHeading
                    title="New Arrivals"
                    subtitle="Freshly crafted designs, just for you."
                />
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {newArrivals.map((item, index) => (
                    <ProductCard index={index} item={item} key={item.id} />
                ))}
            </div>
        </section>
    );
}
