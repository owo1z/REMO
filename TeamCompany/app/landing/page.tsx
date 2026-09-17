import type { Metadata } from "next";
import Link from "next/link";
import { getSettings } from "@/lib/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "랜딩 페이지",
  description: "준비 중입니다.",
};

export default async function LandingPage() {
  const settings = await getSettings();
  const body = settings.landing_body?.trim();

  return (
    <div className="mx-auto flex max-w-[1280px] flex-col items-center px-6 py-20 text-center md:px-16 md:py-28">
      <p className="eyebrow">LANDING · 준비 중</p>
      <h1 className="mt-6 font-serif text-[36px] leading-[1.32] font-semibold tracking-[-0.02em] text-ink md:text-[62px]">
        준비 중입니다
      </h1>

      {body ? (
        <p className="mt-8 max-w-[620px] text-left text-sm leading-[1.95] text-body">
          {body}
        </p>
      ) : (
        <div className="blank mt-8 w-full max-w-[620px] px-7 py-6 text-left">
          <div className="text-[10px] tracking-[0.26em]">CONTENT</div>
          <p className="mt-3 text-sm leading-[1.95]">
            [ 랜딩 페이지에 들어갈 내용을 여기에 작성하세요 — 어떤 제안을 담을지,
            어떤 행동을 유도할지 ]
          </p>
        </div>
      )}

      <div className="mt-10 flex h-1.5 w-full max-w-[620px] bg-[#E0E5E4]">
        <span className="w-[45%] bg-blue" />
      </div>
      <div className="mt-2.5 flex w-full max-w-[620px] justify-between text-[10px] tracking-[0.2em] text-muted">
        <span>2차 개발 예정</span>
        <span>/landing</span>
      </div>

      <div className="mt-12 flex flex-col gap-3.5 sm:flex-row">
        <Link
          href="/projects"
          className="rounded-[2px] bg-ink px-7 py-4 text-[13px] tracking-[0.14em] text-paper transition-colors hover:bg-flame"
        >
          진행 프로젝트 보기
        </Link>
        <Link
          href="/team"
          className="rounded-[2px] border border-ink px-7 py-4 text-[13px] tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-paper"
        >
          팀원 구성원 보기
        </Link>
      </div>
    </div>
  );
}
