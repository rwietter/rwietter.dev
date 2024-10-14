export const langs = [
  "en",
  "pt",
] as const;

export type Langs = typeof langs[number];
