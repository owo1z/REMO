# REMO TEAM 게시판 — 올리는 순서

게시판에 쓴 글이 Vercel에 연결된 Neon DB에 저장됩니다.

## 넣을 파일

| 파일 | 저장소에서의 위치 |
| --- | --- |
| `index.html` | **지금 쓰고 있는 index.html을 이 파일로 교체**하세요. (`public/index.html` 안에 있다면 거기에 덮어쓰기) |
| `api/posts.js` | 저장소 **맨 위**에 `api` 폴더를 만들고 그 안에 |
| `package.json` | 저장소 맨 위 |
| `db/posts.sql` | 저장소 맨 위 (배포에는 쓰이지 않고, DB 테이블 만들 때 복사해 쓰는 파일입니다) |

`api` 폴더는 `public` 안이 아니라 반드시 저장소 맨 위에 두어야 합니다. Vercel이 그 자리에 있는 파일만 서버 함수로 인식합니다.

## 1. Neon 연결

Vercel 프로젝트 → **Storage** → **Neon(Postgres)** 생성 후 이 프로젝트에 연결합니다.
연결하면 `DATABASE_URL` 환경 변수가 자동으로 들어갑니다. 따로 입력할 값은 없습니다.

## 2. 테이블 만들기

Neon 콘솔의 **SQL Editor**에 `db/posts.sql` 내용을 붙여 넣고 한 번 실행합니다.

```sql
CREATE TABLE IF NOT EXISTS posts (
  id         SERIAL PRIMARY KEY,
  author     VARCHAR(20)  NOT NULL,
  title      VARCHAR(60)  NOT NULL,
  body       TEXT         NOT NULL,
  created_at TIMESTAMPTZ  NOT NULL DEFAULT now()
);
```

## 3. 다시 배포

파일을 커밋하면 Vercel이 자동으로 다시 배포합니다. 사이트에서 **게시판** 메뉴를 열고 글을 하나 올려 보세요.

## 확인

- Neon 콘솔 SQL Editor에서 `SELECT * FROM posts ORDER BY created_at DESC;`
- 글 삭제는 Neon 콘솔에서 `DELETE FROM posts WHERE id = 3;`

## 만들어 둔 안전장치

- DB 접속 정보는 서버 함수에만 있고 브라우저 코드에는 들어가지 않습니다
- 글 내용은 글자로만 그려서, 누가 `<script>` 를 적어도 실행되지 않습니다
- 이름 20자 · 제목 60자 · 내용 1000자 제한
- 사람 눈에 안 보이는 칸을 하나 두어, 그 칸을 채우는 자동 등록 봇의 글은 저장하지 않습니다

## 잘 안 될 때

| 화면에 뜨는 말 | 할 일 |
| --- | --- |
| DB가 연결되지 않았습니다 | Storage 탭에서 Neon을 프로젝트에 연결한 뒤 다시 배포 |
| posts 테이블이 없습니다 | 위 2번 SQL 실행 |
| 서버 응답을 읽지 못했습니다 | `api/posts.js` 가 저장소 맨 위의 `api` 폴더에 있는지 확인 |
