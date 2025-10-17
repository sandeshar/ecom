import CategoriesSection from "@/components/CategoriesSection";
import FeaturedSection from "@/components/FeaturedSection";
import HeroSection from "@/components/HeroSection";
import NewsletterSection from "@/components/NewsletterSection";
import NewArrivalsSection from "@/components/NewArrivalsSection";
import TestimonialsSection from "@/components/TestimonialsSection";

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
