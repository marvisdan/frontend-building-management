import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";

import { updateWorkorderChecklistItemById } from "../api";
import { useLocales } from "../locales";
import queryKeys from "../react-query/constants";

export const useUpdateWorkorderChecklistItemById = (): any => {
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isSuccess } = useMutation(
    updateWorkorderChecklistItemById,
    {
      onSuccess: () => {
        enqueueSnackbar(translate("workorder.checklist_item.updated"));
        queryClient.invalidateQueries({
          queryKey: [queryKeys.workorderChecklistByWorkorderAndAsset],
        });
      },
      onError: (error: AxiosError) => {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    }
  );
  return { mutate, isLoading, isSuccess };
};

export default useUpdateWorkorderChecklistItemById;
