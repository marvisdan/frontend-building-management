import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { IconButton, InputAdornment, Stack } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import FormProvider, { RHFTextField } from "../../components/hook-form";
import PasswordValidationsContent from "../../components/hook-form/PasswordValidationsContent";
import Iconify from "../../components/iconify";
import { useLocales } from "../../locales";
import {
  lowercaseCharacter,
  minimumDigits,
  oneSymbol,
  uppercaseCharacter,
} from "../../schemas/validations";

type FormValuesProps = {
  password: string;
  confirmPassword: string;
};

type Props = { submitLabel?: string; islargeButton?: boolean };
export default function AuthNewPasswordForm({
  submitLabel,
  islargeButton,
}: Props) {
  //const { mutate } = useSendRecoverPassword();
  const { translate } = useLocales();

  const [showPassword, setShowPassword] = useState(false);
  const [showSecondPassword, setShowSecondPassword] = useState(false);

  const NewPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, translate("validations.login.min_character"))
      .test(minimumDigits)
      .test(lowercaseCharacter)
      .test(uppercaseCharacter)
      .test(oneSymbol)
      .required("validations.password_required"),

    confirmPassword: Yup.string()
      .required(translate(translate("validations.password_required")))
      .oneOf(
        [Yup.ref("password"), null],
        translate(translate("validations.login.password_match"))
      ),
  });

  const defaultValues = {
    password: "",
    confirmPassword: "",
  };

  const methods = useForm({
    mode: "all",
    criteriaMode: "all",
    resolver: yupResolver(NewPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    getValues,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    const trimedPassword = data.password.trim();
    const trimedConfirmPassword = data.confirmPassword.trim();

    if (trimedPassword !== "" && trimedPassword === trimedConfirmPassword) {
      // TODO: add missing sendgrid token
      //mutate({ token:null, newPassword: trimedPassword });
    }
  };

  const passwordValue = getValues("password");
  const confirmPasswordValue = getValues("confirmPassword");

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} display="column" alignItems="flex-end">
        <RHFTextField
          name="password"
          label={translate("login.new_password")}
          type={showPassword ? "text" : "password"}
          displayError={false}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <PasswordValidationsContent />
        <RHFTextField
          name="confirmPassword"
          label={translate("login.re_enter_password")}
          type={showSecondPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowSecondPassword(!showSecondPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={
                      showSecondPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <LoadingButton
          fullWidth={islargeButton}
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ mt: 3 }}
          disabled={
            passwordValue.length === 0 ||
            Boolean(errors?.password) ||
            confirmPasswordValue.length === 0 ||
            Boolean(errors?.confirmPassword)
          }
        >
          {submitLabel || translate("login.save")}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
