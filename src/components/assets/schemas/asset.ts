import * as Yup from "yup";
import { EditAssetType } from "../../../types";

export const NewAssetSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  assetCategoryId: Yup.string().required("Domain is required"),
  assetTypeId: Yup.string().required("Type is required"),
  organizationSiteId: Yup.string().required("Site is required"),
  thumbnail: Yup.mixed(),
  // .test(
  //   "required",
  //   "Image is required",
  //   (value) => value !== ""
  // ),
  documents: Yup.mixed(),
});

export const defaultValues: EditAssetType | {} = {
  id: 0,
  name: "",
  description: "",
  assetCategoryId: undefined,
  assetTypeId: undefined,
  organizationSiteId: undefined,
  thumbnail: "",
  organizationcontacts: [],
};
