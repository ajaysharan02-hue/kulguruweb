import { getCourses, getPrograms, getSettings } from "@/lib/api";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InquiryForm } from "@/components/contact/InquiryForm";

export const metadata = {
  title: "Enroll / Contact",
  description: "Send your details to enroll or contact the institute.",
};

export default async function ContactPage() {
  const [settingsRes, programsRes, coursesRes] = await Promise.all([
    getSettings().catch(() => null),
    getPrograms({ status: "active", limit: 500 }).catch(() => ({ data: [] })),
    getCourses({ status: "active", limit: 1000 }).catch(() => ({ data: [] })),
  ]);
  const settings = settingsRes?.data || {};
  const programs = programsRes?.data || [];
  const courses = coursesRes?.data || [];

  return (
    <div className="academy-bg">
      <Container className="py-8 sm:py-10 lg:py-12">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-5 lg:items-start lg:gap-8">
          <div className="lg:col-span-3">
            <SectionHeading
              eyebrow="Admissions Desk"
              title="Start your academic journey"
              description="Share your details and our admissions team will guide you on programs, eligibility, fees, and next admission steps."
            />

            <div className="edu-card relative mt-6 overflow-hidden rounded-4xl p-4 sm:p-6 lg:mt-8">
              <div className="pointer-events-none absolute -left-32 -top-32 h-[320px] w-[320px] rounded-full bg-(--accent)/12 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-40 -right-32 h-[320px] w-[320px] rounded-full bg-(--primary)/8 blur-3xl" />
              <div className="relative">
                <InquiryForm programs={programs} courses={courses} />
              </div>
            </div>
          </div>

          <div className="space-y-5 sm:space-y-6 lg:col-span-2">
            <div className="edu-card rounded-4xl p-5 sm:p-7 lg:p-8">
              <div className="text-sm font-semibold text-slate-900">Why students choose us</div>
              <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600 sm:mt-5">
                <p className="rounded-2xl border border-[#c3dad0] bg-white/85 px-4 py-3">
                  Structured support from counseling to final admission.
                </p>
                <p className="rounded-2xl border border-[#c3dad0] bg-white/85 px-4 py-3">
                  Transparent fee guidance and clear eligibility information.
                </p>
                <p className="rounded-2xl border border-[#c3dad0] bg-white/85 px-4 py-3">
                  Dedicated response team for quick student queries.
                </p>
              </div>
            </div>

            <div className="edu-card rounded-4xl p-5 sm:p-7 lg:p-8">
              <div className="text-sm font-semibold text-slate-900">Contact details</div>
              <div className="mt-4 space-y-4 text-sm text-slate-600 sm:mt-5">
                {settings?.address ? (
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Address
                    </div>
                    <div className="mt-1">{settings.address}</div>
                  </div>
                ) : null}
                {settings?.phone || settings?.contactPhone ? (
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Phone
                    </div>
                    <div className="mt-1">{settings.phone || settings.contactPhone}</div>
                  </div>
                ) : null}
                {settings?.email || settings?.contactEmail ? (
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Email
                    </div>
                    <div className="mt-1">{settings.email || settings.contactEmail}</div>
                  </div>
                ) : null}
              </div>

              <div className="edu-divider mt-6 sm:mt-8" />
              <div className="mt-6 rounded-3xl bg-white/75 p-5 ring-1 ring-slate-200 sm:mt-8 sm:p-7">
                <div className="text-sm font-semibold text-slate-900">Office hours</div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Monday–Saturday: 10:00 AM – 6:00 PM
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  For urgent queries, please call.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

