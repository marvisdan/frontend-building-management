import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { deleteAsset } from "../api";
import queryKeys from "../react-query/constants";

import { useDeleteAssetResultType } from "./types";

export default function useDeleteAsset(
  successText: string
): useDeleteAssetResultType {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(deleteAsset, {
    onSuccess: () => {
      enqueueSnackbar(successText);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.assets],
      });
    },
    onError: (error: AxiosError) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });
  return { mutate };
}
