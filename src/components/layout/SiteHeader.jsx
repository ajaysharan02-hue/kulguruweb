"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const nav = [
  { href: "/", label: "Home" },
  { href: "/programs", label: "Programs" },
  { href: "/notices", label: "Notices" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Enroll / Contact" },
];

export function SiteHeader({ brandName = "Kulguru Institute", logo, phone, email }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const items = useMemo(() => nav, []);

  useEffect(() => {
    // Close menu on route change
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-[#c3dad0]/90 bg-white/85 backdrop-blur">
      <div className="border-b border-[#c3dad0]/80 bg-white/95">
        <Container className="flex items-center justify-between py-2 text-xs text-slate-600">
          <div className="flex min-w-0 items-center gap-4">
            {phone ? <span className="truncate">Phone: {phone}</span> : null}
            {email ? <span className="hidden truncate sm:inline">Email: {email}</span> : null}
          </div>
          <span className="hidden sm:block">
            Admissions open — <span className="font-semibold text-(--primary)">Enroll now</span>
          </span>
        </Container>
      </div>
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logo}
              alt={brandName}
              className="w-32 "
            />
          ) : (
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-linear-to-r from-(--primary) to-(--accent) text-sm font-semibold text-white shadow-[0_8px_20px_rgb(15_107_76/0.32)] ring-1 ring-white/35">
              {String(brandName || "K").slice(0, 1).toUpperCase()}
            </span>
          )}
       
        </Link>
        <nav className="hidden items-center gap-1 text-sm font-medium text-slate-700 md:flex">
          {items.map((i) => {
            const active =
              i.href === "/"
                ? pathname === "/"
                : pathname === i.href || pathname?.startsWith(i.href + "/");

            return (
              <Link
                key={i.href}
                href={i.href}
                className={`rounded-xl px-4 py-2 transition ${active
                    ? "bg-(--primary)/12 text-(--primary)"
                    : "hover:bg-(--accent)/10 hover:text-(--primary)"
                  }`}
              >
                {i.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Button
            as="link"
            href="/contact"
            size="md"
            className="hidden sm:inline-flex"
          >
            Apply Now
          </Button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#c3dad0] bg-white text-(--primary) shadow-sm hover:bg-[#f3fbf7] md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <span className="text-xl leading-none">×</span>
            ) : (
              <span className="text-xl leading-none">☰</span>
            )}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      <div className={`md:hidden ${open ? "block" : "hidden"}`}>
        <div className="border-t border-[#c3dad0]/80 bg-white">
          <Container className="py-4">
            <div className="grid gap-2">
              {items.map((i) => {
                const active =
                  i.href === "/"
                    ? pathname === "/"
                    : pathname === i.href || pathname?.startsWith(i.href + "/");
                return (
                  <Link
                    key={i.href}
                    href={i.href}
                    className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${active
                        ? "bg-(--primary)/12 text-(--primary)"
                        : "text-slate-700 hover:bg-(--accent)/10"
                      }`}
                    onClick={() => setOpen(false)}
                  >
                    {i.label}
                  </Link>
                );
              })}

              <div className="pt-2">
                <Button
                  as="link"
                  href="/contact"
                  size="lg"
                  className="w-full"
                >
                  Apply Now
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </header>
  );
}

