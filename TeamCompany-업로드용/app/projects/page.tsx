import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { BlankBox } from "@/components/Blank";
import { getProjects, getSettings } from "@/lib/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "진행 프로젝트",
  description:
    "REMO TEAM이 진행 중인 프로젝트를 명함 카드로 소개합니다. 카드를 누르면 해당 프로젝트 사이트로 이동합니다.",
};

export default async function ProjectsPage() {
  const [projects, settings] = await Promise.all([getProjects(), getSettings()]);

  const industries = Array.from(
    new Set(projects.map((p) => p.industry?.trim()).filter(Boolean)),
  ) as string[];

  return (
    <div className="mx-auto max-w-[1280px] px-6 pb-16 md:px-16">
      <section className="flex flex-col gap-8 pt-12 pb-10 md:flex-row md:items-end md:justify-between md:pt-[70px]">
        <div>
          <p className="eyebrow">PROJECTS</p>
          <h1 className="mt-5 font-serif text-[32px] leading-[1.3] font-semibold text-ink md:text-[48px]">
            진행 프로젝트
          </h1>
          <BlankBox
            value={settings.projects_intro}
            placeholder="프로젝트 소개 문구를 여기에 작성하세요"
            className="mt-6 max-w-[600px]"
          />
        </div>
        <div className="shrink-0 border border-ink bg-white px-5 py-4 text-[11px] leading-[2] tracking-[0.08em] text-muted">
          SIZE · 90 × 50 mm 명함 비율
          <br />
          ACTION · 카드 전체가 링크
          <br />
          URL · 화면 비노출
        </div>
      </section>

      <section className="flex flex-wrap items-center gap-2.5 border-b border-dashed border-line pb-5">
        <span className="mr-2 text-[11px] tracking-[0.2em] text-muted">산업</span>
        <span className="rounded-[2px] border border-ink bg-ink px-4 py-1.5 text-xs text-paper">
          전체
        </span>
        {industries.length > 0
          ? industries.map((industry) => (
              <span
                key={industry}
                className="rounded-[2px] border border-line px-4 py-1.5 text-xs text-body"
              >
                {industry}
              </span>
            ))
          : [0, 1, 2].map((i) => (
              <span
                key={i}
                className="rounded-[2px] border border-dashed border-line-soft px-6 py-1.5 text-xs text-muted"
              >
                {`[ ${" ".repeat(4)} ]`}
              </span>
            ))}
      </section>

      <section className="mt-9 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}

        <div className="blank flex aspect-[9/5] flex-col items-center justify-center gap-2.5 p-5 text-center">
          <div className="text-[26px] leading-none">+</div>
          <div className="text-xs tracking-[0.12em]">프로젝트 추가 자리</div>
          <div className="text-[11px]">
            projects 테이블에 행을 넣으면 카드가 생깁니다
          </div>
        </div>
      </section>

      <section className="mt-8 flex flex-col gap-6 border border-ink bg-white px-7 py-6 md:flex-row md:items-center md:gap-9">
        <div className="flex-1">
          <div className="text-[10px] tracking-[0.3em] text-flame">
            HOW IT WORKS
          </div>
          <p className="mt-2.5 text-[13px] leading-[1.95] text-body">
            카드 한 장이 프로젝트 하나의 링크입니다. 주소는 화면 어디에도 표시하지
            않고, 카드를 누르면 새 창에서 해당 프로젝트 사이트가 열립니다. 키보드
            Tab으로 이동하고 Enter로도 열 수 있습니다.
          </p>
        </div>
        <div className="shrink-0 border-t border-dashed border-line pt-4 text-[11px] leading-[2.1] tracking-[0.06em] text-muted md:border-t-0 md:border-l md:pt-0 md:pl-7">
          DATA · projects 테이블
          <br />
          IMAGE · Vercel Blob
          <br />
          ORDER · sort_order
        </div>
      </section>
    </div>
  );
}
