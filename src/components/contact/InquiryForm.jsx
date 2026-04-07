"use client";

import { useMemo, useState } from "react";
import { submitInquiry } from "@/lib/api";
import { Button } from "@/components/ui/Button";

export function InquiryForm({ programs = [], courses = [] }) {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [error, setError] = useState("");
  const [selectedProgramId, setSelectedProgramId] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");

  const programOptions = useMemo(() => {
    return (programs || [])
      .filter((p) => p && p._id && p.name)
      .map((p) => ({ id: p._id, label: p.name, code: p.code }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [programs]);

  const courseOptions = useMemo(() => {
    return (courses || [])
      .filter((c) => c && c._id && c.name)
      .map((c) => ({
        id: c._id,
        label: c.name,
        code: c.code,
        programId: c.program?._id || c.program,
      }))
      .filter((c) => selectedProgramId && c.programId === selectedProgramId)
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [courses, selectedProgramId]);

  async function onSubmit(e) {
    e.preventDefault();
    setOk(false);
    setError("");
    setLoading(true);

    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const payload = Object.fromEntries(form.entries());
    if (selectedProgramId) payload.program = selectedProgramId;
    if (selectedCourseId) payload.course = selectedCourseId;

    try {
      await submitInquiry(payload);
      setOk(true);
      formEl?.reset?.();
      setSelectedProgramId("");
      setSelectedCourseId("");
    } catch (err) {
      setError(err?.message || "Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
       {ok ? (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          Your inquiry has been submitted successfully. We will contact you soon.
        </div>
      ) : null}
      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-700">Full name</label>
          <input
            name="name"
            required
            className="mt-2 h-11 w-full rounded-2xl border border-[#c3dad0] bg-white px-4 text-sm outline-none ring-(--accent)/20 focus:ring-2"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-700">Phone</label>
          <input
            name="mobile"
            required
            className="mt-2 h-11 w-full rounded-2xl border border-[#c3dad0] bg-white px-4 text-sm outline-none ring-(--accent)/20 focus:ring-2"
            placeholder="Your phone number"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-700">Email</label>
          <input
            type="email"
            name="email"
            className="mt-2 h-11 w-full rounded-2xl border border-[#c3dad0] bg-white px-4 text-sm outline-none ring-(--accent)/20 focus:ring-2"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-700">Program interest</label>
          <select
            name="program"
            value={selectedProgramId}
            onChange={(e) => {
              setSelectedProgramId(e.target.value);
              setSelectedCourseId("");
            }}
            required
            className="mt-2 h-11 w-full rounded-2xl border border-[#c3dad0] bg-white px-4 text-sm outline-none ring-(--accent)/20 focus:ring-2"
          >
            <option value="">Select program</option>
            {programOptions.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}{p.code ? ` (${p.code})` : ""}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-700">Course interest</label>
          <select
            name="course"
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            disabled={!selectedProgramId || !courseOptions.length}
            className="mt-2 h-11 w-full rounded-2xl border border-[#c3dad0] bg-white px-4 text-sm outline-none ring-(--accent)/20 focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-100"
          >
            <option value="">{selectedProgramId ? "Select course (optional)" : "Select program first"}</option>
            {courseOptions.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}{c.code ? ` (${c.code})` : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-700">Message</label>
        <textarea
          name="message"
          rows={4}
          className="mt-2 w-full rounded-2xl border border-[#c3dad0] bg-white px-4 py-3 text-sm outline-none ring-(--accent)/20 focus:ring-2 sm:rows-5"
          placeholder="Tell us your background and what you want to enroll in…"
        />
      </div>

     

      <Button type="submit" disabled={loading} className="w-full" size="lg">
        {loading ? "Submitting…" : "Submit inquiry"}
      </Button>
    </form>
  );
}

