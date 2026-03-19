export function SectionHeading({ eyebrow, title, description, align = "left" }) {
  const alignCls = align === "center" ? "text-center" : "text-left";
  return (
    <div className={alignCls}>
      {eyebrow ? (
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
          <span className="uppercase tracking-wider">{eyebrow}</span>
        </div>
      ) : null}
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
          {description}
        </p>
      ) : null}
    </div>
  );
}

