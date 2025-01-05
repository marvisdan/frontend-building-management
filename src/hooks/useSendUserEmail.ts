import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";

import { sendUserEmail } from "../api";
import { useLocales } from "../locales";

export default function useSendUserEmail() {
  //const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const { mutate } = useMutation(sendUserEmail, {
    onSuccess: () => {
      enqueueSnackbar(translate("login.email_sent_success"));
      // navigate(PATH_DASHBOARD.contact.list);
    },
    onError: (error: AxiosError) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });
  return { mutate };
}
