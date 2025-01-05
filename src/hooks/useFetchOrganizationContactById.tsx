import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { fetchOrganizationContactById } from "../api";
import queryKeys from "../react-query/constants";
import { OrganizationContactListType } from "../types";
import { useFetchOrganizationContactByIdResultType } from "./types";

const useFetchOrganizationContactById = (
  id: number
): useFetchOrganizationContactByIdResultType => {
  const results = useQuery<OrganizationContactListType, AxiosError>(
    [queryKeys.organizationContacts, id],
    () => fetchOrganizationContactById(id)
  );

  return results;
};

export default useFetchOrganizationContactById;
