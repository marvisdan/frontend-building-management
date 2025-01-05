import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import queryKeys from "../react-query/constants";

import { updateAsset } from "../api";
import { useLocales } from "../locales";
import { useUpdateAssetResultType } from "./types";

const useUpdateAsset = (path?: string): useUpdateAssetResultType => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { translate } = useLocales();

  const { mutate, isLoading, isSuccess } = useMutation(updateAsset, {
    onSuccess: () => {
      enqueueSnackbar(translate("asset.form.label.asset_updated"));

      queryClient.invalidateQueries({
        queryKey: [queryKeys.assets],
      });
      path && navigate(path);
    },
    onError: (error: AxiosError) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });
  return { mutate, isLoading, isSuccess };
};

export default useUpdateAsset;
