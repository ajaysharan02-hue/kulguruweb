export function SectionHeading({ eyebrow, title, description, align = "left" }) {
  const alignCls = align === "center" ? "text-center" : "text-left";
  const descAlignCls = align === "center" ? "mx-auto" : "";
  return (
    <div className={alignCls}>
      {eyebrow ? (
        <div className="inline-flex items-center gap-2 rounded-full border border-(--gold)/35 bg-(--gold)/10 px-3 py-1 text-[11px] font-semibold text-(--primary)">
          <span className="h-1.5 w-1.5 rounded-full bg-(--gold)" />
          <span className="edu-kicker">{eyebrow}</span>
        </div>
      ) : null}
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      <div className={`mt-4 h-1 w-16 rounded-full bg-(--accent)/75 ${align === "center" ? "mx-auto" : ""}`} />
      {description ? (
        <p className={`mt-4 max-w-2xl text-base leading-7 text-slate-600 ${descAlignCls}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

