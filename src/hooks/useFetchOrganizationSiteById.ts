import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { fetchOrganizationSiteById } from "../api";
import queryKeys from "../react-query/constants";
import { OrganizationType } from "../types";

export type useFetchOrganizationSiteByIdResult = {
  data: OrganizationType | undefined;
  isLoading: boolean;
  isError: boolean;
  error: AxiosError<unknown, any> | null;
};

const useFetchOrganizationSiteById = (
  token: string | null,
  id?: string
): useFetchOrganizationSiteByIdResult => {
  const result = useQuery<OrganizationType, AxiosError>(
    [queryKeys.organizationSites, id],
    () => fetchOrganizationSiteById(token, id)
  );

  return result;
};

export default useFetchOrganizationSiteById;
