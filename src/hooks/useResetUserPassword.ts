import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";

import { UseFormReset } from "react-hook-form";
import { resetUserPassword } from "../api";
import { useLocales } from "../locales";

export default function useResetUserPassword({
  reset,
}: {
  reset: UseFormReset<{
    password: string;
    confirmPassword: string;
    oldPassword: string;
  }>;
}) {
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const { mutate } = useMutation(resetUserPassword, {
    onSuccess: () => {
      enqueueSnackbar(translate("Change password success!"));
      reset();
    },
    onError: (error: AxiosError) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });
  return { mutate };
}
