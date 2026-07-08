import type { Locale } from "./locales";

interface WorkItem {
  title: string;
  description: string;
  href: string;
  sourceHref?: string;
  period: string;
  category: string;
  featured?: boolean;
}

interface WorkSection {
  title: string;
  description: string;
  items: WorkItem[];
}

interface WorksContent {
  title: string;
  description: string;
  lead: string;
  sections: WorkSection[];
}

export const worksContent = {
  ja: {
    title: "Works",
    description: "公開している制作物、活動、競技プログラミングまわりの実績をまとめています。",
    lead: "作ったもの、運営しているもの、競プロでやってきたことをあとから見返せる形で残します。",
    sections: [
      {
        title: "制作物",
        description: "Web、デスクトップアプリ、Rust製ツールなど。表に出せるものから順に置いています。",
        items: [
          {
            title: "AtCoder Random Picker",
            description:
              "AtCoderの問題をDiff範囲で絞り、ランダムに提示する精進支援サービスです。RustのバックエンドとSvelteのフロントエンドで作っています。",
            href: "https://rp.twil3akine.org",
            sourceHref: "https://github.com/Twil3akine/atcoder-random-picker",
            period: "2025 -",
            category: "Web Service",
            featured: true,
          },
          {
            title: "Ravin Theme",
            description:
              "ブログ、ドキュメント、ポートフォリオ向けのAstro/Svelteテーマです。MDXコンポーネント、検索、ダークモード、SEO周りをひと通り揃えています。",
            href: "http://ravin-theme.pages.dev",
            sourceHref: "https://github.com/Twil3akine/Ravin",
            period: "2026",
            category: "Theme",
            featured: true,
          },
          {
            title: "MyLogs",
            description:
              "このサイトです。プロフィール、技術記事、日々のログを置くためにAstroで作り直しました。競プロ、開発、学んだことをあとから読める形で残します。",
            href: "https://twil3akine.org",
            sourceHref: "https://github.com/Twil3akine/MyLogs",
            period: "2024 -",
            category: "Portfolio",
          },
        ],
      },
      {
        title: "活動",
        description: "競技プログラミングと、その周辺で続けていることです。",
        items: [
          {
            title: "WCPC",
            description:
              "和歌山大学公認競技プログラミングサークルです。2024年12月から活動しており、AtCoderやオンサイトコンテストへの参加を中心に動いています。",
            href: "https://wcpc.pages.dev",
            period: "2024 -",
            category: "Community",
            featured: true,
          },
          {
            title: "AtCoder Heuristic",
            description:
              "短期より長期、アルゴリズムよりヒューリスティックが好きです。2026年7月時点でHeuristic Ratingは1600台に乗っています。",
            href: "https://atcoder.jp/users/twil3?contestType=heuristic",
            sourceHref: "https://github.com/Twil3akine/AtCoder-Heu",
            period: "2024 -",
            category: "Contest",
          },
          {
            title: "ICPC 2026 国内予選",
            description:
              "チームWaSanBonで参加しました。悔しさごと記事に残しているので、来年に向けて見返せるログです。",
            href: "/article/icpc2026/",
            period: "2026",
            category: "Contest",
          },
        ],
      },
      {
        title: "Rust crates / CLI",
        description: "小さめですが、crates.ioまで出しているものです。",
        items: [
          {
            title: "sakd",
            description:
              "Rustで作ったタスク管理CLIです。毎日の作業を雑に投げ込むだけではなく、依存関係や順番を意識して整理できるように試しています。",
            href: "https://crates.io/crates/sakd",
            sourceHref: "https://github.com/Twil3akine/sakd",
            period: "2026",
            category: "CLI",
          },
          {
            title: "gut-cli",
            description:
              "gitのタイプミスに反応する小さなRust CLIです。勢いで作ったものですが、crates.ioに公開しています。",
            href: "https://crates.io/crates/gut-cli",
            sourceHref: "https://github.com/Twil3akine/gut-cli",
            period: "2026",
            category: "CLI",
          },
        ],
      },
    ],
  },
  en: {
    title: "Works",
    description: "A collection of projects, activities, and competitive programming work I can show publicly.",
    lead: "Projects I built, communities I run, and competitive programming logs worth keeping in one place.",
    sections: [
      {
        title: "Projects",
        description: "Web apps, desktop tools, and Rust projects that are public enough to point people to.",
        items: [
          {
            title: "AtCoder Random Picker",
            description:
              "A practice helper that randomly picks AtCoder problems from a selected difficulty range. It uses a Rust backend and a Svelte frontend.",
            href: "https://rp.twil3akine.org",
            sourceHref: "https://github.com/Twil3akine/atcoder-random-picker",
            period: "2025 -",
            category: "Web Service",
            featured: true,
          },
          {
            title: "Ravin Theme",
            description:
              "An Astro/Svelte theme for blogs, documentation, and portfolios, with MDX components, search, dark mode, and SEO support.",
            href: "http://ravin-theme.pages.dev",
            sourceHref: "https://github.com/Twil3akine/Ravin",
            period: "2026",
            category: "Theme",
            featured: true,
          },
          {
            title: "MyLogs",
            description:
              "This site. I rebuilt it with Astro to keep my profile, technical articles, and daily logs readable over time.",
            href: "https://twil3akine.org",
            sourceHref: "https://github.com/Twil3akine/MyLogs",
            period: "2024 -",
            category: "Portfolio",
          },
        ],
      },
      {
        title: "Activities",
        description: "Competitive programming and the surrounding things I keep doing.",
        items: [
          {
            title: "WCPC",
            description:
              "An official competitive programming circle at Wakayama University. It started in December 2024 and focuses on AtCoder and onsite contests.",
            href: "https://wcpc.pages.dev",
            period: "2024 -",
            category: "Community",
            featured: true,
          },
          {
            title: "AtCoder Heuristic",
            description:
              "I prefer long-form heuristic contests over short algorithm rounds. As of July 2026, my Heuristic Rating is in the 1600 range.",
            href: "https://atcoder.jp/users/twil3?contestType=heuristic",
            sourceHref: "https://github.com/Twil3akine/AtCoder-Heu",
            period: "2024 -",
            category: "Contest",
          },
          {
            title: "ICPC 2026 Domestic Qualifiers",
            description:
              "I participated as part of team WaSanBon and kept the result and regrets as a log for next year.",
            href: "/en/article/icpc2026/",
            period: "2026",
            category: "Contest",
          },
        ],
      },
      {
        title: "Rust crates / CLI",
        description: "Small projects, but they are published on crates.io.",
        items: [
          {
            title: "sakd",
            description:
              "A Rust task-management CLI for organizing daily work with a little more structure than a plain memo, including dependencies and ordering.",
            href: "https://crates.io/crates/sakd",
            sourceHref: "https://github.com/Twil3akine/sakd",
            period: "2026",
            category: "CLI",
          },
          {
            title: "gut-cli",
            description:
              "A tiny Rust CLI that reacts to git typos. It is a small joke project, but it is published on crates.io.",
            href: "https://crates.io/crates/gut-cli",
            sourceHref: "https://github.com/Twil3akine/gut-cli",
            period: "2026",
            category: "CLI",
          },
        ],
      },
    ],
  },
} satisfies Record<Locale, WorksContent>;
