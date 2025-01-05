import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { fetchOrganizationSites } from "../api";
import queryKeys from "../react-query/constants";
import { OrganizationsListType } from "../types";
import { useFetchOrganizationSiteResult } from "./types";

/**
 * useFetchOrganizationSite is a React hook for fetching organizations sites from a server
 * @return {useFetchOrganizationSiteResult} result - the response from the server containing the organization sites
 */

const useFetchOrganizationSites = (
  token: string | null,
  options?: {
    retry: number;
    enabled: boolean;
    staleTime: number;
  }
): useFetchOrganizationSiteResult => {
  const result = useQuery<OrganizationsListType, AxiosError>(
    [queryKeys.organizationSites, token],
    () => fetchOrganizationSites(token),
    options
  );

  return result;
};

export default useFetchOrganizationSites;
