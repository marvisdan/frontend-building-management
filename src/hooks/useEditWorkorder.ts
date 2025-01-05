import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import queryKeys from "../react-query/constants";

import { editWorkorder } from "../api";
import { useLocales } from "../locales";
import { useUpdateWorkorderResultType } from "./types";

const useEditWorkorder = (path?: string): useUpdateWorkorderResultType => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { translate } = useLocales();

  const { mutate, isLoading, isSuccess } = useMutation(editWorkorder, {
    onSuccess: () => {
      enqueueSnackbar(translate("workorder.form.label.workorder_updated"));

      queryClient.invalidateQueries({
        queryKey: [queryKeys.workorders],
      });
      path && navigate(path);
    },
    onError: (error: AxiosError) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });
  return { mutate, isLoading, isSuccess };
};

export default useEditWorkorder;
