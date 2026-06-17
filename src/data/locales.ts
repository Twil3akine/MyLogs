export const locales = ["ja", "en", "el"] as const;

export type Locale = (typeof locales)[number];

export const localePrefixes = {
  ja: "",
  en: "/en",
  el: "/el",
} satisfies Record<Locale, string>;

export const languageSwitchLocales = ["ja", "en"] as const;

export const fallbackDescriptions = {
  ja: "Twil3akine の競技プログラミング、個人開発、日々の学びを残すログサイトです。",
  en: "Twil3akine's log site for competitive programming, projects, and daily learning.",
  el: "Ο ιστότοπος καταγραφών του Twil3akine για προγραμματισμό, έργα και καθημερινή μάθηση.",
} satisfies Record<Locale, string>;

export function getLocalePrefix(locale: Locale) {
  return localePrefixes[locale];
}

export function shouldShowLanguageSwitch(locale: Locale) {
  return languageSwitchLocales.includes(locale as (typeof languageSwitchLocales)[number]);
}

export function getAlternateLocalePath(pathname: string, locale: Locale) {
  if (locale === "en") {
    return pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  }

  if (locale === "ja") {
    return `/en${pathname === "/" ? "/" : pathname}`;
  }

  return pathname;
}
