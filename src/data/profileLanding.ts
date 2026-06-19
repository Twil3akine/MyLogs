import type { Locale } from "./locales";

interface ProfileSection {
  label: string;
  title: string;
  description: string;
  href: string;
}

interface ProfileLandingContent {
  ariaLabel: string;
  avatarAlt: string;
  bio: string;
  locationLabel: string;
  location: string;
  affiliationLabel: string;
  affiliation: string;
  researchLabel: string;
  research: string;
  sections: ProfileSection[];
}

export const profileLanding = {
  ja: {
    ariaLabel: "プロフィール",
    avatarAlt: "Twil3akine のプロフィール画像",
    bio: "毎日を貪欲に",
    locationLabel: "出身",
    location: "大阪",
    affiliationLabel: "所属",
    affiliation: "和歌山大学",
    researchLabel: "研究内容",
    research: "CP-SAT / Scheduling",
    sections: [
      {
        label: "Profile",
        title: "私について",
        description: "所属や関心、普段触っているものをまとめてます。",
        href: "/profile",
      },
      {
        label: "Article",
        title: "技術記事",
        description: "競プロ、開発、学んだことをあとから読める形で残します。",
        href: "/article",
      },
      {
        label: "Blog",
        title: "日々のログ",
        description: "その時に思ったことを包み隠さずに書きます。",
        href: "/blog",
      },
    ],
  },
  en: {
    ariaLabel: "Profile",
    avatarAlt: "Profile image of Twil3akine",
    bio: "Stay greedy every day.",
    locationLabel: "Location",
    location: "Osaka, Japan",
    affiliationLabel: "Affiliation",
    affiliation: "Wakayama Univ.",
    researchLabel: "Research",
    research: "CP-SAT / Scheduling",
    sections: [
      {
        label: "Profile",
        title: "About me",
        description: "A short overview of my affiliation, interests, and tools I use.",
        href: "/en/about",
      },
      {
        label: "Article",
        title: "Technical articles",
        description: "Longer notes about programming, development, and things I learned.",
        href: "/en/article",
      },
      {
        label: "Blog",
        title: "Daily logs",
        description: "Honest notes about what I was thinking at the time.",
        href: "/en/blog",
      },
    ],
  },
  el: {
    ariaLabel: "Προφίλ",
    avatarAlt: "Εικόνα προφίλ του Twil3akine",
    bio: "Άπληστα, κάθε μέρα.",
    locationLabel: "Τοποθεσία",
    location: "Οσάκα, Ιαπωνία",
    affiliationLabel: "Ίδρυμα",
    affiliation: "Παν. Wakayama",
    researchLabel: "Έρευνα",
    research: "CP-SAT / Scheduling",
    sections: [
      {
        label: "Profile",
        title: "Σχετικά με εμένα",
        description:
          "Μια σύντομη σύνοψη για το υπόβαθρο, τα ενδιαφέροντα και τα εργαλεία μου.",
        href: "/el/about",
      },
      {
        label: "Article",
        title: "Τεχνικά άρθρα",
        description:
          "Μεγαλύτερες σημειώσεις για προγραμματισμό, ανάπτυξη και όσα μαθαίνω.",
        href: "/el/article",
      },
      {
        label: "Blog",
        title: "Καθημερινά logs",
        description:
          "Ειλικρινείς σημειώσεις για όσα σκεφτόμουν εκείνη τη στιγμή.",
        href: "/el/blog",
      },
    ],
  },
} satisfies Record<Locale, ProfileLandingContent>;
