-- REMO TEAM 홈페이지 스키마
-- Neon 콘솔의 SQL Editor에 그대로 붙여 넣고 실행하세요.

CREATE TABLE IF NOT EXISTS members (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(50)  NOT NULL,
  role_group  VARCHAR(20)  NOT NULL CHECK (role_group IN ('leader', 'teammate')),
  title       VARCHAR(80)  DEFAULT '',   -- 역할
  bio         TEXT         DEFAULT '',   -- 한 줄 소개
  email       VARCHAR(120) DEFAULT '',
  photo_url   TEXT         DEFAULT '',   -- Vercel Blob URL
  sort_order  INT          DEFAULT 0
);

CREATE TABLE IF NOT EXISTS projects (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  industry    VARCHAR(100) DEFAULT '',   -- 산업
  product     VARCHAR(200) DEFAULT '',   -- 판매 품목
  site_url    TEXT         DEFAULT '',   -- 이동할 주소 (화면 비노출)
  card_image  TEXT         DEFAULT '',   -- Vercel Blob URL
  is_active   BOOLEAN      DEFAULT TRUE,
  sort_order  INT          DEFAULT 0
);

CREATE TABLE IF NOT EXISTS site_settings (
  key   VARCHAR(50) PRIMARY KEY,
  value TEXT DEFAULT ''
);

CREATE INDEX IF NOT EXISTS members_sort_idx  ON members (sort_order);
CREATE INDEX IF NOT EXISTS projects_sort_idx ON projects (sort_order);
