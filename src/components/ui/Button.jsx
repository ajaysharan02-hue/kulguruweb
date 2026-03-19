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
    "inline-flex items-center justify-center rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]/25 disabled:opacity-60 disabled:pointer-events-none";
  const variants = {
    primary:
      "bg-[color:var(--primary)] text-white shadow-sm hover:shadow-md hover:brightness-110 active:brightness-95",
    secondary:
      "bg-white text-slate-900 ring-1 ring-slate-200 shadow-sm hover:bg-slate-50 hover:shadow-md",
    ghost: "text-slate-900 hover:bg-slate-100",
    accent:
      "bg-[color:var(--accent)] text-slate-950 shadow-sm hover:shadow-md hover:brightness-105 active:brightness-95",
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

