type SectionHeadingProps = {
    title: string;
    subtitle: string;
    align?: "left" | "center";
};

export default function SectionHeading({ title, subtitle, align = "center" }: SectionHeadingProps) {
    const alignment = align === "center" ? "text-center" : "text-left";

    return (
        <div className={`${alignment} flex flex-col gap-4`}>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {title}
            </h2>
            <p className="text-lg text-slate-900/70">{subtitle}</p>
        </div>
    );
}
