const DEFAULT_CLIENT_ID = "ca-pub-3046724186187909";
const DEFAULT_TOC_SLOT = "6606996283";
const DEFAULT_FOOTER_SLOT = "8630524392";

const clientId = import.meta.env.PUBLIC_ADSENSE_CLIENT_ID ?? DEFAULT_CLIENT_ID;
const tocSlot = import.meta.env.PUBLIC_ADSENSE_TOC_SLOT ?? DEFAULT_TOC_SLOT;
const footerSlot =
  import.meta.env.PUBLIC_ADSENSE_FOOTER_SLOT ?? DEFAULT_FOOTER_SLOT;

const isClientId = (value: string) => /^ca-pub-\d{16}$/.test(value);
export const isAdSenseSlotId = (value: string) => /^\d{10}$/.test(value);

export const adsenseConfig = {
  clientId,
  slots: {
    toc: tocSlot,
    footer: footerSlot,
  },
  enabled: import.meta.env.PROD && isClientId(clientId),
} as const;
