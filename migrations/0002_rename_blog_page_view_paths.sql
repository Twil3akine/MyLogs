INSERT INTO page_views (path, views)
SELECT
  CASE path
    WHEN '/blog/abc-472-rated/' THEN '/blog/20260823/'
    WHEN '/blog/additional-vocacole-2026-summer/' THEN '/blog/20260902/'
    WHEN '/blog/i-wanna-do/' THEN '/blog/20260819/'
    WHEN '/blog/made-sub-account/' THEN '/blog/20260831/'
    WHEN '/blog/remake-portfolio/' THEN '/blog/20260701/'
    WHEN '/blog/vocacole-2026-summber/' THEN '/blog/20260825/'
    WHEN '/blog/wanna-money/' THEN '/blog/20260711/'
    WHEN '/en/blog/abc-472-rated/' THEN '/en/blog/20260823/'
    WHEN '/en/blog/additional-vocacole-2026-summer/' THEN '/en/blog/20260902/'
    WHEN '/en/blog/i-wanna-do/' THEN '/en/blog/20260819/'
    WHEN '/en/blog/made-sub-account/' THEN '/en/blog/20260831/'
    WHEN '/en/blog/not-pic-diary-2026-07-11/' THEN '/en/blog/20260711/'
    WHEN '/en/blog/remake-portfolio/' THEN '/en/blog/20260701/'
    WHEN '/en/blog/vocacole-2026-summber/' THEN '/en/blog/20260825/'
  END,
  SUM(views)
FROM page_views
WHERE path IN (
  '/blog/abc-472-rated/',
  '/blog/additional-vocacole-2026-summer/',
  '/blog/i-wanna-do/',
  '/blog/made-sub-account/',
  '/blog/remake-portfolio/',
  '/blog/vocacole-2026-summber/',
  '/blog/wanna-money/',
  '/en/blog/abc-472-rated/',
  '/en/blog/additional-vocacole-2026-summer/',
  '/en/blog/i-wanna-do/',
  '/en/blog/made-sub-account/',
  '/en/blog/not-pic-diary-2026-07-11/',
  '/en/blog/remake-portfolio/',
  '/en/blog/vocacole-2026-summber/'
)
GROUP BY path
ON CONFLICT(path) DO UPDATE SET views = page_views.views + excluded.views;

DELETE FROM page_views
WHERE path IN (
  '/blog/abc-472-rated/',
  '/blog/additional-vocacole-2026-summer/',
  '/blog/i-wanna-do/',
  '/blog/made-sub-account/',
  '/blog/remake-portfolio/',
  '/blog/vocacole-2026-summber/',
  '/blog/wanna-money/',
  '/en/blog/abc-472-rated/',
  '/en/blog/additional-vocacole-2026-summer/',
  '/en/blog/i-wanna-do/',
  '/en/blog/made-sub-account/',
  '/en/blog/not-pic-diary-2026-07-11/',
  '/en/blog/remake-portfolio/',
  '/en/blog/vocacole-2026-summber/'
);
