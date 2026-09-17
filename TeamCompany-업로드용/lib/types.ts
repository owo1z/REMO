export type RoleGroup = "leader" | "teammate";

export type Member = {
  id: number;
  name: string;
  role_group: RoleGroup;
  /** 역할. 아직 안 정했으면 빈 문자열 → 화면에 [ 역할 ] 자리로 표시됩니다. */
  title: string | null;
  /** 한 줄 소개 */
  bio: string | null;
  email: string | null;
  /** Vercel Blob URL */
  photo_url: string | null;
  sort_order: number;
};

export type Project = {
  id: number;
  name: string;
  /** 산업 */
  industry: string | null;
  /** 판매 품목 */
  product: string | null;
  /** 이동할 주소 — 화면에는 절대 노출하지 않습니다. */
  site_url: string | null;
  /** Vercel Blob URL (명함 배경 이미지, 선택) */
  card_image: string | null;
  is_active: boolean;
  sort_order: number;
};

export type SiteSettings = Record<string, string>;
