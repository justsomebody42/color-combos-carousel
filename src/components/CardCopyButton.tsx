import { useState } from "react";
import type { MouseEvent } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton } from "@mui/material";
import type { ColorCombo } from "../types";

const COPIED_FEEDBACK_MS = 1500;

export const CardCopyButton: React.FC<{ combo: ColorCombo }> = ({ combo }) => {
  const [copied, setCopied] = useState(false);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    navigator.clipboard.writeText(`${combo.a.value}, ${combo.b.value}`);
    setCopied(true);
    setTimeout(() => setCopied(false), COPIED_FEEDBACK_MS);
  };

  return (
    <IconButton
      onClick={handleClick}
      sx={{
        color: "#fff",
        bgcolor: "rgba(0,0,0,0.25)",
        "&:hover": { bgcolor: "rgba(0,0,0,0.4)" },
      }}
    >
      {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
    </IconButton>
  );
};
