import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Typography } from "@mui/material";
import { HexPill } from "./HexPill";

export const ColorHalf: React.FC<{
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
