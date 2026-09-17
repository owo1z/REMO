import Image from "next/image";
import { Filled } from "./Blank";
import type { Member } from "@/lib/types";

function Photo({
  member,
  className,
}: {
  member: Member;
  className: string;
}) {
  const src = member.photo_url?.trim();
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={`${member.name} 사진`}
          fill
          sizes="(max-width: 768px) 40vw, 280px"
          className="object-cover"
        />
      </div>
    );
  }
  return (
    <div
      className={`blank flex items-center justify-center text-[10px] tracking-[0.24em] ${className}`}
    >
      PHOTO
    </div>
  );
}

/** 팀 리더 카드 — 사진을 크게 */
export function LeaderCard({
  member,
  index,
}: {
  member: Member;
  index: number;
}) {
  const no = String(index + 1).padStart(2, "0");
  return (
    <article className="border border-ink bg-white p-4 pb-5 transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_12px_26px_rgba(19,57,85,.14)]">
      <div className="flex items-center justify-between">
        <span className="text-[9px] tracking-[0.32em] text-flame">
          MEMBER {no}
        </span>
        <span className="h-[9px] w-[9px] bg-blue" />
      </div>
      <Photo member={member} className="mt-3 h-[188px] w-full" />
      <h3 className="mt-4 font-serif text-[22px] font-semibold text-ink">
        {member.name}
      </h3>
      <div className="mt-1 text-xs">
        <Filled value={member.title} placeholder="역할" />
      </div>
      <p className="mt-3 text-[13px] leading-[1.85]">
        <Filled value={member.bio} placeholder="한 줄 소개" />
      </p>
    </article>
  );
}

/** 팀원 카드 — 사진을 옆에 */
export function TeammateCard({
  member,
  index,
}: {
  member: Member;
  index: number;
}) {
  const no = String(index + 1).padStart(2, "0");
  return (
    <article className="flex gap-4 border border-ink bg-white p-5 transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_12px_26px_rgba(19,57,85,.14)]">
      <Photo member={member} className="h-[118px] w-[96px] shrink-0" />
      <div>
        <div className="text-[9px] tracking-[0.32em] text-flame">
          MEMBER {no}
        </div>
        <h3 className="mt-2 font-serif text-[20px] font-semibold text-ink">
          {member.name}
        </h3>
        <div className="mt-1 text-xs">
          <Filled value={member.title} placeholder="역할" />
        </div>
        <p className="mt-2 text-[13px] leading-[1.8]">
          <Filled value={member.bio} placeholder="한 줄 소개" />
        </p>
      </div>
    </article>
  );
}
