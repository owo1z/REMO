/**
 * schema.sql 과 seed.sql 을 Neon에 한 번에 실행합니다.
 *
 *   vercel env pull .env.local     # DATABASE_URL 받아오기
 *   node --env-file=.env.local scripts/db-setup.mjs
 *
 * Neon 콘솔 SQL Editor에 직접 붙여 넣어도 결과는 같습니다.
 */
import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL 이 없습니다. `vercel env pull .env.local` 먼저 실행하세요.");
  process.exit(1);
}

const sql = neon(url);

const run = async (file) => {
  const text = readFileSync(new URL(`../db/${file}`, import.meta.url), "utf8");
  const statements = text
    .split(";")
    .map((s) => s.replace(/^\s*--.*$/gm, "").trim())
    .filter(Boolean);

  for (const statement of statements) {
    await sql.query(statement);
  }
  console.log(`${file} 실행 완료 (${statements.length}개 구문)`);
};

await run("schema.sql");
await run("seed.sql");
console.log("DB 준비가 끝났습니다.");
