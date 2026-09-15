import { Typography } from "@mui/material";

const EXTRUSION_DEPTH = 2;
const EXTRUSION_STEP_EM = 0.055;

const buildExtrudedTextShadow = (): string =>
  Array.from(
    { length: EXTRUSION_DEPTH },
    (_, i) =>
      `${(i + 1) * EXTRUSION_STEP_EM}em ${(i + 1) * EXTRUSION_STEP_EM}em 0 rgba(0,0,0,${0.55 - i * 0.02})`,
  ).join(", ");

export const ComboNumber: React.FC<{ index: number }> = ({ index }) => (
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
