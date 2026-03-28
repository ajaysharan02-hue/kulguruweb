import { notFound } from "next/navigation";
import { getProgramById, getSettings } from "@/lib/api";
import { SITE_NAME } from "@/lib/config";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const [settingsRes, programRes] = await Promise.all([
    getSettings().catch(() => null),
    getProgramById(id).catch(() => null),
  ]);

  const brandName =
    settingsRes?.data?.brandName || settingsRes?.data?.instituteName || SITE_NAME;
  const program = programRes?.data;
  if (!program) return { title: "Program" };

  return {
    title: program.name,
    description:
      program.description ||
      `Program details at ${brandName}: duration, eligibility, and fees.`,
  };
}

export default async function ProgramDetailPage({ params }) {
  const { id } = await params;
  const programRes = await getProgramById(id).catch(() => null);
  const program = programRes?.data;
  if (!program) return notFound();

  return (
    <div className="academy-bg">
      <Container className="py-12">
        <div className="relative overflow-hidden rounded-4xl border border-[#c3dad0] bg-white p-8 shadow-soft">
          <div className="pointer-events-none absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-(--accent)/12 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-48 -right-40 h-[420px] w-[420px] rounded-full bg-(--primary)/8 blur-3xl" />
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-(--primary)/10 px-3 py-1 text-xs font-semibold text-(--primary) ring-1 ring-(--primary)/20">
                <span className="h-1.5 w-1.5 rounded-full bg-(--accent)" />
                <span className="uppercase tracking-wider">{program.code}</span>
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                {program.name}
              </h1>
              {program.description ? (
                <p className="mt-4 text-base leading-7 text-slate-600">
                  {program.description}
                </p>
              ) : null}
            </div>
            <div className="flex gap-3">
              <Button as="link" href="/contact">
                Enroll / Contact
              </Button>
              <Button as="link" href="/programs" variant="secondary">
                Back to programs
              </Button>
            </div>
          </div>

          {(program.image || program.imageUrl) ? (
            <div className="mt-8 overflow-hidden rounded-3xl border border-[#c3dad0] bg-[#edf7f2]">
              <img
                src={program.image || program.imageUrl}
                alt={program.name}
                className="h-64 w-full object-cover sm:h-80"
              />
            </div>
          ) : null}

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-3xl border border-[#c3dad0] bg-linear-to-b from-white to-[#f2faf6] p-7 shadow-soft">
              <div className="text-sm font-semibold text-slate-900">Duration</div>
              <div className="mt-3 text-sm text-slate-600">{program.duration}</div>
            </div>
            <div className="rounded-3xl border border-[#c3dad0] bg-linear-to-b from-white to-[#f2faf6] p-7 shadow-soft">
              <div className="text-sm font-semibold text-slate-900">Eligibility</div>
              <div className="mt-3 text-sm text-slate-600">
                {program.eligibility || "Contact us for eligibility criteria."}
              </div>
            </div>
            <div className="rounded-3xl border border-[#c3dad0] bg-linear-to-b from-white to-[#f2faf6] p-7 shadow-soft">
              <div className="text-sm font-semibold text-slate-900">Fee</div>
              <div className="mt-3 text-sm text-slate-600">
                {typeof program.fee === "number" ? `₹${program.fee}` : "Contact us"}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

