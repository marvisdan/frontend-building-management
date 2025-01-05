import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";

import { createMetadata } from "../api";
import { useLocales } from "../locales";
import { useCreateAssetResultType } from "./types";

const useCreateMetadata = ({
  path,
}: {
  path?: string;
}): useCreateAssetResultType => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();

  const { mutate, isLoading, isSuccess } = useMutation(createMetadata, {
    onSuccess: () => {
      enqueueSnackbar(translate("asset.form.metadata.metadata_created"));
      path && navigate(path);
    },
    onError: (error: AxiosError) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });
  return { mutate, isLoading, isSuccess };
};

export default useCreateMetadata;
