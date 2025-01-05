import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";

import { UseFormReset } from "react-hook-form";
import { createAssetNote } from "../api";
import { useLocales } from "../locales";
import queryKeys from "../react-query/constants";

const useCreateAssetNotes = (
  reset?: UseFormReset<any>
): {
  mutate: UseMutateFunction<any, AxiosError<unknown, any>, any, unknown>;
  isLoading: boolean;
  isSuccess: boolean;
} => {
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isSuccess } = useMutation(createAssetNote, {
    onSuccess: () => {
      enqueueSnackbar(translate("note.note_created"));
      reset && reset();

      queryClient.invalidateQueries({
        queryKey: [queryKeys.assetNote],
      });
    },
    onError: (error: AxiosError) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });
  return { mutate, isLoading, isSuccess };
};

export default useCreateAssetNotes;
