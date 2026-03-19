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

export function SiteHeader({ brandName = "Kulguru Institute", phone, email }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const items = useMemo(() => nav, []);

  useEffect(() => {
    // Close menu on route change
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/75 backdrop-blur">
      <div className="border-b border-slate-200/70 bg-white">
        <Container className="flex items-center justify-between py-2 text-xs text-slate-600">
          <div className="flex min-w-0 items-center gap-4">
            {phone ? <span className="truncate">Phone: {phone}</span> : null}
            {email ? <span className="hidden truncate sm:inline">Email: {email}</span> : null}
          </div>
          <span className="hidden sm:block">
            Admissions open — <span className="font-semibold text-slate-900">Enroll now</span>
          </span>
        </Container>
      </div>
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-(--primary) text-sm font-semibold text-white shadow-sm ring-1 ring-white/10">
            {String(brandName || "K").slice(0, 1).toUpperCase()}
          </span>
          <span className="truncate text-base font-semibold tracking-tight text-slate-900">
            {brandName}
          </span>
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
                className={`rounded-xl px-4 py-2 transition ${
                  active
                    ? "bg-slate-100 text-slate-900"
                    : "hover:bg-slate-100 hover:text-slate-900"
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
            className="hidden bg-(--primary) text-white sm:inline-flex"
          >
            Apply Now
          </Button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 md:hidden"
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
        <div className="border-t border-slate-200/70 bg-white">
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
                    className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                      active
                        ? "bg-slate-100 text-slate-900"
                        : "text-slate-700 hover:bg-slate-50"
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
                  className="w-full bg-(--primary) text-white"
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

