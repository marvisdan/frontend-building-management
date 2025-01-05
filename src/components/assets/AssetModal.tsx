import { ReactNode, useState } from "react";
// @mui
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useLocales } from "../../locales";
import ConfirmDialog from "../confirm-dialog";
import { defaultValues } from "./schemas/asset";

export default function AssetModal({
  onClose,
  open,
  children,
  onSubmit,
  isSubmitting,
}: {
  onClose: () => void;
  open: boolean;
  children: ReactNode;
  onSubmit: (onClose?: any) => void;
  isSubmitting: boolean;
}) {
  const { translate } = useLocales();
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const {
    reset,
    getValues,
    formState: { dirtyFields },
  } = useFormContext();

  const handleOpenConfirm = () => {
    const isDirtyFields = Boolean(Object.keys(dirtyFields).length);
    const isThumbnail = Boolean(getValues("thumbnail"));

    if (!isDirtyFields && !isThumbnail) {
      onClose();
      return;
    }
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <Dialog open={open} onClose={handleOpenConfirm}>
      <DialogTitle>{translate("asset.modal.title")}</DialogTitle>
      <DialogContent>
        <DialogContentText variant="body2">
          {translate("asset.form.subtitle.mandatory")}
        </DialogContentText>
        <Alert severity="info" sx={{ mt: 1, py: 0.25 }}>
          {translate("asset.form.info_text")}
        </Alert>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOpenConfirm} color="inherit">
          {translate("asset.form.label.cancel_creation")}
        </Button>
        <LoadingButton
          variant="contained"
          loading={isSubmitting}
          onClick={handleSubmit}
        >
          {translate("asset.actions.create")}
        </LoadingButton>
      </DialogActions>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={translate("modal.prompt.title")}
        content={translate("modal.prompt.message")}
        action={
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={() => {
              reset(defaultValues);
              setOpenConfirm(false);
              onClose();
            }}
          >
            {translate("modal.prompt.yes")}
          </Button>
        }
      />
    </Dialog>
  );
}
