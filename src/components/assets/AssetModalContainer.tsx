import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import AssetModal from "./AssetModal";
import { defaultValues, NewAssetSchema } from "./schemas/asset";

import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useCreateAsset } from "../../hooks";
import { CreateAssetType, CustomFile } from "../../types";
import FormProvider from "../hook-form";
import GeneralAssetInfoForm from "./GeneralAssetInfoForm";

interface FormValuesProps extends CreateAssetType {
  documents: (CustomFile | string)[];
}

type AssetModalContainerProps = {
  open: boolean;
  onClose: () => void;
};

export const onSubmitAsset =
  (
    mutate: UseMutateFunction<
      any,
      AxiosError<unknown, any>,
      CreateAssetType,
      unknown
    >,
    onClose?: () => void
  ) =>
  async (data: FormValuesProps) => {
    const editAsset: CreateAssetType = {
      name: data.name,
      description: data.description,
      assetCategoryId: data.assetCategoryId && Number(data.assetCategoryId),
      assetTypeId: data.assetTypeId && Number(data.assetTypeId),
      organizationSiteId:
        data.organizationSiteId && Number(data.organizationSiteId),
      organizationContacts: data.organizationContacts,
      thumbnail: data.thumbnail,
    };

    await mutate(editAsset);
    onClose && onClose();
  };

export const AssetModalContainer = ({
  open,
  onClose,
}: AssetModalContainerProps) => {
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewAssetSchema),
    defaultValues,
  });
  const { handleSubmit, reset } = methods;
  const { mutate, isLoading } = useCreateAsset(onClose, undefined, reset);

  return (
    <FormProvider methods={methods}>
      <AssetModal
        open={open}
        onClose={onClose}
        onSubmit={handleSubmit(onSubmitAsset(mutate))}
        isSubmitting={isLoading}
      >
        <GeneralAssetInfoForm />
      </AssetModal>
    </FormProvider>
  );
};
