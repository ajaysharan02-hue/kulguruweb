import { notFound } from "next/navigation";
import { getCourses, getProgramById, getSettings } from "@/lib/api";
import { SITE_NAME, SITE_URL, resolvePublicUrl } from "@/lib/config";
import { extractSocialLinks } from "@/lib/socials";
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
  const [settingsRes, programRes] = await Promise.all([
    getSettings().catch(() => null),
    getProgramById(id).catch(() => null),
  ]);

  const settings = settingsRes?.data || {};
  const brandName = settings?.brandName || settings?.instituteName || SITE_NAME;
  const organizationLogo = resolvePublicUrl(settings?.logo || settings?.logoUrl);
  const socialLinks = extractSocialLinks(settings).map((s) => s.url).filter(Boolean);
  const program = programRes?.data;
  if (!program) return notFound();
  const coursesRes = await getCourses({
    status: "active",
    program: id,
    limit: 200,
  }).catch(() => ({ data: [] }));
  const courses = coursesRes?.data || [];

  const programImage = resolvePublicUrl(program.image || program.imageUrl);
  const programUrl = `${SITE_URL}/programs/${id}`;

  const programJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",

    name: program.name,

    description:
      program.description ||
      `Program details at ${brandName}: duration, eligibility, and fees.`,

    url: programUrl, // ✅ ADD THIS (important)

    provider: {
      "@type": "Organization",
      name: brandName,
      url: SITE_URL,
      ...(organizationLogo ? { logo: organizationLogo } : {}),
      ...(socialLinks?.length ? { sameAs: socialLinks } : {}), // ✅ socials
    },

    ...(program.code ? { programCode: program.code } : {}),

    // ✅ Duration (ISO format fix)
    ...(program.duration
      ? {
        timeRequired:
          typeof program.duration === "string" &&
            program.duration.includes("Year")
            ? `P${parseInt(program.duration)}Y`
            : program.duration,
      }
      : {}),

    ...(program.eligibility
      ? { applicantRequirements: program.eligibility }
      : {}),

    ...(programImage ? { image: programImage } : {}),

    // ✅ Extra SEO fields
    educationalProgramMode: "full-time",
    occupationalCategory: "Management",

    // ✅ Offers improved
    ...(typeof program.fee === "number"
      ? {
        offers: {
          "@type": "Offer",
          price: program.fee.toString(), // better as string
          priceCurrency: "INR",
          category: "Tuition Fee",
          availability: "https://schema.org/InStock",
          url: programUrl,
        },
      }
      : {}),
  };

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
              <img loading="lazy" alt={program.name}
                src={program.image || program.imageUrl}
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

          <div className="mt-10 rounded-3xl border border-[#c3dad0] bg-[#f5fbf8] p-6">
            <h2 className="text-xl font-semibold text-slate-900">Available Courses</h2>
            <p className="mt-2 text-sm text-slate-600">
              Choose your preferred course under {program.name}.
            </p>
            {courses.length ? (
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {courses.map((course) => (
                  <div key={course._id} className="rounded-2xl border border-[#c3dad0] bg-white p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-base font-semibold text-[#1d4638]">{course.name}</h3>
                        {course.code ? (
                          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[#357060]">{course.code}</p>
                        ) : null}
                      </div>
                      {typeof course.fee === "number" ? (
                        <span className="rounded-full bg-[#edf7f2] px-3 py-1 text-xs font-semibold text-[#1d4638]">
                          ₹{course.fee.toLocaleString()}
                        </span>
                      ) : null}
                    </div>
                    {course.description ? (
                      <p className="mt-3 text-sm leading-6 text-slate-600">{course.description}</p>
                    ) : null}
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-700">
                      {course.duration ? (
                        <span className="rounded-full bg-slate-100 px-3 py-1">Duration: {course.duration}</span>
                      ) : null}
                      {course.eligibility ? (
                        <span className="rounded-full bg-slate-100 px-3 py-1">Eligibility: {course.eligibility}</span>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-2xl border border-dashed border-[#c3dad0] bg-white p-5 text-sm text-slate-600">
                Courses will be updated soon for this program.
              </div>
            )}
          </div>
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(programJsonLd) }}
      />
    </div>
  );
}

