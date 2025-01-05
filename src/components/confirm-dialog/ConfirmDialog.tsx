import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { useLocales } from "../../locales";
import { ConfirmDialogProps } from "./types";

export default function ConfirmDialog({
  title,
  content,
  action,
  open,
  onClose,
  cancelText,
  maxWidth = "xs",
  ...other
}: ConfirmDialogProps) {
  const { translate } = useLocales();
  return (
    <Dialog
      fullWidth
      maxWidth={maxWidth}
      open={open}
      onClose={onClose}
      {...other}
    >
      <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>

      {content && (
        <DialogContent sx={{ typography: "body2" }}> {content} </DialogContent>
      )}

      <DialogActions>
        <Button fullWidth variant="outlined" color="inherit" onClick={onClose}>
          {cancelText || translate("modal.prompt.no")}
        </Button>
        {action}
      </DialogActions>
    </Dialog>
  );
}
