export default function SectionHeading({
  eyebrow,
  title,
  aside,
}: {
  eyebrow: string;
  title: string;
  aside?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-wrap items-baseline gap-4">
        <span className="text-[11px] tracking-[0.3em] text-flame">
          {eyebrow}
        </span>
        <h2 className="font-display text-[28px] font-medium text-ink md:text-[34px]">
          {title}
        </h2>
      </div>
      {aside}
    </div>
  );
}
