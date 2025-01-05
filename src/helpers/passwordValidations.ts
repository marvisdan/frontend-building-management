export const passwordValidations = ({
  translate,
}: {
  translate: (text: any, options?: any) => string;
}) => [
  {
    type: "required",
    message: translate("validations.password_required"),
  },
  {
    type: "min",
    message: translate("validations.login.min_character"),
  },
  {
    type: "minimumDigits",
    message: translate("validations.login.min_digits"),
  },
  {
    type: "lowercaseCharacter",
    message: translate("validations.login.lowercase_required"),
  },
  {
    type: "uppercaseCharacter",
    message: translate("validations.login.uppercase_required"),
  },
  {
    type: "oneSymbol",
    message: translate("validations.login.min_one_symbol"),
  },
];
