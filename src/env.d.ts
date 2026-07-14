/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_ADSENSE_CLIENT_ID?: string;
  readonly PUBLIC_ADSENSE_TOC_SLOT?: string;
  readonly PUBLIC_ADSENSE_FOOTER_SLOT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  adsbygoogle: Array<Record<string, never>>;
}
