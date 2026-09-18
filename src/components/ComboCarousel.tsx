import { useEffect, useRef, useState } from "react";
import type { TouchEvent, WheelEvent } from "react";
import { Box, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import GitHubIcon from "@mui/icons-material/GitHub";
import type { ColorCombo } from "../types";
import type { CardTopRightAction } from "./CardTopRightButton";
import { ColorComboCard } from "./ColorComboCard";
import { ComboToolbar } from "./ComboToolbar";

const CARD_WIDTH = "clamp(260px, 32vw, 380px)";
const CARD_STEP_RATIO = 0.62;
const DEPTH_STEP_PX = 160;
const WHEEL_COOLDOWN_MS = 400;
const WHEEL_THRESHOLD = 12;
const SWIPE_THRESHOLD = 40;
const GITHUB_REPO_URL = "https://github.com/justsomebody42/color-combos-carousel";

export const ComboCarousel: React.FC<{
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
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const lastWheelTime = useRef(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    setActiveIndex(0);
  }, [combos]);

  const goToIndex = (index: number) => {
    setActiveIndex(Math.max(0, Math.min(combos.length - 1, index)));
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastWheelTime.current < WHEEL_COOLDOWN_MS) return;
    if (Math.abs(event.deltaY) < WHEEL_THRESHOLD) return;
    lastWheelTime.current = now;
    goToIndex(activeIndex + (event.deltaY > 0 ? 1 : -1));
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (!touchStart.current) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStart.current.x;
    const dy = touch.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;
    goToIndex(activeIndex + (dx < 0 ? 1 : -1));
  };

  return (
    <Box
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        bgcolor: "#000",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 0,
          height: 0,
          perspective: "1800px",
        }}
      >
        {combos.map((combo, index) => {
          const offset = index - activeIndex;
          const distance = Math.abs(offset);
          const scale = Math.max(0.5, 1 - distance * 0.16);
          const opacity = Math.max(0, 1 - distance * 0.35);
          const brightness = Math.max(0.35, 1 - distance * 0.22);
          const topRightAction: CardTopRightAction =
            mode === "favorites"
              ? { type: "remove", onClick: () => onRemoveFavorite(combo) }
              : { type: "favorite", isFavorite: isFavorite(combo), onClick: () => onToggleFavorite(combo) };

          return (
            <Box
              key={`${combo.a.name}-${combo.b.name}`}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: CARD_WIDTH,
                height: "50vh",
                transform: `translate(-50%, -50%) translateX(calc(${offset} * ${CARD_WIDTH} * ${CARD_STEP_RATIO})) translateZ(${-distance * DEPTH_STEP_PX}px) scale(${scale})`,
                filter: `brightness(${brightness})`,
                opacity,
                pointerEvents: distance > 3 ? "none" : "auto",
                zIndex: 100 - distance,
                transition: "transform 0.35s ease, opacity 0.35s ease, filter 0.35s ease",
              }}
            >
              <Box sx={{ width: "100%", height: "100%", cursor: offset === 0 ? "default" : "pointer" }}>
                <ColorComboCard
                  combo={combo}
                  index={index}
                  onClick={() => goToIndex(index)}
                  topRightAction={topRightAction}
                />
              </Box>
            </Box>
          );
        })}
      </Box>

      <ComboToolbar
        mode={mode}
        viewMode={viewMode}
        onRandomize={onRandomize}
        onShowFavorites={onShowFavorites}
        hasFavorites={hasFavorites}
        onToggleViewMode={onToggleViewMode}
      />

      <IconButton
        onClick={() => goToIndex(activeIndex - 1)}
        disabled={activeIndex === 0}
        sx={{
          position: "fixed",
          left: { xs: 12, sm: 24 },
          top: "50%",
          transform: "translateY(-50%)",
          bgcolor: "rgba(255,255,255,0.15)",
          color: "#fff",
          "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
        }}
      >
        <ArrowBackIosNewIcon fontSize="small" />
      </IconButton>
      <IconButton
        onClick={() => goToIndex(activeIndex + 1)}
        disabled={activeIndex === combos.length - 1}
        sx={{
          position: "fixed",
          right: { xs: 12, sm: 24 },
          top: "50%",
          transform: "translateY(-50%)",
          bgcolor: "rgba(255,255,255,0.15)",
          color: "#fff",
          "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
        }}
      >
        <ArrowForwardIosIcon fontSize="small" />
      </IconButton>

      <Box
        sx={{
          position: "fixed",
          bottom: { xs: 16, sm: 32 },
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          {combos.map((_, index) => (
            <Box
              key={index}
              onClick={() => goToIndex(index)}
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: index === activeIndex ? "#fff" : "rgba(255,255,255,0.4)",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
              }}
            />
          ))}
        </Box>
        <Box
          component="a"
          href={GITHUB_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 0.75,
            color: "rgba(255,255,255,0.6)",
            textDecoration: "none",
            fontSize: 13,
            "&:hover": { color: "#fff" },
          }}
        >
          <GitHubIcon fontSize="small" />
          View on GitHub
        </Box>
      </Box>
    </Box>
  );
};
