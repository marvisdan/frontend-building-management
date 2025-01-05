import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { fetchOrganizationContacts } from "../api";
import queryKeys from "../react-query/constants";
import { OrganizationContactListResponseType } from "../types";
import { useFetchOrganizationContactsResultType } from "./types";

const useFetchOrganizationContacts = ({
  token,
  search,
  company,
  limit,
  title,
  options,
}: {
  token: string | null;
  company?: string;
  title?: string;
  search?: string;
  limit?: number | undefined;
  options?: {
    retry: number;
    enabled: boolean;
  };
}): useFetchOrganizationContactsResultType => {
  const result = useQuery<OrganizationContactListResponseType, AxiosError>(
    [queryKeys.organizationContacts, search, company, limit, title],
    () =>
      fetchOrganizationContacts({
        token,
        search,
        company,
        limit,
        title,
      }),
    options
  );

  return result;
};

export default useFetchOrganizationContacts;
