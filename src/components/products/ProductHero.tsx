export default function ProductHero() {
    return (
        <section className="relative h-72 w-full overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80')",
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/30" />

            <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center gap-4 px-4 text-white sm:px-6 lg:px-8">
                <span className="text-xs font-semibold uppercase tracking-[0.4em] text-indigo-200">Design marketplace</span>
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Curated Digital Products</h1>
                <p className="max-w-2xl text-sm text-white/80 md:text-base">
                    Browse premium illustrations, UI kits, templates, and creative assets crafted by independent designers.
                </p>
            </div>
        </section>
    );
}
