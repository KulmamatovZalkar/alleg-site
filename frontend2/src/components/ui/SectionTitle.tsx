import Reveal from "@/components/ui/Reveal";

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  const alignClass = align === "center" ? "text-center mx-auto items-center" : "";
  return (
    <Reveal className={`flex max-w-3xl flex-col ${alignClass}`}>
      {eyebrow && (
        <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-gold-50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-600">
          {eyebrow}
        </div>
      )}
      <h2 className="font-serif text-[2rem] leading-[1.08] tracking-tight text-body sm:text-5xl lg:text-6xl">
        {title.split("|").map((part, i) =>
          i % 2 === 0 ? (
            <span key={i}>{part}</span>
          ) : (
            <span key={i} className="gold-text">
              {part}
            </span>
          )
        )}
      </h2>
      {subtitle && (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-body-muted sm:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
