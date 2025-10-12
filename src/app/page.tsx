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
    </>
  );
}
