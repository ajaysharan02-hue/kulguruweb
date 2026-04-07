import Link from "next/link";
import { getBanners, getNotifications, getPrograms, getServicePartners, getSettings } from "@/lib/api";
import { resolvePublicUrl, SITE_NAME, SITE_URL } from "@/lib/config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { ServicePartnersSection } from "@/components/home/ServicePartnersSection";
import { ProgramCard } from "@/components/programs/ProgramCard";

function GraduationCapIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M2 9 12 4l10 5-10 5L2 9Z" />
      <path d="M6 11.5V16c0 .8 2.7 2 6 2s6-1.2 6-2v-4.5" />
    </svg>
  );
}

function MegaphoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M3 11v2a1 1 0 0 0 1 1h2l3 5h2l-1.5-5H12l7-4V6l-7 4H4a1 1 0 0 0-1 1Z" />
      <path d="M19 8v8" />
    </svg>
  );
}

function SchoolIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M3 10 12 5l9 5-9 5-9-5Z" />
      <path d="M5 12.5V19h14v-6.5" />
      <path d="M9 19v-4h6v4" />
    </svg>
  );
}

function WhyIcon({ type }) {
  if (type === "updates") return <MegaphoneIcon />;
  if (type === "institute") return <SchoolIcon />;
  return <GraduationCapIcon />;
}

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
  const [bannersRes, programsRes, partnersRes, noticesRes, settingsRes] = await Promise.all([
    getBanners({ status: "active", limit: 10 }).catch(() => ({ data: [] })),
    getPrograms({ status: "active", limit: 6 }).catch(() => ({ data: [] })),
    getServicePartners({ status: "active", limit: 24 }).catch(() => ({ data: [] })),
    getNotifications({ status: "published", limit: 5 }).catch(() => ({ data: [] })),
    getSettings().catch(() => null),
  ]);

  const settings = settingsRes?.data || {};
  const brandName = settings?.brandName || settings?.instituteName || SITE_NAME;
  const banners = bannersRes?.data || [];
  const programs = programsRes?.data || [];
  const partners = partnersRes?.data || [];
  const notices = noticesRes?.data || [];
  const totalPrograms = programs.length;
  const totalNotices = notices.length;
  const averageFee = programs.length
    ? Math.round(
      programs.reduce((sum, p) => sum + (typeof p.fee === "number" ? p.fee : 0), 0) /
      programs.length
    )
    : 0;
  const whyChoose = [
    {
      title: `${totalPrograms || 0}+ Active Programs`,
      desc: "Career-focused options with clear eligibility and duration details.",
      type: "programs",
    },
    {
      title: `${totalNotices || 0} Latest Updates`,
      desc: "Regular notices and admission information published for students.",
      type: "updates",
    },
    {
      title: averageFee ? `Avg. Fee ₹${averageFee.toLocaleString()}` : brandName,
      desc: settings?.tagline || "Trusted institute with student-first support and guidance.",
      type: "institute",
    },
  ];

  const partnersLdList = (partners || [])
    .filter((p) => p && (p.image || p.imageUrl || p.name))
    .slice(0, 12)
    .map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Organization",
        name: p.name || `Service Partner ${idx + 1}`,
        ...(resolvePublicUrl(p.image || p.imageUrl) ? { image: resolvePublicUrl(p.image || p.imageUrl) } : {}),
      },
    }));

  const servicePartnersItemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Service Partner Institutes",
    itemListOrder: "Unordered",
    numberOfItems: partnersLdList.length,
    itemListElement: partnersLdList,
  };

  const homeWebPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Home",
    url: SITE_URL,
    description:
      settings?.tagline ||
      "Professional programs, degrees, and enrollment guidance.",
    isPartOf: {
      "@type": "WebSite",
      url: SITE_URL,
    },
    mainEntity: servicePartnersItemListLd,
  };

  return (
    <div className="academy-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeWebPageLd) }}
      />
      <HeroCarousel items={banners} />

      <section className="bg-white">
        <Container className="py-10">
          <h2 className="text-center text-3xl font-bold text-[#173d30]">Our Programs</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p) => (
              <ProgramCard key={p._id} program={p} />
            ))}
          </div>
        </Container>
      </section>

      <ServicePartnersSection partners={partners} />

      <section className="bg-white">
        <Container className="pb-12 pt-4">
          <h2 className="text-center text-3xl font-bold text-[#173d30]">Why Choose Us?</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {whyChoose.map((item) => (
              <div
                key={item.title}
                className="anim-fade-up rounded-2xl border border-[#c2d9cf] bg-white p-6 text-center shadow-soft transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#0f6b4c] text-xl text-white">
                  <WhyIcon type={item.type} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[#1d4638]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#57776b]">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="academy-bg">
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
              <div key={n._id} className="edu-card rounded-3xl p-7">
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
          <div className="relative overflow-hidden rounded-4xl bg-linear-to-r from-(--primary) via-(--accent) to-[#2f956d] p-8 text-white shadow-soft sm:p-12">
            <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-(--accent)/22 blur-3xl" />
            <div className="absolute -bottom-48 -right-40 h-[520px] w-[520px] rounded-full bg-(--gold)/24 blur-3xl" />
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

