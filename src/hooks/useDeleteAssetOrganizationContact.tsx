import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { deleteAssetOrganizationContact } from "../api";
import { useLocales } from "../locales";
import queryKeys from "../react-query/constants";
import { useDeleteAssetOrganizationContactResultType } from "./types";

export default function useDeleteAssetOrganizationContact(): useDeleteAssetOrganizationContactResultType {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { translate } = useLocales();

  const { mutate } = useMutation(deleteAssetOrganizationContact, {
    onSuccess: () => {
      enqueueSnackbar(translate("contacts.contact_removed"));
      queryClient.invalidateQueries({
        queryKey: [queryKeys.assetOrganizationContacts],
      });
    },
    onError: (error: AxiosError) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });
  return { mutate };
}
