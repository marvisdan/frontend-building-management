import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { LoadingButton } from "@mui/lab";
import { Alert, IconButton, InputAdornment, Link, Stack } from "@mui/material";

import { useAuthContext } from "../../auth/useAuthContext";

import FormProvider, { RHFTextField } from "../../components/hook-form";
import Iconify from "../../components/iconify";
import { useLocales } from "../../locales";
import { PATH_AUTH } from "../../routes/paths";

type FormValuesProps = {
  email: string;
  password: string;
  afterSubmit?: string;
};

export default function AuthLoginForm() {
  const { login } = useAuthContext();
  const { translate } = useLocales();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    // TODO: (WHEN THE BACKEND IWILL BE READY) change username validation to email
    email: Yup.string().required(translate("validations.email_required")), // still an username for the moment, waiting for the new backend to change it
    password: Yup.string().required(translate("validations.password_required")),
  });

  const defaultValues = {
    email: "",
    password: "",
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      reset();
      setError("afterSubmit", {
        ...error,
        message: translate("login.error_login"),
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label={translate("login.email")} />

        <RHFTextField
          name="password"
          label={translate("login.password")}
          type={showPassword ? "text" : "password"}
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

        {!!errors.afterSubmit && (
          <Alert icon={false} severity="error">
            {errors.afterSubmit.message}
          </Alert>
        )}
      </Stack>

      <Stack alignItems="flex-end" sx={{ my: 2 }}>
        <Link
          to={PATH_AUTH.resetPassword}
          component={RouterLink}
          variant="body2"
          color="inherit"
          underline="always"
        >
          {translate("login.forget_password_link")}
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitSuccessful || isSubmitting}
      >
        {translate("login.button")}
      </LoadingButton>
    </FormProvider>
  );
}
