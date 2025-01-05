import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { createAssetOrganizationContact } from "../api";
import { useLocales } from "../locales";
import queryKeys from "../react-query/constants";

export default function useCreateAssetOrganizationContact(): any {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { translate } = useLocales();

  const { mutate } = useMutation(createAssetOrganizationContact, {
    onSuccess: () => {
      enqueueSnackbar(translate("asset.form.contact.contact_created"));
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
