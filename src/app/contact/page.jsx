import { getPrograms, getSettings } from "@/lib/api";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InquiryForm } from "@/components/contact/InquiryForm";

export const metadata = {
  title: "Enroll / Contact",
  description: "Send your details to enroll or contact the institute.",
};

export default async function ContactPage() {
  const [settingsRes, programsRes] = await Promise.all([
    getSettings().catch(() => null),
    getPrograms({ status: "active", limit: 500 }).catch(() => ({ data: [] })),
  ]);
  const settings = settingsRes?.data || {};
  const programs = programsRes?.data || [];

  return (
    <div className="bg-slate-50">
      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Enroll / Contact"
              title="Talk to admissions"
              description="Send your details and we’ll guide you about program, eligibility, fee, and admission process."
            />

            <div className="relative mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
              <div className="pointer-events-none absolute -left-32 -top-32 h-[320px] w-[320px] rounded-full bg-(--accent)/12 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-40 -right-32 h-[320px] w-[320px] rounded-full bg-(--primary)/8 blur-3xl" />
              <div className="relative">
              <InquiryForm programs={programs} />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
            <div className="text-sm font-semibold text-slate-900">Contact details</div>
            <div className="mt-5 space-y-4 text-sm text-slate-600">
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

            <div className="mt-8 rounded-3xl bg-slate-50 p-7 ring-1 ring-slate-200">
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
      </Container>
    </div>
  );
}

