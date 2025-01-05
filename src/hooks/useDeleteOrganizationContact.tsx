import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { deleteOrganizationContact } from "../api";
import { useLocales } from "../locales";
import queryKeys from "../react-query/constants";
import { useDeleteOrganizationContactResultType } from "./types";

export default function useDeleteOrganizationContact(): useDeleteOrganizationContactResultType {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { translate } = useLocales();

  const { mutate } = useMutation(deleteOrganizationContact, {
    onSuccess: () => {
      enqueueSnackbar(translate("contacts.contact_removed"));
      queryClient.invalidateQueries({
        queryKey: [queryKeys.organizationContacts],
      });
    },
    onError: (error: AxiosError) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });
  return { mutate };
}
