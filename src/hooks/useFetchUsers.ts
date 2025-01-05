import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { fetchUsers } from "../api";
import queryKeys from "../react-query/constants";
import { UsersResponseType } from "../types";
import { useFetchUsersResultType } from "./types";

const useFetchUsers = ({
  options,
  limit,
}: {
  limit?: number;
  options?: {
    retry: number;
    enabled: boolean;
  };
}): useFetchUsersResultType => {
  const result = useQuery<UsersResponseType, AxiosError>(
    [queryKeys.users],
    () =>
      fetchUsers({
        limit,
      }),
    options
  );

  return result;
};

export default useFetchUsers;
