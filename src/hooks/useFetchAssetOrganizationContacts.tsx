import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { fetchAssetOrganizationContacts } from "../api";
import queryKeys from "../react-query/constants";
import { AssetOrganizationContactListType } from "../types";

const useFetchAssetOrganizationContacts = ({
  assetId,
  limit,
}: {
  assetId: number;
  limit?: number | undefined;
}): any => {
  const result = useQuery<AssetOrganizationContactListType, AxiosError>(
    [queryKeys.assetOrganizationContacts, limit],
    () => fetchAssetOrganizationContacts({ assetId, limit })
  );

  return result;
};

export default useFetchAssetOrganizationContacts;
