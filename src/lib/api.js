import { API_BASE_URL } from "./config";

async function apiFetch(path, { method = "GET", body, next, cache } = {}) {
  const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;
  const res = await fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    next,
    cache,
  });

  let json = null;
  try {
    json = await res.json();
  } catch {
    // ignore
  }

  if (!res.ok) {
    const message = json?.message || `Request failed (${res.status})`;
    const err = new Error(message);
    err.status = res.status;
    err.data = json;
    throw err;
  }

  return json;
}

export async function getSettings() {
  return apiFetch("/api/settings", { next: { revalidate: 300 } });
}

export async function getBanners({ status = "active", limit = 10 } = {}) {
  const qs = new URLSearchParams();
  if (status) qs.set("status", status);
  if (limit) qs.set("limit", String(limit));
  return apiFetch(`/api/banners?${qs.toString()}`, { next: { revalidate: 60 } });
}

export async function getServicePartners({ status = "active", limit = 48 } = {}) {
  const qs = new URLSearchParams();
  if (status) qs.set("status", status);
  if (limit) qs.set("limit", String(limit));
  return apiFetch(`/api/servicepatners?${qs.toString()}`, { next: { revalidate: 120 } });
}

export async function getPrograms({ status = "active", limit = 50, search } = {}) {
  const qs = new URLSearchParams();
  if (status) qs.set("status", status);
  if (limit) qs.set("limit", String(limit));
  if (search) qs.set("search", search);
  return apiFetch(`/api/programs?${qs.toString()}`, { next: { revalidate: 60 } });
}

export async function getProgramById(id) {
  return apiFetch(`/api/programs/${id}`, { next: { revalidate: 60 } });
}

export async function getNotifications({ status = "published", limit = 20, type } = {}) {
  const qs = new URLSearchParams();
  if (status) qs.set("status", status);
  if (limit) qs.set("limit", String(limit));
  if (type) qs.set("type", type);
  return apiFetch(`/api/notifications?${qs.toString()}`, { next: { revalidate: 60 } });
}

export async function submitInquiry(payload) {
  return apiFetch("/api/inquiries", { method: "POST", body: payload, cache: "no-store" });
}

