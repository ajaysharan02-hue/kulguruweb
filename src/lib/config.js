export const SITE_NAME = 'Kulgurusp Institute';

// export const SITE_URL =
//   process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'http://localhost:3000';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') || 'http://localhost:5000';

/** Turn API-relative paths (e.g. /uploads/...) into absolute URLs for <img> / metadata. */
export function resolvePublicUrl(path) {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    const base = API_BASE_URL.replace(/\/$/, '');
    return path.startsWith('/') ? `${base}${path}` : `${base}/${path}`;
}

// export const API_BASE_URL =
// process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
// "https://kulguruserver-production.up.railway.app";
