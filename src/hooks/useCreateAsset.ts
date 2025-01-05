import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { UseFormReset } from "react-hook-form";
import { useNavigate } from "react-router";
import queryKeys from "../react-query/constants";

import { createAsset } from "../api";
import { useLocales } from "../locales";
import { useCreateAssetResultType } from "./types";

const useCreateAsset = (
  onCloseModal?: () => void | undefined,
  path?: string,
  reset?: UseFormReset<any>
): useCreateAssetResultType => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { translate } = useLocales();

  const { mutate, isLoading, isSuccess } = useMutation(createAsset, {
    onSuccess: () => {
      enqueueSnackbar(translate("asset.form.label.asset_created"));

      queryClient.invalidateQueries({
        queryKey: [queryKeys.assets],
      });

      reset && reset();
      path && navigate(path);
      onCloseModal && onCloseModal();
    },
    onError: (error: AxiosError) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });
  return { mutate, isLoading, isSuccess };
};

export default useCreateAsset;
