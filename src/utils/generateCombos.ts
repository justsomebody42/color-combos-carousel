import { colornames } from "color-name-list/bestof";
import { contrastRatio, hexToHueDegrees, hueDistance } from "./color";
import type { ColorCombo, ColorSwatch } from "../types";

const ANALOGOUS_MAX_HUE_DISTANCE = 35;
const COMPLEMENTARY_MIN_HUE_DISTANCE = 130;
const PREFERRED_MIN_CONTRAST = 5;
const FALLBACK_MIN_CONTRAST = 3.5;
const TOP_CANDIDATES_POOL = 12;

type Strategy = "analogous" | "complementary";

const pickRandom = <T,>(items: readonly T[]): T => items[Math.floor(Math.random() * items.length)];

const matchesStrategy = (strategy: Strategy, hueDiff: number): boolean =>
  strategy === "analogous" ? hueDiff <= ANALOGOUS_MAX_HUE_DISTANCE : hueDiff >= COMPLEMENTARY_MIN_HUE_DISTANCE;

const findPartner = (base: ColorSwatch, excludedNames: Set<string>): ColorSwatch | null => {
  const baseHue = hexToHueDegrees(base.value);
  const strategy: Strategy = Math.random() < 0.5 ? "analogous" : "complementary";

  const scored = colornames
    .filter((candidate) => !excludedNames.has(candidate.name) && candidate.hex.toLowerCase() !== base.value.toLowerCase())
    .map((candidate) => ({
      candidate,
      hueDiff: hueDistance(baseHue, hexToHueDegrees(candidate.hex)),
      contrast: contrastRatio(base.value, candidate.hex),
    }));

  const onStrategy = scored
    .filter((entry) => matchesStrategy(strategy, entry.hueDiff) && entry.contrast >= PREFERRED_MIN_CONTRAST)
    .sort((a, b) => b.contrast - a.contrast);

  const pool = onStrategy.length > 0 ? onStrategy : scored.filter((entry) => entry.contrast >= FALLBACK_MIN_CONTRAST).sort((a, b) => b.contrast - a.contrast);

  if (pool.length === 0) return null;

  const picked = pickRandom(pool.slice(0, TOP_CANDIDATES_POOL));
  return { name: picked.candidate.name, value: picked.candidate.hex.toUpperCase() };
};

export const generateRandomCombos = (count: number): ColorCombo[] => {
  const combos: ColorCombo[] = [];
  const usedNames = new Set<string>();

  while (combos.length < count) {
    const baseEntry = pickRandom(colornames);
    if (usedNames.has(baseEntry.name)) continue;

    const base: ColorSwatch = { name: baseEntry.name, value: baseEntry.hex.toUpperCase() };
    const partner = findPartner(base, usedNames);
    if (!partner) continue;

    usedNames.add(base.name);
    usedNames.add(partner.name);
    combos.push({ a: base, b: partner });
  }

  return combos;
};
