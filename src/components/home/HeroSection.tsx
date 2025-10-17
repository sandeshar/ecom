import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="relative h-screen w-full overflow-hidden" id="home">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD0MfIaE0braVGMVTaoqjm4Bx8uzeScL09TjIXTSWbfWZhQ3w7M3QxDfHwWUrV_JYd3Cwm3v9uCeLJVLYjP6mwVoOcwfXlXFeVE1wknKxLBgple_gtlcvG_rCy8AP13AvwchYLkMlH0QsXWbEVLFzgOyiaGtwZ0NSZKiBs75PlKnzHofs9Wrs2rQ3ko8q8bO02SHD7hJ-98VDqS24pvKbQJVTMGWnlaiLb0wauZ6fU-kcPWSaF2PUk-OAtOmTOCG61CM3L_KqAEv7A')",
                }}
            />
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(to top, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.4), rgba(0, 0, 0, 0.3))",
                }}
            />

            <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-4 text-center text-white">
                <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight animate-fade-in-down md:text-7xl" style={{ animationDelay: "0.2s" }}>
                    Discover Unique Designs
                </h1>
                <p className="max-w-2xl text-lg text-white/80 animate-fade-in-down md:text-xl" style={{ animationDelay: "0.4s" }}>
                    Explore a curated collection of digital designs for all your creative needs.
                </p>
                <Link
                    className="mt-4 flex h-14 min-w-[160px] items-center justify-center rounded-full bg-indigo-500 px-8 text-lg font-bold text-white shadow-lg transition-transform duration-300 hover:scale-105 animate-fade-in-down"
                    href="/products"
                    style={{ animationDelay: "0.6s" }}
                >
                    Browse Collection
                </Link>
            </div>
        </section>
    );
}
