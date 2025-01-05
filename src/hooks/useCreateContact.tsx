import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";

import { createContact } from "../api";
import { useLocales } from "../locales";
import queryKeys from "../react-query/constants";
import { PATH_DASHBOARD } from "../routes/paths";
import { useCreateContactResultType } from "./types";

export default function useCreateContact(): useCreateContactResultType {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const { mutate } = useMutation(createContact, {
    onSuccess: () => {
      enqueueSnackbar(translate("contacts.contact_success"));
      queryClient.invalidateQueries({
        queryKey: [queryKeys.organizationContacts],
      });
      navigate(PATH_DASHBOARD.contact.list);
    },
    onError: (error: AxiosError) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });
  return { mutate };
}
