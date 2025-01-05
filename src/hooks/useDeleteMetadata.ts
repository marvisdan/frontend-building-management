import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";

import { deleteMetadata } from "../api";
import { useLocales } from "../locales";

const useDeleteMetadata = ({ path }: { path?: string }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();

  const { mutate } = useMutation(deleteMetadata, {
    onSuccess: () => {
      enqueueSnackbar(translate("asset.form.metadata.metadata_deleted"));
      path && navigate(path);
    },
    onError: (error: AxiosError) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });
  return { mutate };
};

export default useDeleteMetadata;
