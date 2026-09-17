import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

/**
 * DB 값을 바꾼 뒤 캐시를 바로 비우고 싶을 때 호출합니다.
 *
 *   curl -X POST "https://remoteam.com/api/revalidate?secret=<REVALIDATE_SECRET>"
 *
 * 호출하지 않아도 각 페이지는 1시간(revalidate = 3600)마다 새로 그려집니다.
 */
export async function POST(request: Request) {
  const secret = new URL(request.url).searchParams.get("secret");

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, message: "인증 실패" }, { status: 401 });
  }

  for (const path of ["/", "/team", "/projects", "/landing", "/contact"]) {
    revalidatePath(path);
  }

  return NextResponse.json({ ok: true, revalidatedAt: new Date().toISOString() });
}
