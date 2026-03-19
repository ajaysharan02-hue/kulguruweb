import { getNotifications } from "@/lib/api";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = {
  title: "Notices",
  description: "Latest announcements and updates.",
};

export default async function NoticesPage() {
  const res = await getNotifications({ status: "published", limit: 50 }).catch(() => ({
    data: [],
  }));
  const notices = res?.data || [];

  return (
    <div className="bg-slate-50">
      <Container className="py-12">
        <SectionHeading
          eyebrow="Notices"
          title="Announcements & updates"
          description="Latest published notices."
        />

        <div className="mt-10 grid gap-6">
          {notices.map((n) => (
            <div
              key={n._id}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-soft"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-base font-semibold text-slate-900">{n.title}</div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 ring-1 ring-slate-200">
                    {n.type || "general"}
                  </span>
                  {n.publishDate ? (
                    <span className="text-xs text-slate-500">
                      {new Date(n.publishDate).toLocaleDateString()}
                    </span>
                  ) : null}
                </div>
              </div>
              <p className="mt-4 whitespace-pre-line text-sm leading-6 text-slate-600">
                {n.message}
              </p>
            </div>
          ))}
        </div>

        {!notices.length ? (
          <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-sm text-slate-600">
            No notices published yet.
          </div>
        ) : null}
      </Container>
    </div>
  );
}

