import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedSection from "@/components/home/FeaturedSection";
import HeroSection from "@/components/home/HeroSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import NewArrivalsSection from "@/components/home/NewArrivalsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";

export default function Home() {
    return (
        <main className="flex flex-1 flex-col">
            <HeroSection />
            <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-16 sm:px-6 lg:px-8">
                <FeaturedSection />
                <NewArrivalsSection />
                <CategoriesSection />
                <TestimonialsSection />
                <NewsletterSection />
            </div>
        </main>
    );
}
