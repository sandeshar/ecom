import CategoryCard from "@/components/home/cards/CategoryCard";
import SectionHeading from "@/components/common/SectionHeading";
import { categoryFilters, popularCategories } from "@/data/homepage";

export default function CategoriesSection() {
    return (
        <section className="scroll-mt-32 py-16" id="categories">
            <div className="text-center">
                <SectionHeading
                    title="Popular Categories"
                    subtitle="Explore designs based on your favorite styles."
                />
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-4">
                {categoryFilters.map((filter) => (
                    <button
                        key={filter}
                        className="rounded-full bg-indigo-500/10 px-6 py-2 text-sm font-medium text-indigo-500 transition-colors hover:bg-indigo-500 hover:text-white"
                        type="button"
                    >
                        {filter}
                    </button>
                ))}
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
                {popularCategories.map((category) => (
                    <CategoryCard item={category} key={category.id} />
                ))}
            </div>
        </section>
    );
}
