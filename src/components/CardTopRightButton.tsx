import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@mui/material";
import type { MouseEvent } from "react";

export type CardTopRightAction =
  | { type: "favorite"; isFavorite: boolean; onClick: () => void }
  | { type: "remove"; onClick: () => void };

export const CardTopRightButton: React.FC<{ action: CardTopRightAction }> = ({ action }) => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    action.onClick();
  };

  return (
    <IconButton
      onClick={handleClick}
      sx={{
        position: "absolute",
        top: 8,
        right: 8,
        zIndex: 1,
        color: "#fff",
        bgcolor: "rgba(0,0,0,0.25)",
        "&:hover": { bgcolor: "rgba(0,0,0,0.4)" },
      }}
    >
      {action.type === "remove" ? (
        <DeleteOutlineIcon />
      ) : action.isFavorite ? (
        <FavoriteIcon sx={{ color: "#ff3d6e" }} />
      ) : (
        <FavoriteBorderIcon />
      )}
    </IconButton>
  );
};
