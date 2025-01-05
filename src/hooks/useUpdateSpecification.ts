import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";

import { updateSpecification } from "../api";
import { useLocales } from "../locales";

const useUpdateSpecification = ({ path }: { path?: string }): any => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();

  const { mutate, isLoading, isSuccess } = useMutation(updateSpecification, {
    onSuccess: () => {
      enqueueSnackbar(translate("asset.form.specification.updated"));
      path && navigate(path);
    },
    onError: (error: AxiosError) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });
  return { mutate, isLoading, isSuccess };
};

export default useUpdateSpecification;
