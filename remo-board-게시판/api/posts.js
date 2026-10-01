import { neon } from "@neondatabase/serverless";

/**
 * 게시판 API — /api/posts
 *
 *   GET  /api/posts   최근 글 100개를 내려줍니다.
 *   POST /api/posts   { author, title, body } 를 받아 Neon DB에 저장합니다.
 *
 * DB 접속 주소는 Vercel이 넣어 주는 환경 변수에서 읽습니다.
 * 브라우저 코드에는 접속 정보가 전혀 들어가지 않습니다.
 */

const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL_UNPOOLED ||
  "";

const sql = connectionString ? neon(connectionString) : null;

const LIMIT = { author: 20, title: 60, body: 1000 };

function json(res, status, payload) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.status(status).send(JSON.stringify(payload));
}

export default async function handler(req, res) {
  if (!sql) {
    return json(res, 500, {
      error:
        "DB가 연결되지 않았습니다. Vercel 프로젝트의 Storage 탭에서 Neon을 연결한 뒤 다시 배포해 주세요.",
    });
  }

  try {
    /* ── 목록 불러오기 ── */
    if (req.method === "GET") {
      const posts = await sql`
        SELECT id, author, title, body, created_at
        FROM posts
        ORDER BY created_at DESC, id DESC
        LIMIT 100
      `;
      return json(res, 200, { posts });
    }

    /* ── 글 저장하기 ── */
    if (req.method === "POST") {
      const data =
        typeof req.body === "string"
          ? JSON.parse(req.body || "{}")
          : req.body || {};

      // 숨은 칸(website)이 채워져 있으면 자동 등록 봇입니다. 저장하지 않고 조용히 끝냅니다.
      if (typeof data.website === "string" && data.website.trim() !== "") {
        return json(res, 200, { ok: true });
      }

      const author = String(data.author ?? "").trim();
      const title = String(data.title ?? "").trim();
      const body = String(data.body ?? "").trim();

      if (!author || !title || !body) {
        return json(res, 400, { error: "이름 · 제목 · 내용을 모두 채워 주세요." });
      }

      if (
        author.length > LIMIT.author ||
        title.length > LIMIT.title ||
        body.length > LIMIT.body
      ) {
        return json(res, 400, {
          error: `글자 수를 줄여 주세요. 이름 ${LIMIT.author}자, 제목 ${LIMIT.title}자, 내용 ${LIMIT.body}자까지 쓸 수 있습니다.`,
        });
      }

      // 값은 따로 전달되므로 작은따옴표나 세미콜론을 넣어도 SQL이 깨지지 않습니다.
      const rows = await sql`
        INSERT INTO posts (author, title, body)
        VALUES (${author}, ${title}, ${body})
        RETURNING id, author, title, body, created_at
      `;

      return json(res, 201, { post: rows[0] });
    }

    res.setHeader("Allow", "GET, POST");
    return json(res, 405, { error: "지원하지 않는 요청입니다." });
  } catch (error) {
    console.error("[api/posts]", error);

    const message = String(error && error.message ? error.message : "");
    if (message.includes("does not exist") && message.includes("posts")) {
      return json(res, 500, {
        error:
          "posts 테이블이 없습니다. Neon SQL Editor에서 db/posts.sql 의 내용을 한 번 실행해 주세요.",
      });
    }

    return json(res, 500, {
      error: "서버에서 문제가 생겼습니다. 잠시 뒤 다시 시도해 주세요.",
    });
  }
}
