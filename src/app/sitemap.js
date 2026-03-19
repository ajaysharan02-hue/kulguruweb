import { getPrograms } from "@/lib/api";
import { SITE_URL } from "@/lib/config";

export default async function sitemap() {
  const staticRoutes = ["", "/programs", "/notices", "/about", "/contact", "/privacy", "/terms"];

  const programsRes = await getPrograms({ status: "active", limit: 500 }).catch(() => ({
    data: [],
  }));
  const programs = programsRes?.data || [];

  const now = new Date();

  const urls = [
    ...staticRoutes.map((p) => ({
      url: `${SITE_URL}${p}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: p === "" ? 1 : 0.7,
    })),
    ...programs.map((p) => ({
      url: `${SITE_URL}/programs/${p._id}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
      changeFrequency: "weekly",
      priority: 0.6,
    })),
  ];

  return urls;
}

