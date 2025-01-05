export const minimumDigits = {
  name: "minimumDigits",
  message: "Minimum 1 digit",
  test(value = "") {
    const match = value.match(/[0-9]/);
    return Boolean(match);
  },
};

export const oneSymbol = {
  name: "oneSymbol",
  message: "Minimum 1 special character",
  test(value = "") {
    const match = value.match(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~ ]/);
    return Boolean(match);
  },
};

export const lowercaseCharacter = {
  name: "lowercaseCharacter",
  message: "Password requires a lowercase character",
  test(value = "") {
    const match = value.match(/[a-z]/);
    return Boolean(match);
  },
};

export const uppercaseCharacter = {
  name: "uppercaseCharacter",
  message: "Password requires a uppercase character",
  test(value = "") {
    const match = value.match(/[A-Z]/);
    return Boolean(match);
  },
};
