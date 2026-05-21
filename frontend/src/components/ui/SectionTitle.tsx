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
  const alignClass = align === "center" ? "text-center mx-auto" : "";
  return (
    <Reveal className={`max-w-3xl ${alignClass}`}>
      {eyebrow && <div className="eyebrow mb-3 sm:mb-4">{eyebrow}</div>}
      <h2 className="font-serif text-[1.625rem] leading-[1.15] text-white sm:text-4xl lg:text-5xl">
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
        <p className="mt-4 text-sm text-white/60 sm:mt-5 sm:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
