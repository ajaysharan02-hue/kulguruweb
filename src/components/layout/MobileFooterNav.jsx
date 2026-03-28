"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function IconHome({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 10.5V20h5.5v-5h2v5h5.5v-9.5" />
    </svg>
  );
}

function IconGrid({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
    </svg>
  );
}

function IconBell({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7Z" />
      <path d="M13.7 21a2 2 0 0 1-3.4 0" />
    </svg>
  );
}

function IconChat({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />
    </svg>
  );
}

const items = [
  { href: "/", label: "Home", Icon: IconHome },
  { href: "/programs", label: "Programs", Icon: IconGrid },
  { href: "/notices", label: "Notices", Icon: IconBell },
  { href: "/contact", label: "Contact", Icon: IconChat },
];

export function MobileFooterNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-6xl px-4">
        <div
          className="mb-3 rounded-3xl bg-white/90 backdrop-blur border border-slate-200 shadow-soft"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="grid grid-cols-4">
            {items.map(({ href, label, Icon }) => {
              const active =
                href === "/"
                  ? pathname === "/"
                  : pathname === href || pathname?.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative flex flex-col items-center justify-center gap-1 py-3 text-[11px] font-semibold transition ${
                    active ? "text-(--primary)" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {active ? (
                    <span className="absolute top-2 h-1.5 w-10 rounded-full bg-(--accent)" />
                  ) : null}
                  <Icon
                    className={`h-5 w-5 ${
                      active ? "text-(--primary)" : ""
                    }`}
                  />
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

