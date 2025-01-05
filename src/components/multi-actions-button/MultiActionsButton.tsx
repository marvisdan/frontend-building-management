import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button } from "@mui/material";

export default function MultiActionsButton({
  onClick,
  label,
}: {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  label: string;
}) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      endIcon={<KeyboardArrowDownIcon />}
    >
      {label}
    </Button>
  );
}
