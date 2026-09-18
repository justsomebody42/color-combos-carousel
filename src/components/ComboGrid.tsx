import { Box } from "@mui/material";
import type { ColorCombo } from "../types";
import type { CardTopRightAction } from "./CardTopRightButton";
import { ColorComboCard } from "./ColorComboCard";
import { ComboToolbar } from "./ComboToolbar";

export const ComboGrid: React.FC<{
  combos: ColorCombo[];
  mode: "random" | "favorites";
  viewMode: "carousel" | "grid";
  onRandomize: () => void;
  onShowFavorites: () => void;
  hasFavorites: boolean;
  isFavorite: (combo: ColorCombo) => boolean;
  onToggleFavorite: (combo: ColorCombo) => void;
  onRemoveFavorite: (combo: ColorCombo) => void;
  onToggleViewMode: () => void;
}> = ({
  combos,
  mode,
  viewMode,
  onRandomize,
  onShowFavorites,
  hasFavorites,
  isFavorite,
  onToggleFavorite,
  onRemoveFavorite,
  onToggleViewMode,
}) => (
  <Box sx={{ width: "100vw", height: "100vh", bgcolor: "#000", overflowY: "auto" }}>
    <ComboToolbar
      mode={mode}
      viewMode={viewMode}
      onRandomize={onRandomize}
      onShowFavorites={onShowFavorites}
      hasFavorites={hasFavorites}
      onToggleViewMode={onToggleViewMode}
    />
    <Box
      sx={{
        p: { xs: 2, sm: 4 },
        pt: { xs: 10, sm: 14 },
        display: "grid",
        gap: 2,
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
      }}
    >
      {combos.map((combo, index) => {
        const topRightAction: CardTopRightAction =
          mode === "favorites"
            ? { type: "remove", onClick: () => onRemoveFavorite(combo) }
            : {
                type: "favorite",
                isFavorite: isFavorite(combo),
                onClick: () => onToggleFavorite(combo),
              };

        return (
          <Box key={`${combo.a.name}-${combo.b.name}`} sx={{ height: 512 }}>
            <ColorComboCard
              combo={combo}
              index={index}
              topRightAction={topRightAction}
            />
          </Box>
        );
      })}
    </Box>
  </Box>
);
