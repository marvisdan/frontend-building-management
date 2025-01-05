import * as Yup from "yup";

const hasSingleEmptyItem = (value: any) =>
  Array.isArray(value) &&
  value.length === 1 &&
  Object.keys(value[0]).every((key) => !value[0][key]);

export const NewSpecificationSchema = Yup.object().shape({
  specificationValues: Yup.array()
    .of(
      Yup.object().shape({
        specification: Yup.number().when("$isSingleEmptyItem", {
          is: false,
          then: Yup.number().required("Name is required"),
          otherwise: Yup.number().notRequired(),
        }),
        value: Yup.string().when("$isSingleEmptyItem", {
          is: false,
          then: Yup.string().required("Value is required"),
          otherwise: Yup.string().notRequired(),
        }),
        measurementunit: Yup.number().when("$isSingleEmptyItem", {
          is: false,
          then: Yup.number().required("Unit is required"),
          otherwise: Yup.number().notRequired(),
        }),
      })
    )
    .test(
      "is-single-empty-item",
      "Single empty item check",
      (value, context) => {
        const isSingleEmptyItem = hasSingleEmptyItem(value);
        // Update the context used in the conditional `.when` checks
        if (context.options.context) {
          context.options.context.isSingleEmptyItem = isSingleEmptyItem;
        }
        return true; // Always return true as this test is not meant to invalidate the value
      }
    ),
});
