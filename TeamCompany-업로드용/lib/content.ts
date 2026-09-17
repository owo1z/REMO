import type { Member, Project } from "./types";

/**
 * 코드에 고정된 팀의 문구입니다.
 * 자주 바뀌지 않는 미션 · 비전 · 핵심가치는 여기서 관리하고,
 * 팀원 · 프로젝트처럼 자주 바뀌는 데이터는 DB(Neon)에서 읽습니다.
 */

export const SITE = {
  name: "REMO TEAM",
  domain: "remoteam.com",
  mission: "우리는 가치와 문제를 비즈니스로 풀어내며 실행으로 증명한다.",
  /** 줄바꿈 위치를 직접 잡기 위해 배열로 둡니다. */
  missionLines: [
    "우리는 가치와 문제를",
    "비즈니스로 풀어내며",
    "실행으로 증명한다.",
  ],
} as const;

export const VISION = {
  label: "비전 — LEINN 2년차",
  lines: ["혼자가 아닌 팀으로 선순환하며,", "시장의 평가 속에서 성장한다."],
  targetHeadline: "인당 매출 600만원",
  targetSub: "또는 수익 [ n ]원 달성",
} as const;

export const VALUES = [
  {
    no: "01",
    name: "학습",
    sub: "성장",
    body: "우리는 함께 학습합니다. 개인의 경험과 배움을 팀으로 연결하며, 시행착오와 프로젝트를 통해 성장합니다. 지레짐작 하지 않고 적극적으로 질문하고 행동합니다. 개인의 성장이 팀의 성장으로 이어지고, 팀의 성장이 다시 개인의 성장을 돕는 선순환을 만듭니다.",
  },
  {
    no: "02",
    name: "협력",
    sub: "",
    body: "우리는 함께 성과를 만듭니다. 개인의 강점과 다양성을 통해 더 큰 가치를 만들어내며, 서로의 성장을 응원합니다. 다양한 관점과 생각을 환영하며, 개인의 성과를 팀의 성과로 확장합니다. 우리는 혼자서 빠르게 가기보다 함께 멀리 가는 길을 선택합니다.",
  },
  {
    no: "03",
    name: "신뢰",
    sub: "안전감",
    body: "우리는 신뢰를 쌓아갑니다. 우리는 어려움과 실수, 아쉬움을 그때그때 공유하며, 팀원 모두에게 안전한 팀이 될 것입니다. 서로를 믿고 의지할 수 있는 공동체가 되기를 희망합니다.",
  },
  {
    no: "04",
    name: "책임",
    sub: "설명",
    body: "우리는 서로를 책임집니다. 역할과 약속에 책임을 다하며, 문제를 외면하거나 미루지 않고 스스로 그리고 함께 해결하려 노력합니다. 말하는 것과 말하지 않는 것 모두 의사 표현입니다. 자신의 의사 표현에 대한 결과를 책임집니다.",
  },
  {
    no: "05",
    name: "실행",
    sub: "실험",
    body: "골대가 보이면 일단 합니다.",
    note: "목적지를 정하면 우선 실행합니다.",
    emphasis: true,
  },
] as const;

/**
 * site_settings 테이블의 기본값.
 * DB에 값이 없으면 여기 문구가 그대로 보이고, [ ] 자리는 채워 넣으면 됩니다.
 */
export const DEFAULT_SETTINGS: Record<string, string> = {
  team_email: "",
  intro: "",
  projects_intro: "",
  team_intro: "",
  contact_intro: "",
  contact_response: "",
  landing_body: "",
  value_extra: "",
};

/** DB 연결 전에도 화면이 나오도록 쓰는 기본 팀원 목록 */
export const FALLBACK_MEMBERS: Member[] = [
  { id: 1, name: "브루노", role_group: "leader", title: "", bio: "", email: "", photo_url: "", sort_order: 1 },
  { id: 2, name: "조이", role_group: "leader", title: "", bio: "", email: "", photo_url: "", sort_order: 2 },
  { id: 3, name: "쏠", role_group: "leader", title: "", bio: "", email: "", photo_url: "", sort_order: 3 },
  { id: 4, name: "유진", role_group: "leader", title: "", bio: "", email: "", photo_url: "", sort_order: 4 },
  { id: 5, name: "정우", role_group: "teammate", title: "", bio: "", email: "", photo_url: "", sort_order: 5 },
  { id: 6, name: "이든", role_group: "teammate", title: "", bio: "", email: "", photo_url: "", sort_order: 6 },
  { id: 7, name: "로", role_group: "teammate", title: "", bio: "", email: "", photo_url: "", sort_order: 7 },
  { id: 8, name: "막스", role_group: "teammate", title: "", bio: "", email: "", photo_url: "", sort_order: 8 },
  { id: 9, name: "비크", role_group: "teammate", title: "", bio: "", email: "", photo_url: "", sort_order: 9 },
  { id: 10, name: "겸", role_group: "teammate", title: "", bio: "", email: "", photo_url: "", sort_order: 10 },
];

/** DB 연결 전에도 화면이 나오도록 쓰는 기본 프로젝트 목록 */
export const FALLBACK_PROJECTS: Project[] = [
  { id: 1, name: "MOODISM", industry: "", product: "", site_url: "", card_image: "", is_active: true, sort_order: 1 },
  { id: 2, name: "DATA FLOW", industry: "", product: "", site_url: "", card_image: "", is_active: true, sort_order: 2 },
  { id: 3, name: "NOWESA", industry: "", product: "", site_url: "", card_image: "", is_active: true, sort_order: 3 },
  { id: 4, name: "PLN", industry: "", product: "", site_url: "", card_image: "", is_active: true, sort_order: 4 },
];

export const NAV = [
  { href: "/", label: "메인" },
  { href: "/team", label: "팀원 구성원" },
  { href: "/projects", label: "진행 프로젝트" },
  { href: "/landing", label: "랜딩 페이지" },
] as const;
