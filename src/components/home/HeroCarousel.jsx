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
    <section className="px-4 pt-6 sm:pt-8">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl border border-[#b8d4c8] bg-linear-to-r from-[#0e5f45] via-[#127251] to-[#1b8a63] shadow-[0_22px_40px_rgb(15_107_76/0.32)]">
          <div className="anim-pulse-glow absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/12 blur-3xl" />
          <div className="anim-pulse-glow absolute -bottom-28 right-8 h-72 w-72 rounded-full bg-[#e1b85a]/24 blur-3xl" />
          <div className="grid items-stretch gap-0 md:grid-cols-2">
            <div className="relative p-6 text-white sm:p-8 md:p-10 lg:p-12">
              <div className="anim-fade-up inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/90">
                Admissions Open
              </div>
              <h1 className="anim-fade-up anim-delay-1 mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                {active?.title || "Pursue your dream degree"}
              </h1>
              <p className="anim-fade-up anim-delay-2 mt-4 max-w-xl text-sm leading-7 text-white/85 sm:text-base">
                {active?.subtitle || "Partnered with top universities and career-focused programs."}
              </p>
              <div className="anim-fade-up anim-delay-3 mt-6 flex flex-wrap gap-3">
                <Button
                  as="link"
                  href={active?.buttonLink || "/programs"}
                  size="md"
                  className="h-10 bg-white text-[#0f6b4c] shadow-sm hover:bg-[#f2faf6]"
                >
                  {active?.buttonText || "Explore Courses"}
                </Button>
                <Button
                  as="link"
                  href="/contact"
                  variant="secondary"
                  size="md"
                  className="h-10 border-white/30 bg-transparent text-black hover:bg-white/10 hover:text-white"
                >
                  Get In Touch
                </Button>
              </div>
              <div className="anim-fade-up anim-delay-4 mt-6 grid max-w-md grid-cols-3 gap-2 text-center">
                {[
                  { value: "50+", label: "Programs" },
                  { value: "10K+", label: "Students" },
                  { value: "100%", label: "Guidance" },
                ].map((stat) => (
                  <div key={stat.label} className="anim-float-soft rounded-xl border border-white/25 bg-white/10 px-3 py-2">
                    <div className="text-base font-bold">{stat.value}</div>
                    <div className="text-[10px] uppercase tracking-wider text-white/80">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative min-h-[260px] md:min-h-[360px]">
              {active?.imageUrl ? (
                <Image
                  src={active.image || active.imageUrl}
                  alt={active.title || "Banner"}
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : null}
              <div className="absolute inset-0 bg-linear-to-r from-[#0e5f45]/45 via-transparent to-transparent md:from-[#0e5f45]/20" />
              <div className="anim-fade-up anim-delay-3 absolute bottom-4 left-4 right-4 rounded-xl border border-white/35 bg-white/90 px-4 py-3 text-[#184637] shadow-lg md:left-auto md:right-6 md:w-64">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#2c6b57]">Trusted Education</div>
                <div className="mt-1 text-sm font-semibold">Career-focused curriculum</div>
              </div>
            </div>
          </div>
          {slides.length > 1 ? (
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition ${i === index ? "w-6 bg-white" : "w-2 bg-white/60 hover:bg-white/85"
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

