import type { Metadata } from "next";
import { LeaderCard, TeammateCard } from "@/components/MemberCard";
import { BlankBox } from "@/components/Blank";
import { getMembers, getSettings, splitMembers } from "@/lib/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "팀원 구성원 소개",
  description: "REMO TEAM의 팀 리더와 팀원을 소개합니다.",
};

export default async function TeamPage() {
  const [members, settings] = await Promise.all([getMembers(), getSettings()]);
  const { leaders, teammates } = splitMembers(members);

  return (
    <div className="mx-auto max-w-[1280px] px-6 pb-16 md:px-16">
      <section className="flex flex-col gap-8 pt-12 pb-10 md:flex-row md:items-end md:justify-between md:pt-[70px]">
        <div>
          <p className="eyebrow">MEMBERS · {members.length}</p>
          <h1 className="mt-5 font-serif text-[32px] leading-[1.3] font-semibold text-ink md:text-[48px]">
            팀원 구성원 소개
          </h1>
          <BlankBox
            value={settings.team_intro}
            placeholder="팀 구성에 대한 소개 문구를 여기에 작성하세요"
            className="mt-6 max-w-[560px]"
          />
        </div>
        <dl className="shrink-0 text-xs leading-[2.1] tracking-[0.06em] text-muted md:text-right">
          <div>TEAM LEADER · {String(leaders.length).padStart(2, "0")}</div>
          <div>TEAMMATE · {String(teammates.length).padStart(2, "0")}</div>
          <div>TOTAL · {String(members.length).padStart(2, "0")}</div>
        </dl>
      </section>

      <section>
        <div className="stitch-bold flex flex-wrap items-baseline gap-4 pt-6">
          <h2 className="font-display text-[26px] font-medium text-ink">
            Team Leader
          </h2>
          <span className="text-[13px] text-muted">
            팀 리더 · {leaders.length}명
          </span>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {leaders.map((member, i) => (
            <LeaderCard key={member.id} member={member} index={i} />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <div className="stitch-bold flex flex-wrap items-baseline gap-4 pt-6">
          <h2 className="font-display text-[26px] font-medium text-ink">
            Teammate
          </h2>
          <span className="text-[13px] text-muted">
            팀원 · {teammates.length}명
          </span>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teammates.map((member, i) => (
            <TeammateCard
              key={member.id}
              member={member}
              index={leaders.length + i}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
