import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { Alert } from "@mui/material";
import FormProvider, { RHFTextField } from "../../components/hook-form";
import { useSendUserEmail } from "../../hooks";
import { useLocales } from "../../locales";

type FormValuesProps = {
  email: string;
};

export default function AuthResetPasswordForm() {
  const { translate } = useLocales();

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required(translate("validations.email_required")),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: "" },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
    watch,
  } = methods;

  const { mutate } = useSendUserEmail();

  const email = watch("email");

  const onSubmit = async (data: FormValuesProps) => {
    mutate(data.email);
    //navigate(PATH_AUTH.newPassword);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField name="email" label={translate("login.email")} />
      {isSubmitted && (
        <Alert icon={false} severity="info" sx={{ mt: 1 }}>
          {translate("login.existing_account_message")}
        </Alert>
      )}
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        disabled={Boolean(email.length === 0 || errors?.email)}
        loading={isSubmitting}
        sx={{ mt: 3 }}
      >
        {isSubmitted
          ? translate("login.resend_email_button")
          : translate("login.continue")}
      </LoadingButton>
    </FormProvider>
  );
}
