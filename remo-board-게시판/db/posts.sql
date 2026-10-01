-- 게시판 테이블. Neon 콘솔의 SQL Editor에 붙여 넣고 한 번만 실행하세요.

CREATE TABLE IF NOT EXISTS posts (
  id         SERIAL PRIMARY KEY,
  author     VARCHAR(20)  NOT NULL,
  title      VARCHAR(60)  NOT NULL,
  body       TEXT         NOT NULL,
  created_at TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS posts_created_idx ON posts (created_at DESC);

-- 잘 만들어졌는지 확인
-- SELECT * FROM posts ORDER BY created_at DESC;

-- 글 지우기 (관리자가 Neon 콘솔에서 직접)
-- DELETE FROM posts WHERE id = 3;
