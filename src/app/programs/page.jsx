import Link from "next/link";
import { getPrograms, getSettings } from "@/lib/api";
import { SITE_NAME } from "@/lib/config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function generateMetadata() {
  const settingsRes = await getSettings().catch(() => null);
  const brandName =
    settingsRes?.data?.brandName || settingsRes?.data?.instituteName || SITE_NAME;
  return {
    title: "Programs",
    description: `Explore ${brandName} programs, duration, eligibility, and fees.`,
  };
}

export default async function ProgramsPage({ searchParams }) {
  const q = (await searchParams)?.q || "";
  const programsRes = await getPrograms({
    status: "active",
    limit: 100,
    search: q || undefined,
  }).catch(() => ({ data: [] }));

  const programs = programsRes?.data || [];

  return (
    <div className="bg-slate-50">
      <Container className="py-12">
        <SectionHeading
          eyebrow="Programs"
          title="All programs"
          description="Search and explore programs offered by the institute."
        />

        <form className="mt-8" action="/programs" method="get">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              name="q"
              defaultValue={q}
              placeholder="Search program name, code, description…"
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none ring-[color:var(--accent)]/20 focus:ring-2"
            />
            <button className="h-11 rounded-2xl bg-[color:var(--primary)] px-6 text-sm font-semibold text-white shadow-sm hover:shadow-md hover:brightness-110 active:brightness-95">
              Search
            </button>
          </div>
        </form>

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
                <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-600">
                  {p.description}
                </p>
              ) : null}
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
        </div>

        {!programs.length ? (
          <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-sm text-slate-600">
            No programs found.
          </div>
        ) : null}
      </Container>
    </div>
  );
}

