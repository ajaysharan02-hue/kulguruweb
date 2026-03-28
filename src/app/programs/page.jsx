import Link from "next/link";
import { getPrograms, getSettings } from "@/lib/api";
import { SITE_NAME } from "@/lib/config";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProgramCard } from "@/components/programs/ProgramCard";
import { ProgramsSearchBar } from "@/components/programs/ProgramsSearchBar";

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
    <div className="academy-bg">
      <Container className="pt-5 pb-12">
     
        <ProgramsSearchBar initialQuery={q} />
        <div className="mt-4 md:mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => (
            <ProgramCard key={p._id} program={p} />
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

