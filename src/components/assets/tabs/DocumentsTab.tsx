import { Box, Button, Dialog, DialogActions } from "@mui/material";

import { useLocales } from "../../../locales";
import DocumentTab from "../../../sections/dashboard/buildings/assets/edit/DocumentTab";
import { fileTypeByUrl } from "../../file-thumbnail";

export default function DocumentsTab() {
  return <DocumentTab isListonly isCondensed />;
}

export const DocumentModal = ({
  view,
  documentId,
  modalId,
  document,
  filename,
}: {
  view: any;
  documentId: number;
  modalId: number | null;
  document: string;
  filename: string;
}) => {
  const { translate } = useLocales();
  const formatType = fileTypeByUrl(filename);

  return (
    <Dialog fullScreen open={view.valuem && documentId === modalId}>
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
