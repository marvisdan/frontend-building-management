import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { fetchSpecifications } from "../api";
import queryKeys from "../react-query/constants";
import { SpecificationsType } from "../types";
import { useFetchSpecificationsResultType } from "./types";

const useFetchSpecifications = (
  offset?: number,
  limit?: number
): useFetchSpecificationsResultType => {
  const result = useQuery<SpecificationsType[], AxiosError>(
    [queryKeys.specifications],
    () => fetchSpecifications(offset, limit)
  );

  return result;
};

export default useFetchSpecifications;
