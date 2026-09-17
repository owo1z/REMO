import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import { BlankBox } from "@/components/Blank";
import { SITE, VALUES, VISION } from "@/lib/content";
import { getMembers, getProjects, getSettings, splitMembers } from "@/lib/queries";

export const revalidate = 3600;

export default async function HomePage() {
  const [members, projects, settings] = await Promise.all([
    getMembers(),
    getProjects(),
    getSettings(),
  ]);
  const { leaders, teammates } = splitMembers(members);

  const stats = [
    { value: String(members.length).padStart(2, "0"), label: "구성원" },
    { value: String(leaders.length).padStart(2, "0"), label: "팀 리더 · Team Leader" },
    { value: String(teammates.length).padStart(2, "0"), label: "팀원 · Teammate" },
    { value: String(projects.length).padStart(2, "0"), label: "진행 프로젝트", accent: true },
  ];

  return (
    <>
      {/* 미션 */}
      <section className="mx-auto max-w-[1280px] px-6 pt-14 pb-12 md:px-16 md:pt-[86px] md:pb-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-14">
          <div className="flex-1">
            <p className="eyebrow">MISSION · 미션</p>
            <h1 className="mt-6 font-serif text-[32px] leading-[1.35] font-semibold tracking-[-0.02em] text-ink sm:text-[42px] md:text-[56px] md:leading-[1.32]">
              {SITE.missionLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <BlankBox
              value={settings.intro}
              label="INTRO"
              placeholder="팀기업 소개 문구를 여기에 작성하세요 — 어떤 팀인지, 무엇을 하는 팀인지 2~3문장"
              className="mt-8 max-w-[620px]"
            />
          </div>

          <aside className="w-full shrink-0 bg-ink px-6 py-7 text-paper md:w-[240px]">
            <p className="text-[10px] tracking-[0.3em] text-blue-pale">
              AT A GLANCE
            </p>
            <p className="mt-4 text-[13px] leading-[2.1]">
              {SITE.name}
              <br />
              {SITE.domain}
              <br />
              구성원 {members.length}명
            </p>
            <div className="mt-6 h-1 bg-blue" />
          </aside>
        </div>
      </section>

      {/* 숫자 */}
      <section className="border-y border-dashed border-ink bg-white">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 px-6 md:grid-cols-4 md:px-16">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`py-7 ${i % 2 === 1 ? "pl-8" : ""} md:pl-8 md:first:pl-0 ${
                i < stats.length - 1 ? "md:border-r md:border-dashed md:border-line" : ""
              }`}
            >
              <div
                className={`font-display text-[36px] leading-none md:text-[44px] ${
                  s.accent ? "text-flame" : "text-ink"
                }`}
              >
                {s.value}
              </div>
              <div className="mt-2 text-xs tracking-[0.14em] text-muted">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 비전 */}
      <section className="mx-auto max-w-[1280px] px-6 py-14 md:px-16 md:py-[72px]">
        <div className="flex flex-col gap-10 md:flex-row md:gap-12">
          <div className="flex-1">
            <div className="flex flex-wrap items-baseline gap-4">
              <span className="text-[11px] tracking-[0.3em] text-flame">
                VISION
              </span>
              <h2 className="font-display text-[28px] font-medium text-ink md:text-[34px]">
                {VISION.label}
              </h2>
            </div>
            <p className="mt-6 max-w-[620px] font-serif text-[21px] leading-[1.6] text-ink md:text-[27px]">
              {VISION.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>
          <div className="w-full shrink-0 bg-blue px-7 py-7 text-[#0F2C41] md:w-[360px]">
            <div className="text-[10px] tracking-[0.28em]">TARGET</div>
            <div className="mt-4 font-display text-[28px] leading-[1.25] md:text-[34px]">
              {VISION.targetHeadline}
            </div>
            <div className="mt-1.5 text-sm leading-[1.7]">{VISION.targetSub}</div>
          </div>
        </div>
      </section>

      {/* 핵심가치 */}
      <section className="mx-auto max-w-[1280px] px-6 md:px-16">
        <div className="stitch-bold pt-7">
          <SectionHeading
            eyebrow="CORE VALUE"
            title="우리가 지키는 다섯 가지"
            aside={
              <span className="text-xs tracking-[0.12em] text-muted">
                학습 · 협력 · 신뢰 · 책임 · 실행
              </span>
            }
          />
        </div>

        <div className="mt-6 grid gap-6 pb-16 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v) => {
            const dark = "emphasis" in v && v.emphasis;
            return (
              <article
                key={v.no}
                className={`border border-ink p-7 ${dark ? "bg-ink text-paper" : "bg-white"}`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] tracking-[0.3em] ${dark ? "text-blue-pale" : "text-flame"}`}
                  >
                    VALUE {v.no}
                  </span>
                  <span className="h-2.5 w-2.5 bg-blue" />
                </div>
                <h3
                  className={`mt-4 font-serif text-[22px] font-semibold ${dark ? "text-white" : "text-ink"}`}
                >
                  {v.name}
                  {v.sub && (
                    <span
                      className={`ml-2 text-sm font-normal ${dark ? "text-blue-pale" : "text-muted"}`}
                    >
                      {v.sub}
                    </span>
                  )}
                </h3>
                <p
                  className={`mt-3 text-[13px] leading-[1.95] ${dark ? "text-[#E4EDF2] text-[15px]" : "text-body"}`}
                >
                  {v.body}
                </p>
                {"note" in v && v.note && (
                  <p className="mt-2.5 text-[13px] leading-[1.95] text-blue-pale">
                    {v.note}
                  </p>
                )}
              </article>
            );
          })}

          <article className="blank flex flex-col justify-center p-7">
            <div className="text-[10px] tracking-[0.3em]">BLANK</div>
            <p className="mt-3.5 text-sm leading-[1.9]">
              {settings.value_extra?.trim() ||
                "[ 덧붙이고 싶은 가치나 팀 문화를 여기에 작성하세요 ]"}
            </p>
          </article>
        </div>
      </section>

      {/* 진행 프로젝트 */}
      <section className="mx-auto max-w-[1280px] px-6 pb-16 md:px-16">
        <div className="stitch-bold pt-8">
          <SectionHeading
            eyebrow="PROJECTS"
            title="진행 중인 프로젝트"
            aside={
              <Link
                href="/projects"
                className="shrink-0 rounded-[2px] bg-flame px-7 py-4 text-xs tracking-[0.16em] text-paper transition-opacity hover:opacity-90"
              >
                전체 프로젝트 보기 →
              </Link>
            }
          />
          <BlankBox
            value={settings.projects_intro}
            placeholder="프로젝트 섹션 소개 문구를 여기에 작성하세요"
            className="mt-5 max-w-[540px]"
          />
        </div>

        <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* 상담 유도 */}
      <section className="mx-auto max-w-[1280px] px-6 pb-16 md:px-16">
        <div className="flex flex-col gap-8 bg-ink px-8 py-10 text-paper md:flex-row md:items-center md:justify-between md:px-12 md:py-12">
          <div>
            <p className="text-[11px] tracking-[0.34em] text-blue-pale">
              CONTACT
            </p>
            <h2 className="mt-3 font-serif text-[24px] font-semibold text-white md:text-[30px]">
              함께 풀고 싶은 문제가 있다면
            </h2>
            <p className="mt-3 text-sm text-on-dark">
              {settings.contact_intro?.trim() ||
                "[ 상담 안내 한 줄을 여기에 작성하세요 ]"}
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 self-start rounded-[2px] bg-paper px-7 py-4 text-[13px] tracking-[0.16em] text-ink transition-colors hover:bg-white"
          >
            고객 상담 →
          </Link>
        </div>
      </section>
    </>
  );
}
