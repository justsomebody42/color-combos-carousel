import type { ColorCombo } from "../types";

const STORAGE_KEY = "colorCombos.favorites";

export const comboKey = (combo: ColorCombo): string =>
  `${combo.a.value.toUpperCase()}-${combo.b.value.toUpperCase()}`;

export const loadFavorites = (): ColorCombo[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ColorCombo[]) : [];
  } catch {
    return [];
  }
};

export const saveFavorites = (favorites: ColorCombo[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
};
