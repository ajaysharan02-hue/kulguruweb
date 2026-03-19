"use client";

import { useMemo, useState } from "react";
import { submitInquiry } from "@/lib/api";
import { Button } from "@/components/ui/Button";

export function InquiryForm({ programs = [] }) {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [error, setError] = useState("");
  const [programQuery, setProgramQuery] = useState("");

  const programOptions = useMemo(() => {
    return (programs || [])
      .filter((p) => p && p._id && p.name)
      .map((p) => ({ id: p._id, label: p.name, code: p.code }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [programs]);

  const selectedProgramId = useMemo(() => {
    const q = String(programQuery || "").trim().toLowerCase();
    if (!q) return "";
    const exact = programOptions.find(
      (p) =>
        p.label.toLowerCase() === q ||
        (p.code && p.code.toLowerCase() === q)
    );
    return exact?.id || "";
  }, [programQuery, programOptions]);

  async function onSubmit(e) {
    e.preventDefault();
    setOk(false);
    setError("");
    setLoading(true);

    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const payload = Object.fromEntries(form.entries());
    // ensure backend receives program id (MongoId)
    if (selectedProgramId) payload.program = selectedProgramId;

    try {
      await submitInquiry(payload);
      setOk(true);
      formEl?.reset?.();
      setProgramQuery("");
    } catch (err) {
      setError(err?.message || "Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
          <label className="text-xs font-semibold text-slate-700">Full name</label>
          <input
            name="name"
            required
            className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none ring-(--accent)/20 focus:ring-2"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-700">Phone</label>
          <input
            name="mobile"
            required
            className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none ring-(--accent)/20 focus:ring-2"
            placeholder="Your phone number"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-semibold text-slate-700">Email</label>
          <input
            type="email"
            name="email"
            className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none ring-(--accent)/20 focus:ring-2"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-700">Program interest</label>
          <input type="hidden" name="program" value={selectedProgramId} />
          <input
            list="programs-list"
            value={programQuery}
            onChange={(e) => setProgramQuery(e.target.value)}
            className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none ring-(--accent)/20 focus:ring-2"
            placeholder="Start typing program name…"
          />
          <datalist id="programs-list">
            {programOptions.map((p) => (
              <option key={p.id} value={p.label}>
                {p.code ? `(${p.code})` : ""}
              </option>
            ))}
          </datalist>
          {!selectedProgramId && programQuery ? (
            <p className="mt-2 text-xs text-slate-500">
              Select a program from suggestions (exact name match).
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-700">Message</label>
        <textarea
          name="message"
          rows={5}
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-(--accent)/20 focus:ring-2"
          placeholder="Tell us your background and what you want to enroll in…"
        />
      </div>

     

      <Button type="submit" disabled={loading} className="w-full" size="lg">
        {loading ? "Submitting…" : "Submit inquiry"}
      </Button>
    </form>
  );
}

