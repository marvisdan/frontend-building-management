import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import queryKeys from "../react-query/constants";

import { fetchUserbyId } from "../api";
import { AuthUserType } from "../auth/types";
import { useFetchUserByIdResultType } from "./types";

const useFetchUserById = ({
  token,
  id,
}: {
  id: string;
  token: string | null;
}): useFetchUserByIdResultType =>
  useQuery<AuthUserType, AxiosError>([queryKeys.userById], () =>
    fetchUserbyId({ token, id })
  );
export default useFetchUserById;
