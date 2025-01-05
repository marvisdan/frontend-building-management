import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import queryKeys from "../react-query/constants";

import { createWorkorder } from "../api";
import { useLocales } from "../locales";
import { useCreateWorkorderResultType } from "./types";

const useCreateWorkOrder = (path?: string): useCreateWorkorderResultType => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { translate } = useLocales();

  const { mutate, isLoading, isSuccess } = useMutation(createWorkorder, {
    onSuccess: () => {
      enqueueSnackbar(translate("workorder.form.label.workorder_created"));

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

export default useCreateWorkOrder;
