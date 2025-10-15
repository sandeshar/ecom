import Button from "@/components/Button";

export default function Home() {
  return (
    <>
      <section className="flex flex-col items-center justify-center h-screen text-white space-y-6 bg-[url('/hero_bg.jpg')] bg-cover relative">
        <div className="bg-black opacity-25 absolute inset-0 h-screen" />
        <h1 className="text-7xl font-bold relative">Discover Unique Designs</h1>
        <p className="text-2xl relative">Explore our curated collection of exclusive designs.</p>
        <Button text="Shop Now" classname="relative" />
      </section>
      <section>
        <h2 className="text-4xl font-bold text-center my-12">Featured Products</h2>
      </section>
      <section className="text-center my-12">
        <h2 className="text-4xl font-bold mb-6">Why Choose Us?</h2>
        <p className="text-lg max-w-3xl mx-auto">
          We offer a unique selection of designs that you won't find anywhere else. Our commitment to quality and customer satisfaction sets us apart in the industry.
        </p>
      </section>
      <section className="text-center my-12">
        <h2 className="text-4xl font-bold mb-6">Join Our Community</h2>
        <p className="text-lg max-w-3xl mx-auto">
          Connect with like-minded individuals and stay updated on the latest trends and exclusive offers by joining our community.
        </p>
      </section>
    </>
  );
}
