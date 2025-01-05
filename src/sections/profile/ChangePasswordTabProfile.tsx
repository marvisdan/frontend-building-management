import { LoadingButton } from "@mui/lab";
import { Card, IconButton, InputAdornment, Stack } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { UserResetPassword } from "src/types";
import { useAuthContext } from "../../auth/useAuthContext";
import FormProvider, { RHFTextField } from "../../components/hook-form";
import PasswordValidationsContent from "../../components/hook-form/PasswordValidationsContent";
import Iconify from "../../components/iconify";
import { useSnackbar } from "../../components/snackbar";
import { useResetUserPassword } from "../../hooks";
import { useLocales } from "../../locales";
import { VerifyCodeSchema } from "../../schemas";

type FormValuesProps = {
  password: string;
  confirmPassword: string;
  oldPassword: string;
};

export default function ChangePasswordProfileTab() {
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const { user } = useAuthContext();
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showSecondPassword, setShowSecondPassword] = useState<boolean>(false);

  const defaultValues = {
    password: "",
    confirmPassword: "",
    oldPassword: "",
  };

  const methods = useForm({
    mode: "all",
    criteriaMode: "all",
    resolver: yupResolver(VerifyCodeSchema(translate)),
    defaultValues,
  });

  const {
    handleSubmit,
    // control,
    getValues,
    reset,
    formState: { isSubmitting, errors },
  } = methods;

  const { mutate } = useResetUserPassword({ reset });

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const trimedPassword = data.password.trim();
      const trimedConfirmPassword = data.confirmPassword.trim();
      const trimedOldPassword = data.oldPassword.trim();

      if (
        user &&
        user.username &&
        trimedOldPassword !== "" &&
        trimedPassword !== "" &&
        trimedPassword === trimedConfirmPassword
      ) {
        const result: UserResetPassword = {
          username: user.username,
          oldPassword: trimedOldPassword,
          newPassword: trimedPassword,
        };

        await mutate(result);
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  const passwordValue = getValues("password");
  const confirmPasswordValue = getValues("confirmPassword");
  const oldPasswordValue = getValues("oldPassword");

  return (
    <Card
      raised
      sx={{
        padding: 4,
        maxWidth: "md",
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} display="column" alignItems="flex-end">
          <RHFTextField
            name="oldPassword"
            label={translate("login.old_password")}
            type={showOldPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    edge="end"
                  >
                    <Iconify
                      icon={
                        showOldPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                      }
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
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
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{ mt: 3 }}
            disabled={
              oldPasswordValue.length === 0 ||
              Boolean(errors?.oldPassword) ||
              passwordValue.length === 0 ||
              Boolean(errors?.password) ||
              confirmPasswordValue.length === 0 ||
              Boolean(errors?.confirmPassword)
            }
          >
            {translate("profile.actions.save_changes")}
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}
