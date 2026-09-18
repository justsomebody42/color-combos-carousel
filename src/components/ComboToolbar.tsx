import { Box, Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import ViewModuleIcon from "@mui/icons-material/ViewModule";

const toolbarButtonSx = (active: boolean) => ({
  bgcolor: active ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.15)",
  color: "#fff",
  backdropFilter: "blur(6px)",
  textTransform: "none",
  "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
});

export const ComboToolbar: React.FC<{
  mode: "random" | "favorites";
  viewMode: "carousel" | "grid";
  onRandomize: () => void;
  onShowFavorites: () => void;
  hasFavorites: boolean;
  onToggleViewMode: () => void;
}> = ({ mode, viewMode, onRandomize, onShowFavorites, hasFavorites, onToggleViewMode }) => (
  <Box
    sx={{
      position: "fixed",
      top: { xs: 16, sm: 32 },
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      flexDirection: "row",
      gap: 1.5,
      zIndex: 200,
    }}
  >
    <Button onClick={onRandomize} startIcon={<ShuffleIcon />} variant="contained" sx={toolbarButtonSx(mode === "random")}>
      Randomize
    </Button>
    {hasFavorites && (
      <Button onClick={onShowFavorites} startIcon={<FavoriteIcon />} variant="contained" sx={toolbarButtonSx(mode === "favorites")}>
        Favorites
      </Button>
    )}
    <Button
      onClick={onToggleViewMode}
      startIcon={viewMode === "carousel" ? <ViewModuleIcon /> : <ViewCarouselIcon />}
      variant="contained"
      sx={toolbarButtonSx(false)}
    >
      {viewMode === "carousel" ? "Show as grid" : "Show as carousel"}
    </Button>
  </Box>
);
