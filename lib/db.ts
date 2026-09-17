import { neon } from "@neondatabase/serverless";

/**
 * Neon(Vercel Postgres) 연결.
 * Vercel 프로젝트에 Neon을 연결하면 DATABASE_URL이 자동으로 주입됩니다.
 * 아직 연결 전이라면 sql이 null이 되고, 화면은 lib/content.ts의 기본값으로 그려집니다.
 */
const url = process.env.DATABASE_URL;

export const sql = url ? neon(url) : null;
export const hasDb = Boolean(url);
