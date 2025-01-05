import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";

import { deleteWorkorder } from "../api";
import { useLocales } from "../locales";
import queryKeys from "../react-query/constants";
import { useDeleteWorkorderResultType } from "./types";

const useDeleteWorkorder = (
  onClose?: VoidFunction
): useDeleteWorkorderResultType => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();

  const { mutate } = useMutation(deleteWorkorder, {
    onSuccess: () => {
      onClose && onClose();
      enqueueSnackbar(translate("workorder.workorder_deleted"));
      queryClient.invalidateQueries({
        queryKey: [queryKeys.workorders],
      });
    },
    onError: (error: AxiosError) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });
  return { mutate };
};

export default useDeleteWorkorder;
