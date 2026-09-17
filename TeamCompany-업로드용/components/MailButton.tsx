"use client";

/**
 * 이메일 주소를 HTML 소스에 그대로 남기지 않기 위한 버튼.
 * 서버에서 base64로 감싼 값을 받아, 클릭하는 순간에만 mailto: 를 만듭니다.
 * (수집 봇 차단용이며, 주소가 비어 있으면 비활성 상태로 보입니다.)
 */
export default function MailButton({
  token,
  label = "메일",
}: {
  token: string;
  label?: string;
}) {
  if (!token) {
    return (
      <span className="rounded-[2px] border border-dashed border-line-soft px-3.5 py-2 text-[11px] tracking-[0.12em] text-muted">
        {label}
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        window.location.href = `mailto:${atob(token)}`;
      }}
      className="rounded-[2px] border border-ink px-3.5 py-2 text-[11px] tracking-[0.12em] text-ink transition-colors hover:bg-ink hover:text-paper"
    >
      {label}
    </button>
  );
}
