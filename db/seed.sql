-- 초기 데이터. schema.sql 실행 뒤에 한 번만 돌리세요.
-- 비어 있는 칸은 화면에 [ 역할 ] [ 한 줄 소개 ] 같은 자리표시로 나옵니다.

INSERT INTO members (name, role_group, title, bio, email, photo_url, sort_order) VALUES
  ('브루노', 'leader',   '', '', '', '', 1),
  ('조이',   'leader',   '', '', '', '', 2),
  ('쏠',     'leader',   '', '', '', '', 3),
  ('유진',   'leader',   '', '', '', '', 4),
  ('정우',   'teammate', '', '', '', '', 5),
  ('이든',   'teammate', '', '', '', '', 6),
  ('로',     'teammate', '', '', '', '', 7),
  ('막스',   'teammate', '', '', '', '', 8),
  ('비크',   'teammate', '', '', '', '', 9),
  ('겸',     'teammate', '', '', '', '', 10);

-- site_url 에 각 프로젝트 홈페이지 주소를 넣으면 명함 카드가 링크로 살아납니다.
INSERT INTO projects (name, industry, product, site_url, card_image, is_active, sort_order) VALUES
  ('MOODISM',   '', '', '', '', TRUE, 1),
  ('DATA FLOW', '', '', '', '', TRUE, 2),
  ('NOWESA',    '', '', '', '', TRUE, 3),
  ('PLN',       '', '', '', '', TRUE, 4);

INSERT INTO site_settings (key, value) VALUES
  ('team_email',       ''),
  ('intro',            ''),
  ('team_intro',       ''),
  ('projects_intro',   ''),
  ('contact_intro',    ''),
  ('contact_response', ''),
  ('landing_body',     ''),
  ('value_extra',      '')
ON CONFLICT (key) DO NOTHING;
