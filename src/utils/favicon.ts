import type { ColorCombo } from "../types";

const FAVICON_SIZE = 64;
const FAVICON_ELEMENT_ID = "app-favicon";

const buildFaviconSvg = (combo: ColorCombo): string =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${FAVICON_SIZE}" height="${FAVICON_SIZE}" viewBox="0 0 ${FAVICON_SIZE} ${FAVICON_SIZE}">` +
  `<defs><clipPath id="rounded"><rect width="${FAVICON_SIZE}" height="${FAVICON_SIZE}" rx="14" /></clipPath></defs>` +
  `<g clip-path="url(#rounded)">` +
  `<rect width="${FAVICON_SIZE}" height="${FAVICON_SIZE / 2}" fill="${combo.a.value}" />` +
  `<rect y="${FAVICON_SIZE / 2}" width="${FAVICON_SIZE}" height="${FAVICON_SIZE / 2}" fill="${combo.b.value}" />` +
  `</g></svg>`;

export const applyFaviconFromCombo = (combo: ColorCombo): void => {
  const href = `data:image/svg+xml,${encodeURIComponent(buildFaviconSvg(combo))}`;
  const link = document.getElementById(FAVICON_ELEMENT_ID) as HTMLLinkElement | null;
  if (link) link.href = href;
};
