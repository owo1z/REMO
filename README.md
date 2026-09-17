# TeamCompany — REMO TEAM 홈페이지

remoteam.com. Next.js(App Router) + TypeScript + Tailwind CSS v4, Vercel 호스팅, Neon(Postgres) DB, Vercel Blob 이미지 저장.

DB를 붙이기 전에도 화면이 전부 나옵니다. 팀원 10명과 프로젝트 4개는 `lib/content.ts`의 기본값으로 그려지고, DB를 연결하면 그쪽 값이 우선합니다.

## 1. 로컬에서 실행

```bash
npm install
npm run dev          # http://localhost:3000
```

## 2. GitHub

```bash
git init
git add .
git commit -m "feat: REMO TEAM 홈페이지 초기 구현"
git branch -M main
git remote add origin https://github.com/<조직명>/TeamCompany.git
git push -u origin main
```

`main` 브랜치는 보호 설정(PR 필수, 리뷰 1명 이상)을 권장합니다. 작업은 `feature/*`, `fix/*` 브랜치에서 하고 PR로 합칩니다.

## 3. Vercel

1. vercel.com → Add New Project → GitHub의 `TeamCompany` Import
2. Framework Preset은 Next.js로 자동 인식됩니다. 추가 설정 없이 Deploy
3. Settings → Domains에서 `remoteam.com`과 `www.remoteam.com` 추가 후 안내되는 DNS 레코드 입력 (루트는 A, www는 CNAME). SSL은 자동 발급됩니다.

## 4. Neon (DB)

1. Vercel 프로젝트 → Storage → Neon(Postgres) 생성 후 프로젝트에 연결 → `DATABASE_URL` 자동 등록
2. 테이블 생성과 초기 데이터 입력 — 둘 중 하나

   - Neon 콘솔 SQL Editor에 `db/schema.sql` → `db/seed.sql` 순서로 붙여 넣기
   - 또는 로컬에서:
     ```bash
     vercel link
     vercel env pull .env.local
     node --env-file=.env.local scripts/db-setup.mjs
     ```

### 테이블

| 테이블 | 쓰임 | 비고 |
| --- | --- | --- |
| `members` | 팀원 10명 | `role_group`이 `leader`(4명) / `teammate`(6명) |
| `projects` | 진행 프로젝트 | `site_url`은 화면에 노출하지 않고 카드 링크로만 사용 |
| `site_settings` | 소개 문구 등 자주 바뀌는 문장 | `key`/`value` |

### 채워 넣을 값

| 위치 | 내용 |
| --- | --- |
| `members.title`, `members.bio`, `members.photo_url`, `members.email` | 역할, 한 줄 소개, 사진, 메일 |
| `projects.industry`, `projects.product`, `projects.site_url` | 산업, 판매 품목, 이동할 주소 |
| `site_settings.intro` | 메인 팀기업 소개 문구 |
| `site_settings.team_intro` | 팀원 페이지 소개 문구 |
| `site_settings.projects_intro` | 프로젝트 섹션 소개 문구 |
| `site_settings.contact_intro`, `contact_response` | 상담 안내, 응답 시간 |
| `site_settings.team_email` | 팀 대표 메일 |
| `site_settings.landing_body` | 랜딩 페이지 내용 |
| `site_settings.value_extra` | 핵심가치 옆 빈 카드 |

비어 있으면 화면에 `[ 역할 ]`처럼 자리표시가 보입니다. 값을 넣으면 그 자리에 그대로 들어갑니다.

미션 · 비전 · 핵심가치 5개는 자주 바뀌지 않아 `lib/content.ts`에 코드로 두었습니다. 문구를 고칠 때는 그 파일을 수정하고 PR을 올리면 됩니다.

## 5. Vercel Blob (이미지)

1. Vercel 프로젝트 → Storage → Blob 생성 후 연결 → `BLOB_READ_WRITE_TOKEN` 자동 등록
2. 경로 규칙: `members/<이름>.jpg`, `projects/<프로젝트>.png`
3. `lib/blob.ts`의 `uploadImage()`로 올리고, 돌려받은 URL을 `members.photo_url` / `projects.card_image`에 넣습니다.

## 6. 캐시

각 페이지는 1시간마다 다시 그려집니다(`revalidate = 3600`). DB를 고친 뒤 바로 반영하려면:

```bash
curl -X POST "https://remoteam.com/api/revalidate?secret=<REVALIDATE_SECRET>"
```

## 구조

```
app/
  page.tsx            메인 — 미션 · 숫자 · 비전 · 핵심가치 · 프로젝트 · 상담
  team/page.tsx       팀원 구성원 소개
  projects/page.tsx   진행 프로젝트 (명함 카드)
  landing/page.tsx    랜딩 페이지 (준비 중)
  contact/page.tsx    고객 상담 (팀 메일 + 팀원 메일)
  api/revalidate/     캐시 비우기
components/           Header, Footer, ProjectCard, MemberCard, MailButton, Blank
lib/                  db(Neon), queries, content(문구·기본값), blob, types
db/                   schema.sql, seed.sql
```

## 명함 카드 규칙 (`components/ProjectCard.tsx`)

- 비율 9:5 (90 × 50 mm)
- 카드 전체가 하나의 `<a>`, 새 창으로 열림
- 주소는 화면 어디에도 글자로 찍지 않음
- `aria-label`로 이동 대상을 안내하고 Tab + Enter로도 열림
- `site_url`이 비어 있으면 링크가 아니라 정보 카드로만 표시

## 색

| 이름 | 값 | 쓰임 |
| --- | --- | --- |
| PANTONE 19-4033 TCX Poseidon | `#133955` | 기본 잉크, 다크 블록 |
| PANTONE 15-4427 TCX Norse Blue | `#4CA5C7` | 보조 면과 그래픽 |
| PANTONE 17-1449 TCX Pureed Pumpkin | `#C34121` | 포인트, 라벨과 버튼 |
| Paper | `#F5F3EE` | 배경 |

토큰은 `app/globals.css`의 `@theme`에 있습니다. `bg-ink`, `text-flame`처럼 씁니다.
