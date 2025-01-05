import * as Yup from "yup";

export const NewAMetadataSchema = Yup.object().shape({
  metadataValues: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Name is required"),
      value: Yup.string().required("Value is required"),
    })
  ),
});
