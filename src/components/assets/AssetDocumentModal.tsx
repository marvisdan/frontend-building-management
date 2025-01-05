import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
} from "@mui/material";
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";

import { useParams } from "react-router";
import { useCreateDocument } from "../../hooks";
import { useLocales } from "../../locales";
import { CustomFile } from "../../types";
import { convertToBase64 } from "../../utils";
import Iconify from "../iconify";
import { Upload } from "../upload";

interface Props extends DialogProps {
  title?: string;
  onCreate?: VoidFunction;
  onUpdate?: VoidFunction;

  //
  folderName?: string;
  onChangeFolderName?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  //
  open: boolean;
  onClose: VoidFunction;
}

export default function AssetDocumentModal({
  title = "Upload Files",
  open,
  onClose,
  //
  onCreate,
  onUpdate,
  //
  folderName,
  onChangeFolderName,
  ...other
}: Props) {
  const { id } = useParams();
  const [files, setFiles] = useState<CustomFile[]>([]);

  useEffect(() => {
    if (!open) {
      setFiles([]);
    }
  }, [open]);

  const handleDrop = useCallback(
    async (acceptedFiles: CustomFile[]) => {
      const newFiles = acceptedFiles.map((file: CustomFile) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setFiles([...files, ...newFiles]);
    },
    [files]
  );

  const handleRemoveFile = (inputFile: CustomFile | string) => {
    const filtered = files.filter((file) => file !== inputFile);
    setFiles(filtered);
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };
  const { translate } = useLocales();
  const { mutate } = useCreateDocument();

  const handleUpload =
    (
      mutate: UseMutateFunction<any, AxiosError<unknown, any>, any, unknown>,
      onClose?: () => void
    ) =>
    (files: CustomFile[], id: number) => {
      files.forEach(async (file: CustomFile) => {
        const base64 = file && (await convertToBase64(file));
        mutate({
          assetId: id,
          document: base64,
          documentFileName: file.path,
        });
      });

      onClose && onClose();
    };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}>
        {translate(title)}
      </DialogTitle>

      <DialogContent dividers sx={{ pt: 1, pb: 0, border: "none" }}>
        <Upload
          multiple
          maxSize={11457280}
          files={files}
          onDrop={handleDrop}
          onRemove={handleRemoveFile}
        />
      </DialogContent>

      <DialogActions>
        <LoadingButton
          onClick={() => handleUpload(mutate, onClose)(files, Number(id))}
          variant="contained"
          startIcon={<Iconify icon="eva:cloud-upload-fill" />}
        >
          {translate("asset.form.document.modal.upload")}
        </LoadingButton>

        {!!files.length && (
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleRemoveAllFiles}
          >
            {translate("asset.form.document.modal.remove_all")}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
