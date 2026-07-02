# mylogs

[Twil3akine](https://github.com/twil3akine) のプロフィール、技術記事、日々のログを掲載する個人サイトです。

**Website:** [twil3akine.org](https://twil3akine.org)

## Features

- 日本語・英語の2言語対応
- MDXによる記事・ブログ・プロフィール管理
- KaTeXによる数式表示
- ダークモードとレスポンシブデザイン
- 記事のタグ表示、目次、外部リンクカード

## Tech Stack

- [Astro](https://astro.build/) — ページ生成、ルーティング、コンテンツ管理
- [MDX](https://mdxjs.com/) — Markdown内でのコンポーネント利用
- [Svelte](https://svelte.dev/) — テーマ切替などのインタラクティブUI
- [KaTeX](https://katex.org/) — 数式レンダリング
- [Bun](https://bun.sh/) — パッケージ管理とスクリプト実行

## Related Project

### [Ravin Theme](https://ravin-theme.pages.dev)

自作のAstro向けコンポーネント集です。このサイトのデザインやコンポーネントのベースにもなっています。

## Development

### Requirements

- [Bun](https://bun.sh/)
- Node.js 22以上

日本語ページはルート直下、英語ページは `/en/` 以下で公開されます。記事とブログのスキーマは [`src/content.config.ts`](./src/content.config.ts) で定義しています。
