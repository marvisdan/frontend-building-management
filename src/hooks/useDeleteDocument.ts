import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";

import { deleteDocument } from "../api";
import { useLocales } from "../locales";
import queryKeys from "../react-query/constants";

const useDeleteDocument = () => {
  const queryClient = useQueryClient();

  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();

  const { mutate } = useMutation(deleteDocument, {
    onSuccess: () => {
      enqueueSnackbar(translate("asset.form.document.document_deleted"));
      queryClient.invalidateQueries({
        queryKey: [queryKeys.assetsDocuments],
      });
    },
    onError: (error: AxiosError) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });
  return { mutate };
};

export default useDeleteDocument;
