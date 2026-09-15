import { Box } from "@mui/material";
import type { ReactNode } from "react";

export const HexPill: React.FC<{ label: ReactNode; textColor: string }> = ({ label, textColor }) => (
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
