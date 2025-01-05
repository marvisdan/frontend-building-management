import * as Yup from "yup";

export const NewDocumentSchema = Yup.object().shape({
  newDocuments: Yup.object().shape({
    file: Yup.mixed().required("File is required"),
  }),
});

export const defaultValues: any | {} = {
  newDocuments: [],
};
