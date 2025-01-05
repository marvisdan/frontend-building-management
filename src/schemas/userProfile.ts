import { Translate } from "src/types";
import * as Yup from "yup";
import {
  lowercaseCharacter,
  minimumDigits,
  oneSymbol,
  uppercaseCharacter,
} from "./validations";

export const VerifyCodeSchema = (translate: Translate) =>
  Yup.object().shape({
    oldPassword: Yup.string().required(
      translate("validations.password_required")
    ),

    password: Yup.string()
      .min(8, translate("validations.login.min_character"))
      .test(minimumDigits)
      .test(lowercaseCharacter)
      .test(uppercaseCharacter)
      .test(oneSymbol)

      .required(translate("validations.password_required")),

    confirmPassword: Yup.string()
      .required(translate(translate("validations.password_required")))
      .oneOf(
        [Yup.ref("password"), null],
        translate("validations.login.password_match")
      ),
  });
