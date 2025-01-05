import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { fetchOrganization } from "../api";
import queryKeys from "../react-query/constants";
import { OrganizationsListType } from "../types";

export type useFetchOrganizationResult = {
  data: any | undefined;
  isLoading: boolean;
  isError: boolean;
  error: AxiosError<unknown, any> | null;
};

//Note: For the moment, an User is supposed to have only one organization
const useFetchOrganization = (
  token: string | null
): useFetchOrganizationResult => {
  const result = useQuery<OrganizationsListType, AxiosError>(
    [queryKeys.organization],
    () => fetchOrganization(token)
  );

  return result;
};

export default useFetchOrganization;
