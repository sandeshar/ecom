export default function NewsletterSection() {
    return (
        <section className="flex flex-col items-center gap-6 rounded-xl bg-indigo-500/10 px-4 py-20 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Join Our Creative Community
            </h2>
            <p className="max-w-2xl text-slate-900/70">
                Sign up for our newsletter to get the latest updates and exclusive offers.
            </p>
            <form className="mt-4 flex w-full max-w-md items-center gap-2">
                <label className="sr-only" htmlFor="newsletter-email">
                    Email address
                </label>
                <input
                    className="h-12 w-full rounded-full border border-white/40 bg-white px-5 text-base text-slate-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    id="newsletter-email"
                    placeholder="Enter your email"
                    type="email"
                />
                <button
                    className="flex h-12 min-w-[120px] items-center justify-center rounded-full bg-indigo-500 px-6 text-base font-bold text-white shadow-lg transition-transform duration-300 hover:scale-105"
                    type="submit"
                >
                    Subscribe
                </button>
            </form>
        </section>
    );
}
