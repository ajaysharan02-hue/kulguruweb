import Link from "next/link";
import { getBanners, getNotifications, getPrograms, getSettings } from "@/lib/api";
import { SITE_NAME } from "@/lib/config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { HeroCarousel } from "@/components/home/HeroCarousel";

export async function generateMetadata() {
  const settingsRes = await getSettings().catch(() => null);
  const settings = settingsRes?.data || {};
  const brandName = settings?.brandName || settings?.instituteName || SITE_NAME;

  return {
    title: "Home",
    description:
      settings?.tagline ||
      "Professional programs, degrees, and enrollment guidance.",
    openGraph: {
      title: brandName,
      description:
        settings?.tagline ||
        "Professional programs, degrees, and enrollment guidance.",
    },
  };
}

export default async function Home() {
  const [bannersRes, programsRes, noticesRes, settingsRes] = await Promise.all([
    getBanners({ status: "active", limit: 10 }).catch(() => ({ data: [] })),
    getPrograms({ status: "active", limit: 6 }).catch(() => ({ data: [] })),
    getNotifications({ status: "published", limit: 5 }).catch(() => ({ data: [] })),
    getSettings().catch(() => null),
  ]);

  const settings = settingsRes?.data || {};
  const brandName = settings?.brandName || settings?.instituteName || SITE_NAME;
  const banners = bannersRes?.data || [];
  const programs = programsRes?.data || [];
  const notices = noticesRes?.data || [];

  return (
    <div className="bg-slate-50">
      <HeroCarousel items={banners} />

      <section className="relative border-b border-slate-200 bg-white">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <Container className="relative grid gap-6 py-14 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-7 shadow-soft">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[color:var(--accent)]/15 text-[color:var(--primary)] ring-1 ring-[color:var(--accent)]/25">
                ★
              </span>
              <div className="text-sm font-semibold text-slate-900">Career-focused</div>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Practical curriculum designed for real outcomes and industry skills.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-7 shadow-soft">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[color:var(--primary)]/10 text-[color:var(--primary)] ring-1 ring-[color:var(--primary)]/15">
                ✓
              </span>
              <div className="text-sm font-semibold text-slate-900">Guided enrollment</div>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              We help you choose the right program and complete the admission process.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-7 shadow-soft">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[color:var(--accent)]/15 text-[color:var(--primary)] ring-1 ring-[color:var(--accent)]/25">
                ⚡
              </span>
              <div className="text-sm font-semibold text-slate-900">Trusted institute</div>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Clear information, transparent fees, and student support.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-16">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Programs"
              title="Choose your program"
              description="Browse our active programs, eligibility, duration, and fees."
            />
            <Button as="link" href="/programs" variant="secondary">
              View all programs
            </Button>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p) => (
              <Link
                key={p._id}
                href={`/programs/${p._id}`}
                className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {p.code}
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
                    Active
                  </span>
                </div>
                <div className="mt-3 text-lg font-semibold text-slate-900 group-hover:text-slate-700">
                  {p.name}
                </div>
                {p.description ? (
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                    {p.description}
                  </p>
                ) : (
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Duration: {p.duration}
                  </p>
                )}
                <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-600">
                  <span className="rounded-full bg-slate-100 px-3 py-1 ring-1 ring-slate-200">
                    Duration: {p.duration}
                  </span>
                  {typeof p.fee === "number" ? (
                    <span className="rounded-full bg-slate-100 px-3 py-1 ring-1 ring-slate-200">
                      Fee: ₹{p.fee}
                    </span>
                  ) : null}
                </div>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--primary)]">
                  View details <span className="transition group-hover:translate-x-0.5">→</span>
                </div>
              </Link>
            ))}
            {!programs.length ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-sm text-slate-600">
                No programs found. Add programs from admin panel, then refresh.
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      <section className="bg-slate-50">
        <Container className="py-16">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Notices"
              title="Latest updates"
              description="Announcements and important information."
            />
            <Button as="link" href="/notices" variant="secondary">
              View all notices
            </Button>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {notices.map((n) => (
              <div
                key={n._id}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-soft"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="text-sm font-semibold text-slate-900">{n.title}</div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 ring-1 ring-slate-200">
                    {n.type || "general"}
                  </span>
                </div>
                <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">
                  {n.message}
                </p>
              </div>
            ))}
            {!notices.length ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-sm text-slate-600">
                No notices published yet.
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-16">
          <div className="relative overflow-hidden rounded-3xl bg-[color:var(--primary)] p-8 text-white shadow-soft sm:p-12">
            <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[color:var(--accent)]/22 blur-3xl" />
            <div className="absolute -bottom-48 -right-40 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl" />
            <div className="relative">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Ready to enroll?
                </h2>
                <p className="mt-3 text-base leading-7 text-white/75">
                  Share your details and we will guide you about the right program,
                  eligibility, and admission process.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button as="link" href="/contact" size="lg" variant="accent">
                  Enroll / Contact
                </Button>
                <Button as="link" href="/programs" variant="secondary" size="lg" className="bg-white/95">
                  Browse programs
                </Button>
              </div>
            </div>
            <p className="mt-8 text-xs text-white/60">
              {settings?.address ? `${brandName} • ${settings.address}` : brandName}
            </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

