import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-[1280px] flex-col items-center px-6 py-24 text-center md:px-16">
      <p className="eyebrow">404</p>
      <h1 className="mt-6 font-serif text-[32px] font-semibold text-ink md:text-[44px]">
        찾는 페이지가 없습니다
      </h1>
      <Link
        href="/"
        className="mt-8 rounded-[2px] bg-ink px-7 py-4 text-[13px] tracking-[0.14em] text-paper transition-colors hover:bg-flame"
      >
        메인으로 →
      </Link>
    </div>
  );
}
