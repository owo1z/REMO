import { sql } from "./db";
import {
  DEFAULT_SETTINGS,
  FALLBACK_MEMBERS,
  FALLBACK_PROJECTS,
} from "./content";
import type { Member, Project, SiteSettings } from "./types";

/**
 * DB가 아직 없거나 쿼리가 실패해도 사이트가 내려가지 않도록
 * 모든 조회는 기본값으로 떨어집니다. (오픈 전 단계에서 특히 중요)
 */

export async function getMembers(): Promise<Member[]> {
  if (!sql) return FALLBACK_MEMBERS;
  try {
    const rows = await sql`
      SELECT id, name, role_group, title, bio, email, photo_url, sort_order
      FROM members
      ORDER BY sort_order, id
    `;
    return rows.length ? (rows as Member[]) : FALLBACK_MEMBERS;
  } catch (error) {
    console.error("[queries] getMembers 실패 — 기본값으로 대체합니다.", error);
    return FALLBACK_MEMBERS;
  }
}

export async function getProjects(): Promise<Project[]> {
  if (!sql) return FALLBACK_PROJECTS;
  try {
    const rows = await sql`
      SELECT id, name, industry, product, site_url, card_image, is_active, sort_order
      FROM projects
      WHERE is_active
      ORDER BY sort_order, id
    `;
    return rows.length ? (rows as Project[]) : FALLBACK_PROJECTS;
  } catch (error) {
    console.error("[queries] getProjects 실패 — 기본값으로 대체합니다.", error);
    return FALLBACK_PROJECTS;
  }
}

export async function getSettings(): Promise<SiteSettings> {
  if (!sql) return { ...DEFAULT_SETTINGS };
  try {
    const rows = await sql`SELECT key, value FROM site_settings`;
    const fromDb = Object.fromEntries(
      (rows as { key: string; value: string | null }[]).map((r) => [
        r.key,
        r.value ?? "",
      ]),
    );
    return { ...DEFAULT_SETTINGS, ...fromDb };
  } catch (error) {
    console.error("[queries] getSettings 실패 — 기본값으로 대체합니다.", error);
    return { ...DEFAULT_SETTINGS };
  }
}

export function splitMembers(members: Member[]) {
  return {
    leaders: members.filter((m) => m.role_group === "leader"),
    teammates: members.filter((m) => m.role_group === "teammate"),
  };
}
