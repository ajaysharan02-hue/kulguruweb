const SOCIALS = [
  { key: "facebook", label: "Facebook" },
  { key: "instagram", label: "Instagram" },
  { key: "youtube", label: "YouTube" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "twitter", label: "X (Twitter)" },
  { key: "x", label: "X (Twitter)" },
  { key: "whatsapp", label: "WhatsApp" },
];

function normalizeUrl(v) {
  if (!v) return null;
  const s = String(v).trim();
  if (!s) return null;
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  // allow whatsapp numbers like 91xxxxxxxxxx
  if (/^\+?\d{8,15}$/.test(s)) return `https://wa.me/${s.replace(/^\+/, "")}`;
  return `https://${s}`;
}

export function extractSocialLinks(settings = {}) {
  const seen = new Set();
  const result = [];

  for (const item of SOCIALS) {
    const raw = settings[item.key] ?? settings[`${item.key}Url`] ?? settings[`${item.key}_url`];
    const url = normalizeUrl(raw);
    if (!url) continue;
    if (seen.has(url)) continue;
    seen.add(url);
    result.push({ id: item.key, label: item.label, url });
  }

  return result;
}

