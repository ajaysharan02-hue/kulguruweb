"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function ProgramsSearchBar({ initialQuery = "" }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(initialQuery);

  useEffect(() => {
    setValue(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const id = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      const q = value.trim();
      if (q) params.set("q", q);
      else params.delete("q");
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    }, 350);

    return () => clearTimeout(id);
  }, [value, router, pathname, searchParams]);

  const clearSearch = () => {
    setValue("");
    router.replace(pathname, { scroll: false });
  };

  return (
    <div className="mt-2 md:mt-6 rounded-3xl border border-[#bdd6cb] bg-linear-to-r from-white to-[#f2faf6] p-4 shadow-soft sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#2a5f4d]">Search Programs</p>
        <span className="rounded-full bg-(--primary)/10 px-2.5 py-1 text-[10px] font-semibold text-(--primary)">
          Live
        </span>
      </div>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <div className="relative w-full">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#4d7b69]">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </span>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search by name, code, or description..."
            className="h-11 w-full rounded-2xl border border-[#bdd6cb] bg-white pl-10 pr-4 text-sm text-[#1d4a3a] outline-none ring-(--accent)/30 transition focus:border-(--accent) focus:ring-2"
          />
        </div>
        {value ? (
          <button
            type="button"
            onClick={clearSearch}
            className="h-11 rounded-2xl border border-[#bdd6cb] bg-white px-5 text-sm font-semibold text-[#1c4a3b] transition hover:bg-[#e8f6ef]"
          >
            Reset
          </button>
        ) : null}
      </div>
      <p className="mt-2 text-xs text-[#55776a]">Results update as you type. Use reset to clear quickly.</p>
    </div>
  );
}

