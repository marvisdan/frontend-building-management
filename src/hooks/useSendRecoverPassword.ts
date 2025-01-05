import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";

import { sendRecoverPassword } from "../api";
import { useLocales } from "../locales";
import { PATH_AUTH } from "../routes/paths";

export default function useSendRecoverPassword() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const { mutate } = useMutation(sendRecoverPassword, {
    onSuccess: () => {
      enqueueSnackbar(translate("Change password success!"));
      navigate(PATH_AUTH.passwordChanged);
    },
    onError: (error: AxiosError) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });
  return { mutate };
}
