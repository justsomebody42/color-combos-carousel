import { useEffect, useState } from "react";
import { ComboCarousel } from "./components/ComboCarousel";
import { generateRandomCombos } from "./utils/generateCombos";
import { applyFaviconFromCombo } from "./utils/favicon";
import type { ColorCombo } from "./types";

const RANDOM_COMBO_COUNT = 10;

export const App: React.FC = () => {
  const [combos, setCombos] = useState<ColorCombo[]>(() => generateRandomCombos(RANDOM_COMBO_COUNT));

  useEffect(() => {
    applyFaviconFromCombo(combos[0]);
  }, [combos]);

  const handleRandomize = () => {
    setCombos(generateRandomCombos(RANDOM_COMBO_COUNT));
  };

  return <ComboCarousel combos={combos} onRandomize={handleRandomize} />;
};
