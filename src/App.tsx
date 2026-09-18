import { useEffect, useState } from "react";
import { ComboCarousel } from "./components/ComboCarousel";
import { ComboGrid } from "./components/ComboGrid";
import { generateRandomCombos } from "./utils/generateCombos";
import { applyFaviconFromCombo } from "./utils/favicon";
import { useFavorites } from "./hooks/useFavorites";
import type { ColorCombo } from "./types";

const RANDOM_COMBO_COUNT = 10;

export const App: React.FC = () => {
  const [randomCombos, setRandomCombos] = useState<ColorCombo[]>(() => generateRandomCombos(RANDOM_COMBO_COUNT));
  const [mode, setMode] = useState<"random" | "favorites">("random");
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");
  const { favorites, isFavorite, toggleFavorite, removeFavorite } = useFavorites();

  const combos = mode === "favorites" ? favorites : randomCombos;

  useEffect(() => {
    if (mode === "favorites" && favorites.length === 0) setMode("random");
  }, [mode, favorites]);

  useEffect(() => {
    if (combos[0]) applyFaviconFromCombo(combos[0]);
  }, [combos]);

  const handleRandomize = () => {
    setMode("random");
    setRandomCombos(generateRandomCombos(RANDOM_COMBO_COUNT));
  };

  const handleToggleViewMode = () => {
    setViewMode((current) => (current === "carousel" ? "grid" : "carousel"));
  };

  const sharedProps = {
    combos,
    mode,
    viewMode,
    onRandomize: handleRandomize,
    onShowFavorites: () => setMode("favorites"),
    hasFavorites: favorites.length > 0,
    isFavorite,
    onToggleFavorite: toggleFavorite,
    onRemoveFavorite: removeFavorite,
    onToggleViewMode: handleToggleViewMode,
  };

  return viewMode === "grid" ? <ComboGrid {...sharedProps} /> : <ComboCarousel {...sharedProps} />;
};
