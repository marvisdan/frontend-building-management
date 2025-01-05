import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";

import { deleteSpecification } from "../api";
import { useLocales } from "../locales";

const useDeleteSpecification = ({ path }: { path?: string }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();

  const { mutate } = useMutation(deleteSpecification, {
    onSuccess: () => {
      enqueueSnackbar(translate("asset.form.specification.deleted"));
      path && navigate(path);
    },
    onError: (error: AxiosError) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });
  return { mutate };
};

export default useDeleteSpecification;
