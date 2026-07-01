export const locales = ["ja", "en"] as const;

export type Locale = (typeof locales)[number];

export const localePrefixes = {
  ja: "",
  en: "/en",
} satisfies Record<Locale, string>;

export const languageSwitchLocales = ["ja", "en"] as const;

export const fallbackDescriptions = {
  ja: "Twil3akine の競技プログラミング、個人開発、日々の学びを残すログサイトです。",
  en: "Twil3akine's log site for competitive programming, projects, and daily learning.",
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

  return `/en${pathname === "/" ? "/" : pathname}`;
}
