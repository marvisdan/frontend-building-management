import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";

import { UseFormReset } from "react-hook-form";
import { createWorkorderNote } from "../api";
import { useLocales } from "../locales";
import queryKeys from "../react-query/constants";
import { CreateAssetNoteType } from "../types";

const useCreateWorkorderNote = (
  reset?: UseFormReset<CreateAssetNoteType>
): any => {
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isSuccess } = useMutation(createWorkorderNote, {
    onSuccess: () => {
      enqueueSnackbar(translate("note.note_created"));
      reset && reset();

      queryClient.invalidateQueries({
        queryKey: [queryKeys.workorderNote],
      });
    },
    onError: (error: AxiosError) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });
  return { mutate, isLoading, isSuccess };
};

export default useCreateWorkorderNote;
