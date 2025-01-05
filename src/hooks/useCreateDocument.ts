import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import queryKeys from "../react-query/constants";

import { createAssetDocument } from "../api";
import { useLocales } from "../locales";

const useCreateDocument = (onCloseModal?: () => void | undefined): any => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { translate } = useLocales();

  const { mutate, isLoading, isSuccess } = useMutation(createAssetDocument, {
    onSuccess: () => {
      enqueueSnackbar(translate("asset.form.document.document_created"));

      queryClient.invalidateQueries({
        queryKey: [queryKeys.assetsDocuments],
      });

      onCloseModal && onCloseModal();
    },
    onError: (error: AxiosError) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });
  return { mutate, isLoading, isSuccess };
};

export default useCreateDocument;
