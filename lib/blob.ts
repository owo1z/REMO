import { put, del, list } from "@vercel/blob";

/**
 * Vercel Blob에 이미지 올리기.
 * 저장 경로 규칙
 *   members/<이름>.jpg     — 팀원 사진
 *   projects/<프로젝트>.png — 명함 카드 이미지
 *
 * 돌려받은 url을 members.photo_url / projects.card_image 에 넣으면 화면에 붙습니다.
 */
export async function uploadImage(
  path: string,
  file: Blob | ArrayBuffer | Buffer,
) {
  const { url } = await put(path, file as Blob, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  return url;
}

export async function listImages(prefix?: string) {
  const { blobs } = await list(prefix ? { prefix } : undefined);
  return blobs.map((b) => ({ pathname: b.pathname, url: b.url }));
}

export async function deleteImage(url: string) {
  await del(url);
}
