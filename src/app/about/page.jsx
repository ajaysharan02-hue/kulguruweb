import { getSettings } from "@/lib/api";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = {
  title: "About",
  description: "Learn about the institute, mission, and student support.",
};

export default async function AboutPage() {
  const settingsRes = await getSettings().catch(() => null);
  const settings = settingsRes?.data || {};

  return (
    <div className="academy-bg">
      <Container className="py-12">
        <SectionHeading
          eyebrow="About"
          title={settings?.aboutTitle || "About our institute"}
          description={
            settings?.aboutDescription ||
            "We provide professional programs and degrees with enrollment guidance, clear information, and student-first support."
          }
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="relative overflow-hidden rounded-4xl border border-[#c3dad0] bg-white p-8 shadow-soft lg:col-span-2">
            <div className="pointer-events-none absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-(--accent)/12 blur-3xl" />
            <div className="relative">
            <h2 className="text-lg font-semibold text-slate-900">Our mission</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {settings?.mission ||
                "To make education accessible and career-focused by offering structured programs with guidance from admission to completion."}
            </p>
            <h2 className="mt-8 text-lg font-semibold text-slate-900">Why students choose us</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-(--accent)" />
                Clear program details: duration, eligibility, and fees
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-(--primary)" />
                Enrollment help: documentation, timelines, and support
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-(--accent)" />
                Student support for learning and progression
              </li>
            </ul>
            </div>
          </div>

          <div className="rounded-4xl border border-[#c3dad0] bg-white p-8 shadow-soft">
            <h3 className="text-sm font-semibold text-slate-900">Highlights</h3>
            <div className="mt-5 space-y-4 text-sm text-slate-600">
              <div className="rounded-3xl bg-white/70 p-6 ring-1 ring-slate-200">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Programs
                </div>
                <div className="mt-1">
                  {settings?.programCountText || "Multiple career-focused options"}
                </div>
              </div>
              <div className="rounded-3xl bg-white/70 p-6 ring-1 ring-slate-200">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Guidance
                </div>
                <div className="mt-1">Admission to completion support</div>
              </div>
              <div className="rounded-3xl bg-white/70 p-6 ring-1 ring-slate-200">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Transparency
                </div>
                <div className="mt-1">Clear information and communication</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

