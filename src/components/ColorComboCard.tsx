import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Paper, Typography } from "@mui/material";
import type { ReactNode } from "react";
import type { ColorCombo } from "../types";

const EXTRUSION_DEPTH = 2;
const EXTRUSION_STEP_EM = 0.055;

const buildExtrudedTextShadow = (): string =>
  Array.from(
    { length: EXTRUSION_DEPTH },
    (_, i) =>
      `${(i + 1) * EXTRUSION_STEP_EM}em ${(i + 1) * EXTRUSION_STEP_EM}em 0 rgba(0,0,0,${0.55 - i * 0.02})`,
  ).join(", ");

const ComboNumber: React.FC<{ index: number }> = ({ index }) => (
  <Typography
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      fontFamily: '"Bungee", sans-serif',
      fontSize: "clamp(32px, 7vw, 90px)",
      lineHeight: 1,
      color: "rgba(255,255,255,0.88)",
      WebkitTextStroke: "1.5px rgba(0,0,0,0.18)",
      textShadow: buildExtrudedTextShadow(),
      userSelect: "none",
    }}
  >
    {index + 1}
  </Typography>
);

const HexPill: React.FC<{ label: ReactNode; textColor: string }> = ({
  label,
  textColor,
}) => (
  <Box
    sx={{
      border: "2px solid currentColor",
      borderRadius: 999,
      px: 2,
      py: 0.5,
      color: textColor,
      fontWeight: 600,
      letterSpacing: 0.5,
      whiteSpace: "nowrap",
    }}
  >
    {label}
  </Box>
);

const ColorHalf: React.FC<{
  textColor: string;
  name: string;
  hex: string;
}> = ({ textColor, name, hex }) => (
  <Box
    sx={{
      flex: 1,
      color: textColor,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 2,
      px: 3,
    }}
  >
    <Typography
      variant="h3"
      sx={{
        fontWeight: 800,
        textTransform: "uppercase",
        textAlign: "center",
        letterSpacing: 1,
      }}
    >
      {name}
    </Typography>
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 1.5,
      }}
    >
      <HexPill
        label={
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <span>Hex</span>
            <ArrowForwardIcon fontSize="small" />
          </Box>
        }
        textColor={textColor}
      />
      <HexPill label={hex} textColor={textColor} />
    </Box>
  </Box>
);

export const ColorComboCard: React.FC<{
  combo: ColorCombo;
  index: number;
  onClick?: () => void;
}> = ({ combo, index, onClick }) => (
  <Paper
    onClick={onClick}
    sx={{
      position: "relative",
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      borderRadius: 4,
      overflow: "hidden",
      background: `linear-gradient(${combo.a.value} 50%, ${combo.b.value} 50%)`,
    }}
  >
    <ColorHalf textColor={combo.b.value} name={combo.a.name} hex={combo.a.value} />
    <ColorHalf textColor={combo.a.value} name={combo.b.name} hex={combo.b.value} />
    <ComboNumber index={index} />
  </Paper>
);
