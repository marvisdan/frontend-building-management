import { MenuItem, PopoverOrigin } from "@mui/material";
import { Key } from "react";
import MenuPopover from "../menu-popover/MenuPopover";
import { multiActionsPopoverType } from "./types";

export default function MultiActionsPopover({
  open,
  onClose,
  actions,
  anchorOrigin = {
    vertical: "bottom",
    horizontal: "left",
  },
  transformOrigin = {
    vertical: "top",
    horizontal: "right",
  },
}: {
  open: null | HTMLElement;
  itemId?: string;
  actions: multiActionsPopoverType[];
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
  onClose: () => void;
}) {
  return (
    <MenuPopover
      disabledArrow
      open={open}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      sx={{ px: 1 }}
    >
      {actions.map(({ onClick, label, icon }, index: Key) => (
        <MenuItem onClick={onClick} key={index}>
          {icon}
          {label}
        </MenuItem>
      ))}
    </MenuPopover>
  );
}
