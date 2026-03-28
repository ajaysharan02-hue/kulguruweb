import Link from "next/link";

export function Button({
  as = "button",
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  on,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]/35 disabled:opacity-60 disabled:pointer-events-none";
  const variants = {
    primary:
      "bg-linear-to-r from-(--primary) to-(--accent) text-white shadow-[0_12px_28px_rgb(15_107_76_/_0.32)] hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgb(15_107_76_/_0.4)] active:translate-y-0",
    secondary:
      "bg-white text-slate-900 ring-1 ring-[#c3dad0] shadow-sm hover:bg-[#f3fbf7] hover:shadow-md",
    ghost: "text-slate-900 hover:bg-slate-100",
    accent:
      "bg-linear-to-r from-(--gold) to-[#f0d489] text-[#194334] shadow-[0_12px_28px_rgb(186_144_52_/_0.26)] hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgb(186_144_52_/_0.32)] active:translate-y-0",
  };
  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-4 text-sm",
    lg: "h-12 px-5 text-base",
  };

  const cls = `${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`.trim();

  if (as === "link") {
    // Don't forward unknown boolean props (e.g. `on`) to <a>
    return (
      <Link className={cls} href={href || "#"} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}

