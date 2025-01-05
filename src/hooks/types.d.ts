import {
  AssetCategoriesResponseType,
  AssetOrganizationContactType,
  AssetResponseType,
  AssetType,
  AssetTypesResponseType,
  MeasurementUnitsResponseType,
  SpecificationsResponseType,
  UsersResponseType,
  WorkorderPriorityType,
} from "../types";

export type useFetchOrganizationSiteResult = UseQueryResult<
  OrganizationsListType | undefined,
  AxiosError<unknown, any>
>;

export type useInfiniteAssetsResultType = UseInfiniteQueryResult<
  AssetResponseType,
  AxiosError<unknown, any>
>;

export type useCreateAssetResultType = {
  mutate: UseMutateFunction<AssetType, AxiosError<unknown, any>, void, unknown>;
  isLoading: boolean;
  isSuccess: boolean;
};

export type useCreateWorkorderResultType = {
  mutate: UseMutateFunction<AssetType, AxiosError<unknown, any>, void, unknown>;
  isLoading: boolean;
  isSuccess: boolean;
};

export type useUpdateAssetResultType = useCreateAssetResultType;
export type useUpdateWorkorderResultType = useCreateWorkorderResultType;
export type useFetchAssetsResultType = UseQueryResult<
  AssetResponseType,
  AxiosError<unknown, any>
>;

export type useFetchAssetTypesResultType = UseQueryResult<
  AssetTypesResponseType,
  AxiosError<unknown, any>
>;

export type useFetchAssetCategoriesResultType = UseQueryResult<
  AssetCategoriesResponseType,
  AxiosError<unknown, any>
>;

export type useFetchSpecificationsResultType = UseQueryResult<
  SpecificationsResponseType,
  AxiosError<unknown, any>
>;

export type useFetchMeasurementUnitsResultType = UseQueryResult<
  MeasurementUnitsResponseType,
  AxiosError<unknown, any>
>;

//// here

export type useFetchUsersResultType = UseQueryResult<
  UsersResponseType,
  AxiosError<unknown, any>
>;
export type useFetchOrganizationContactsResultType = UseQueryResult<
  OrganizationContactListType,
  AxiosError<unknown, any>
>;

export type useFetchOrganizationContactByIdResultType = UseQueryResult<
  OrganizationContactType,
  AxiosError<unknown, any>
>;

export type useFetchUserByIdResultType = UseQueryResult<
  AuthUserType,
  AxiosError<unknown, any>
>;

export type useFetchWorkordersResultType = UseQueryResult<
  any, // TODO: Replace type here
  AxiosError<unknown, any>
>;

export type useFetchWorkorderStatusResultType = UseQueryResult<
  StatusType,
  AxiosError<unknown, any>
>;

export type useFetchWorkorderResultType = UseQueryResult<
  any, // TODO: Replace type here
  AxiosError<unknown, any>
>;

export type useCreateContactResultType = {
  mutate: UseMutateFunction<
    OrganizationContactType,
    AxiosError<unknown, any>,
    void,
    unknown
  >;
};

export type useUpdateContactResultType = {
  mutate: UseMutateFunction<
    OrganizationContactType,
    AxiosError<unknown, any>,
    void,
    unknown
  >;
};

export type useDeleteOrganizationContactResultType = {
  mutate: UseMutateFunction<
    OrganizationContactType,
    AxiosError<unknown, any>,
    void,
    unknown
  >;
};

export type useDeleteWorkorderResultType = {
  mutate: UseMutateFunction<
    WorkorderType,
    AxiosError<unknown, any>,
    void,
    unknown
  >;
};

export type useDeleteAssetOrganizationContactResultType = {
  mutate: UseMutateFunction<
    AssetOrganizationContactType,
    AxiosError<unknown, any>,
    void,
    unknown
  >;
};

export type useDeleteAssetResultType = {
  mutate: UseMutateFunction<Asset, AxiosError<unknown, any>, void, unknown>;
};
export type useFetchWorkorderPriorityType = UseQueryResult<
  WorkorderPriorityType,
  AxiosError<unknown, any>
>;
