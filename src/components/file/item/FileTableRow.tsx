import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { Box } from "@mui/system";
import { useBoolean, useCopyToClipboard } from "../../../hooks";
import { useLocales } from "../../../locales";
import { fDate } from "../../../utils";
import ConfirmDialog from "../../confirm-dialog";
import FileThumbnail, { fileFormat, fileTypeByUrl } from "../../file-thumbnail";
import Iconify from "../../iconify";
import MenuPopover from "../../menu-popover";
import { useSnackbar } from "../../snackbar";

type Props = {
  row: any;
  selected: boolean;
  hasHeader?: boolean;
  condensed?: boolean;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function FileTableRow({
  row,
  selected,
  hasHeader,
  condensed,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { document_filename: name, updated } = row;
  const format = fileFormat(name);

  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const { copy } = useCopyToClipboard();

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const view = useBoolean();

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleCopy = () => {
    enqueueSnackbar(translate("general_actions.clipboard_copied"));
    copy(row.document);
  };

  return (
    <>
      <TableRow
        sx={{
          borderRadius: 1,
          "& .MuiTableCell-root": {
            bgcolor: "background.default",
          },
        }}
      >
        {hasHeader ? (
          <TableCell
            padding="checkbox"
            sx={{
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
            }}
          >
            <Checkbox
              checked={selected}
              onDoubleClick={() => null}
              onClick={onSelectRow}
            />
          </TableCell>
        ) : null}

        <TableCell>
          {condensed ? (
            <Stack direction="row" alignItems="center" spacing={2}>
              <FileThumbnail file={name ? name.split(".").pop() : "N/A"} />
              <Stack
                direction="column"
                alignItems="flex-start"
                justifyContent="flex-start"
              >
                <Typography noWrap variant="inherit" sx={{ maxWidth: 360 }}>
                  {name ?? "N/A"}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.disabled" }}>
                  {fDate(updated)}
                </Typography>
              </Stack>
            </Stack>
          ) : (
            <Stack direction="row" alignItems="center" spacing={2}>
              <FileThumbnail file={name ? name.split(".").pop() : "N/A"} />
              <Typography noWrap variant="inherit" sx={{ maxWidth: 360 }}>
                {name ?? "N/A"}
              </Typography>
            </Stack>
          )}
        </TableCell>

        <TableCell
          align="center"
          sx={{ color: "text.secondary", whiteSpace: "nowrap" }}
        >
          {name ? name.split(".").pop() : "N/A"}
        </TableCell>

        {!condensed && updated && (
          <TableCell
            align="left"
            sx={{ color: "text.secondary", whiteSpace: "nowrap" }}
          >
            {updated ? fDate(updated) : "N/A"}
          </TableCell>
        )}

        <TableCell
          align="left"
          sx={{
            whiteSpace: "nowrap",
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
          }}
        >
          <IconButton
            color={openPopover ? "inherit" : "default"}
            onClick={handleOpenPopover}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        {format === "image" || format === "pdf" ? (
          <MenuItem
            onClick={() => {
              view.onTrue();
              handleClosePopover();
            }}
          >
            <Iconify icon="solar:eye-bold" />
            {translate("prompt.view")}
          </MenuItem>
        ) : null}

        <MenuItem
          onClick={() => {
            handleClosePopover();
            handleCopy();
          }}
        >
          <Iconify icon="eva:link-2-fill" />
          {translate("prompt.copy_link")}
        </MenuItem>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: "error.main" }}
        >
          <Iconify icon="eva:trash-2-outline" />
          {translate("prompt.title")}
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={translate("prompt.title")}
        content={translate("prompt.message", { value: name })}
        action={
          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={onDeleteRow}
          >
            {translate("modal.prompt.yes")}
          </Button>
        }
      />
      <RenderDocument
        document={row.document}
        filename={row.document_filename}
        view={view}
      />
    </>
  );
}

export const RenderDocument = ({
  view,
  document,
  filename,
}: {
  view: any;
  document: string;
  filename: string;
}) => {
  const { translate } = useLocales();
  const formatType = fileTypeByUrl(filename);

  return (
    <Dialog fullScreen open={view.value}>
      <Box sx={{ height: 1, display: "flex", flexDirection: "column" }}>
        <DialogActions
          sx={{
            p: 1.5,
          }}
        >
          <Button variant="contained" onClick={view.onFalse}>
            {translate("modal.prompt.close")}
          </Button>
        </DialogActions>

        <Box sx={{ flexGrow: 1, height: 1, overflow: "hidden" }}>
          {formatType === "pdf" ? (
            <iframe
              src={document}
              title={filename}
              width="100%"
              height="975px"
            />
          ) : (
            <Box display="flex" alignItems="center" justifyContent="center">
              <Box
                component="img"
                sx={{
                  height: "auto",
                  maxHeight: {
                    md: "auto",
                    sm: "40vw",
                  },
                }}
                src={document}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Dialog>
  );
};
