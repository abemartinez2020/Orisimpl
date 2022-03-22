const passwordChecker = (p1, p2) => {
  if (p2) {
    if (p1 !== p2)
      return { success: false, message: "Passwords do not match." };
  }

  const passwordRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

  if (!passwordRegex.test(p1))
    return {
      success: false,
      message: `password must contain: 1 lowercase and upercase letter, 1 number, 1 special character (!@#$%^&*) and at least each characters long`,
    };

  return { success: true };
};

const emailChecker = (email) => {
  const emailRegex = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  if (!emailRegex.test(email)) {
    return { success: false, message: "Enter a valid email" };
  }

  return { success: true };
};

module.exports = {
  passwordChecker,
  emailChecker,
};
