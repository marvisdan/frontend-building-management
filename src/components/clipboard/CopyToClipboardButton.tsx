import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { IconButton } from "@mui/material";
import { useSnackbar } from "notistack";

import useCopyToClipboard from "../../hooks/useCopyToClipboard";
import { useLocales } from "../../locales";

const CopyToClipboardButton = ({ text }: any) => {
  const { enqueueSnackbar } = useSnackbar();
  const { copy, error } = useCopyToClipboard();
  const { translate } = useLocales();

  const onCopy = (text: string) => {
    if (!text) {
      return;
    }
    if (error) {
      enqueueSnackbar(error);
    }
    enqueueSnackbar(translate("general_actions.clipboard_copied"));
    copy(text);
  };

  return (
    <IconButton onClick={() => onCopy(text)}>
      <ContentCopyOutlinedIcon
        fontSize="small"
        style={{
          color: "text.secondary",
          width: "13.33px",
          height: "13.33px",
        }}
      />
    </IconButton>
  );
};
export default CopyToClipboardButton;
