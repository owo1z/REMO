import { Filled } from "./Blank";
import type { Project } from "@/lib/types";

/**
 * 명함 크기(90 × 50 mm = 9:5) 카드.
 *
 * 링크 규칙
 *  - 카드 전체가 하나의 <a> 입니다.
 *  - 주소(site_url)는 화면 어디에도 글자로 출력하지 않습니다.
 *  - 새 창으로 열고 rel="noopener noreferrer" 로 원본 탭을 보호합니다.
 *  - aria-label 로 어디로 가는지 알려 주고, Tab + Enter 로도 열립니다.
 */
export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const no = String(index + 1).padStart(2, "0");
  const href = project.site_url?.trim();

  const style = project.card_image?.trim()
    ? {
        backgroundImage: `linear-gradient(rgba(19,57,85,.82), rgba(19,57,85,.82)), url(${project.card_image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : undefined;

  const inner = (
    <>
      <div className="flex items-start justify-between">
        <span className="text-[9px] tracking-[0.32em] text-flame">
          PROJECT {no}
        </span>
        {href && (
          <span className="text-[11px] tracking-[0.14em] text-flame opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            OPEN ↗
          </span>
        )}
      </div>

      <div className="font-serif text-[25px] leading-[1.3] text-on-dark">
        <Filled value={project.name} placeholder="프로젝트 이름" />
      </div>

      <div className="border-t border-dashed border-ink-soft pt-3 text-xs leading-[2] text-on-dark">
        <div>
          산업 ·{" "}
          <Filled
            value={project.industry}
            placeholder={" ".repeat(8)}
            className="text-on-dark/80"
          />
        </div>
        <div>
          판매 ·{" "}
          <Filled
            value={project.product}
            placeholder={" ".repeat(8)}
            className="text-on-dark/80"
          />
        </div>
      </div>
    </>
  );

  const shell =
    "group flex aspect-[9/5] flex-col justify-between border border-ink bg-ink p-5 transition-transform duration-200";

  if (!href) {
    return (
      <div className={shell} style={style} aria-label={`${project.name} (링크 준비 중)`}>
        {inner}
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.name} 프로젝트 사이트로 이동 (새 창)`}
      className={`${shell} hover:-translate-y-1.5 hover:shadow-[0_14px_30px_rgba(19,57,85,.28)]`}
      style={style}
    >
      {inner}
    </a>
  );
}
