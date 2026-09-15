import { Paper } from "@mui/material";
import type { ColorCombo } from "../types";
import { CardTopRightButton } from "./CardTopRightButton";
import type { CardTopRightAction } from "./CardTopRightButton";
import { ColorHalf } from "./ColorHalf";
import { ComboNumber } from "./ComboNumber";

export const ColorComboCard: React.FC<{
  combo: ColorCombo;
  index: number;
  onClick?: () => void;
  topRightAction?: CardTopRightAction;
}> = ({ combo, index, onClick, topRightAction }) => (
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
    {topRightAction && <CardTopRightButton action={topRightAction} />}
  </Paper>
);
