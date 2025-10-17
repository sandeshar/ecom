import TestimonialCard from "@/components/cards/TestimonialCard";
import SectionHeading from "@/components/SectionHeading";
import { testimonials } from "@/data/homepage";

export default function TestimonialsSection() {
    return (
        <section className="py-16">
            <div className="text-center">
                <SectionHeading
                    title="What Our Customers Say"
                    subtitle="Hear from our community of creators and designers."
                />
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((item) => (
                    <TestimonialCard item={item} key={item.id} />
                ))}
            </div>
        </section>
    );
}
