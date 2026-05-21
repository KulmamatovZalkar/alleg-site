/**
 * Клиент к Django REST API.
 */
import type { ApiImage, HomePageData } from "@/types/api";

export type * from "@/types/api";

function getServerBaseUrl(): string {
  return (
    process.env.API_URL ||
    process.env.INTERNAL_API_URL ||
    "http://backend:8000"
  );
}

export function getPublicBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL || "";
}

export function getMediaUrl(path: ApiImage): string | null {
  if (!path) return null;
  // API возвращает относительные пути "/media/..." — отдаём как есть.
  // Браузер сам подставит текущий хост (same-origin).
  if (path.startsWith("/")) return path;
  return path;
}

export async function fetchHomePage(): Promise<HomePageData | null> {
  const base = getServerBaseUrl();
  try {
    const res = await fetch(`${base}/api/home/`, { cache: "no-store" });
    if (!res.ok) {
      console.error("fetchHomePage failed:", res.status);
      return null;
    }
    return (await res.json()) as HomePageData;
  } catch (err) {
    console.error("fetchHomePage error:", err);
    return null;
  }
}

export async function submitLead(payload: {
  name: string;
  phone: string;
  email?: string;
  telegram?: string;
  message?: string;
  source?: string;
  selected_tariff?: string;
  honeypot?: string;
}): Promise<{ ok: boolean; error?: string }> {
  const base = getPublicBaseUrl();
  try {
    const res = await fetch(`${base}/api/leads/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return { ok: false, error: JSON.stringify(data) };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}
