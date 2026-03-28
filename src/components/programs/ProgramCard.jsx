import Link from "next/link";
import Image from "next/image";

function GraduationCapIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M2 9 12 4l10 5-10 5L2 9Z" />
      <path d="M6 11.5V16c0 .8 2.7 2 6 2s6-1.2 6-2v-4.5" />
    </svg>
  );
}

export function ProgramCard({ program, compact = false }) {
  if (!program?._id) return null;

  return (
    <Link
      href={`/programs/${program._id}`}
      className={`group overflow-hidden rounded-2xl border border-[#c2d9cf] bg-linear-to-b from-[#eff8f3] to-[#e3f1ea] transition hover:-translate-y-1 hover:shadow-lg ${
        compact ? "p-4" : "p-5"
      }`}
    >
      {(program.image || program.imageUrl) ? (
        <div className={`relative w-full overflow-hidden rounded-xl border border-[#c2d9cf] bg-[#dfeee7] ${compact ? "mb-4 h-36" : "mb-5 h-44"}`}>
          <Image
            src={program.image || program.imageUrl}
            alt={program.name || "Program image"}
            fill
            unoptimized
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ) : null}

      <div className="flex items-center justify-between">
        <span className="inline-flex items-center justify-center rounded-xl bg-[#0f6b4c] p-2 text-white">
          <GraduationCapIcon />
        </span>
        <span className="text-xs font-semibold text-[#205744]">{program.duration || "2-4 Years"}</span>
      </div>

      <div className={`text-center font-extrabold text-[#126f4f] ${compact ? "mt-4 text-3xl" : "mt-4 text-2xl"}`}>
        {program.code || program.name?.slice(0, 3).toUpperCase()}
      </div>
      <div className="mt-1 text-center text-xs font-medium text-[#325b4d]">{program.name}</div>

      {!compact && program.description ? (
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#4f7265]">{program.description}</p>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-[#325b4d]">
        <span className="rounded-full bg-white/80 px-3 py-1 ring-1 ring-[#c3dad0]">
          Duration: {program.duration || "N/A"}
        </span>
        {typeof program.fee === "number" ? (
          <span className="rounded-full bg-white/80 px-3 py-1 ring-1 ring-[#c3dad0]">
            Fee: ₹{program.fee.toLocaleString()}
          </span>
        ) : null}
      </div>

      <div className="mt-4 rounded-lg bg-[#0f6b4c] px-3 py-2 text-center text-xs font-semibold text-white">
        Explore Program
      </div>
    </Link>
  );
}

