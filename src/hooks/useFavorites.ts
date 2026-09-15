import { useState } from "react";
import type { ColorCombo } from "../types";
import { comboKey, loadFavorites, saveFavorites } from "../utils/favorites";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<ColorCombo[]>(() => loadFavorites());

  const isFavorite = (combo: ColorCombo): boolean =>
    favorites.some((favorite) => comboKey(favorite) === comboKey(combo));

  const toggleFavorite = (combo: ColorCombo): void => {
    const next = isFavorite(combo)
      ? favorites.filter((favorite) => comboKey(favorite) !== comboKey(combo))
      : [...favorites, combo];
    setFavorites(next);
    saveFavorites(next);
  };

  const removeFavorite = (combo: ColorCombo): void => {
    const next = favorites.filter((favorite) => comboKey(favorite) !== comboKey(combo));
    setFavorites(next);
    saveFavorites(next);
  };

  return { favorites, isFavorite, toggleFavorite, removeFavorite };
};
