"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";

export function HeroCarousel({ items = [] }) {
  const slides = useMemo(() => items.filter(Boolean), [items]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  if (!slides.length) return null;

  const active = slides[Math.min(index, slides.length - 1)];

  return (
    <section className="relative overflow-hidden bg-[color:var(--primary)]">
      <div className="absolute inset-0">
        {active?.imageUrl ? (
          <Image
            src={active.image || active.imageUrl}
            alt={active.title || "Banner"}
            fill
            priority
            className="object-cover opacity-60"
            sizes="100vw"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70" />
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[color:var(--accent)]/18 blur-3xl" />
        <div className="absolute -bottom-48 -right-40 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-24">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/80 ring-1 ring-white/15">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
            Admissions • Programs • Degrees
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {active?.title || "Build your future with us"}
          </h1>
          {active?.subtitle ? (
            <p className="mt-5 text-base leading-7 text-white/75 sm:text-lg">
              {active.subtitle}
            </p>
          ) : (
            <p className="mt-5 text-base leading-7 text-white/75 sm:text-lg">
              Industry-ready programs, expert mentors, and guided enrollment support.
            </p>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button as="link" href={active?.buttonLink || "/contact"} size="lg">
              {active?.buttonText || "Enroll Now"}
            </Button>
            <Button as="link" href="/programs" variant="secondary" size="lg" className="bg-white/95">
              Explore Programs
            </Button>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 text-center text-xs text-white/80">
            <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
              <div className="text-lg font-semibold text-white">100%</div>
              <div className="mt-1">Guidance</div>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
              <div className="text-lg font-semibold text-white">Top</div>
              <div className="mt-1">Programs</div>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
              <div className="text-lg font-semibold text-white">Fast</div>
              <div className="mt-1">Enrollment</div>
            </div>
          </div>

          {slides.length > 1 ? (
            <div className="mt-10 flex items-center gap-3">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-2.5 w-2.5 rounded-full ring-1 ring-white/30 transition ${
                    i === index ? "bg-white" : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

