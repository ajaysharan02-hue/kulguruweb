"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { resolvePublicUrl } from "@/lib/config";
import { Container } from "@/components/ui/Container";

function partnerImageSrc(partner) {
  const raw = partner?.image || partner?.imageUrl;
  return resolvePublicUrl(raw);
}

function ChevronLeft({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Partner institutes — horizontal scroller with prev/next when content overflows.
 */
export function ServicePartnersSection({ partners = [] }) {
  const list = (partners || []).filter((p) => p && (p.image || p.imageUrl));
  const scrollerRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateScrollButtons = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const max = scrollWidth - clientWidth;
    setCanLeft(scrollLeft > 6);
    setCanRight(max > 6 && scrollLeft < max - 6);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || !list.length) return;
    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    const ro = new ResizeObserver(updateScrollButtons);
    ro.observe(el);
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      ro.disconnect();
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [list.length, updateScrollButtons]);

  useEffect(() => {
    const t = setTimeout(updateScrollButtons, 350);
    return () => clearTimeout(t);
  }, [list, updateScrollButtons]);

  const scrollByDir = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = Math.min(el.clientWidth * 0.72, 360);
    el.scrollBy({ left: dir === "next" ? step : -step, behavior: "smooth" });
  };

  if (!list.length) return null;

  return (
    <section className="relative border-y border-[#c2d9cf]/80 bg-linear-to-b from-white via-[#f4faf7] to-white">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-35" aria-hidden />

      <Container className="relative py-14 sm:py-16">
        {/* Header: title + description; nav top-right (row on desktop, buttons right on mobile) */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div className="min-w-0 max-w-3xl flex-1 text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e1b85a]/40 bg-[#e1b85a]/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#0f6b4c]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c9a227]" />
              Partner institutes
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Institutes we work with
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#4f6f65] sm:text-base">
              Institutes that run programs with us — admissions, academics, and student support through trusted
              collaborations.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2 self-end sm:self-start sm:pt-1">
            <button
              type="button"
              onClick={() => scrollByDir("prev")}
              disabled={!canLeft}
              aria-label="Previous partners"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#c2d9cf] bg-white text-[#0f6b4c] shadow-sm transition hover:border-[#0f6b4c]/40 hover:bg-[#f0f7f3] disabled:pointer-events-none disabled:opacity-35"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByDir("next")}
              disabled={!canRight}
              aria-label="Next partners"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#c2d9cf] bg-white text-[#0f6b4c] shadow-sm transition hover:border-[#0f6b4c]/40 hover:bg-[#f0f7f3] disabled:pointer-events-none disabled:opacity-35"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scroller */}
        <div className="relative mt-10">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-[#f4faf7] to-transparent sm:w-14"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-[#f4faf7] to-transparent sm:w-14"
            aria-hidden
          />

          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden pb-2 pt-1 [scrollbar-width:thin] [scrollbar-color:#b8d4c8_transparent] sm:gap-5 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#b8d4c8]"
          >
            {list.map((partner, i) => {
              const src = partnerImageSrc(partner);
              return (
                <article
                  key={partner._id || `${partner.name}-${i}`}
                  className="group w-[min(100%,260px)] shrink-0 snap-start sm:w-[240px]"
                >
                  <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#c2d9cf] bg-white/95 shadow-soft ring-1 ring-[#0f6b4c]/10 transition duration-300 hover:-translate-y-0.5 hover:border-[#0f6b4c]/30 hover:shadow-lg">
                    <div className="relative border-b border-[#e3efe8] bg-linear-to-br from-[#f5faf7] via-white to-[#ecf5f0] px-4 py-5">
                      <span className="absolute right-3 top-3 rounded-full bg-[#0f6b4c]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#0f6b4c]">
                        Program partner
                      </span>
                      <div className="mx-auto flex h-[100px] w-full max-w-[200px] items-center justify-center pt-5">
                        {/* eslint-disable-next-line @next/next/no-img-element -- dynamic API URLs */}
                        <img
                          src={src}
                          alt={partner.name ? `${partner.name} logo` : "Partner institute logo"}
                          className="max-h-[72px] max-w-full object-contain opacity-95 transition duration-300 group-hover:scale-[1.03] group-hover:opacity-100"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
                      <h3 className="text-center text-sm font-semibold leading-snug text-[#1d4638]">{partner.name}</h3>
                      {partner.description ? (
                        <p className="mt-2 line-clamp-2 text-center text-xs leading-relaxed text-[#57776b]">
                          {partner.description}
                        </p>
                      ) : (
                        <p className="mt-2 text-center text-[11px] leading-relaxed text-[#7a9388]">
                          Programs & admissions in partnership
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
