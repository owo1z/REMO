import type { Metadata } from "next";
import MailButton from "@/components/MailButton";
import { BlankBox, Filled } from "@/components/Blank";
import { getMembers, getSettings } from "@/lib/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "고객 상담",
  description: "REMO TEAM에 문의하기 — 팀 대표 메일과 팀원별 메일.",
};

/** 주소를 HTML 소스에 그대로 남기지 않기 위해 서버에서 감쌉니다. */
const encode = (email?: string | null) =>
  email?.trim() ? Buffer.from(email.trim()).toString("base64") : "";

export default async function ContactPage() {
  const [members, settings] = await Promise.all([getMembers(), getSettings()]);
  const teamEmail = settings.team_email?.trim();

  return (
    <div className="mx-auto max-w-[1280px] px-6 pb-16 md:px-16">
      <section className="flex flex-col gap-8 pt-12 pb-10 md:flex-row md:items-start md:justify-between md:pt-[70px]">
        <div className="flex-1">
          <p className="eyebrow">CONTACT</p>
          <h1 className="mt-5 font-serif text-[32px] leading-[1.3] font-semibold text-ink md:text-[48px]">
            고객 상담
          </h1>
          <BlankBox
            value={settings.contact_intro}
            placeholder="상담 안내 문구를 여기에 작성하세요 — 어떤 문의를 받는지, 어떻게 답변하는지"
            className="mt-6 max-w-[580px]"
          />
        </div>
        <div className="blank w-full shrink-0 px-5 py-5 md:w-[250px]">
          <p className="text-[10px] tracking-[0.28em]">RESPONSE</p>
          <p className="mt-3 text-[13px] leading-[2]">
            {settings.contact_response?.trim() ||
              "[ 응답 소요 시간 ] · [ 상담 가능 시간 ]"}
          </p>
        </div>
      </section>

      {/* 팀 대표 메일 */}
      <section className="flex flex-col gap-6 bg-ink px-8 py-9 text-paper md:flex-row md:items-center md:justify-between md:px-11">
        <div>
          <div className="text-[10px] tracking-[0.32em] text-blue-pale">
            TEAM EMAIL · 팀 대표 메일
          </div>
          <div className="mt-3.5 font-display text-[26px] tracking-[0.01em] text-white md:text-[36px]">
            {teamEmail || "[ 팀 이메일 주소 ]"}
          </div>
        </div>
        {teamEmail ? (
          <a
            href={`mailto:${teamEmail}`}
            className="shrink-0 self-start rounded-[2px] bg-paper px-7 py-4 text-[13px] tracking-[0.16em] text-ink transition-colors hover:bg-white"
          >
            메일 보내기 →
          </a>
        ) : (
          <span className="shrink-0 self-start rounded-[2px] border border-dashed border-blue-pale px-7 py-4 text-[13px] tracking-[0.16em] text-blue-pale">
            주소 입력 전
          </span>
        )}
      </section>

      {/* 팀원별 메일 */}
      <section className="stitch-bold mt-12 flex flex-wrap items-baseline gap-4 pt-6">
        <h2 className="font-display text-[26px] font-medium text-ink">Members</h2>
        <span className="text-[13px] text-muted">
          팀원별 메일 · {members.length}명
        </span>
      </section>

      <section className="mt-4 grid gap-x-11 md:grid-cols-2">
        {members.map((member, i) => (
          <div
            key={member.id}
            className="flex items-center gap-4 border-b border-dashed border-line py-4"
          >
            <span className="w-7 text-[10px] tracking-[0.18em] text-muted">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="w-[70px] shrink-0 font-serif text-[17px] font-semibold text-ink">
              {member.name}
            </span>
            <span
              className={`hidden w-[108px] shrink-0 text-[11px] tracking-[0.08em] sm:block ${
                member.role_group === "leader" ? "text-flame" : "text-muted"
              }`}
            >
              {member.role_group === "leader" ? "TEAM LEADER" : "TEAMMATE"}
            </span>
            <span className="flex-1 truncate text-[13px]">
              <Filled value={member.email} placeholder="이메일 주소" />
            </span>
            <MailButton token={encode(member.email)} />
          </div>
        ))}
      </section>

      <section className="mt-10 flex flex-col gap-4 border border-ink bg-white px-7 py-6 md:flex-row md:items-center md:gap-8">
        <div className="shrink-0 text-[10px] tracking-[0.28em] text-flame">
          NOTE
        </div>
        <p className="text-[13px] leading-[1.9] text-body">
          주소는 화면에 텍스트로 노출하지 않고 <strong className="font-medium">메일</strong>{" "}
          버튼을 눌렀을 때 메일 앱이 열리도록 했습니다. 수집 봇 차단을 위한
          것이고, 확정된 주소는 members 테이블에 입력하면 그대로 반영됩니다.
        </p>
      </section>
    </div>
  );
}
