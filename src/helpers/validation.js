const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, email, password, photoUrl } = req.body;

  if (!firstName || !email || !password || !photoUrl) {
    throw new Error("Please enter details in all required fields ");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Your password must be more then 3 letters and It must be Strong for security reasons"
    );
  }
};

const validateProfileEditData = (req) => {
  const allowedEditFields = ["firstName", "lastName", "email", "age"];

  const isAllowed = Object.keys(req.body).every((e) =>
    allowedEditFields.includes(e)
  );

  return isAllowed;
};

const validateForgotPasswordField = (req) => {
  const allowedForgotPasswordFields = [
    "currentPassword",
    "newPassword",
    "confirmPassword",
  ];
  const isUpdatePasswordAllowed = Object.keys(req.body).every((e) =>
    allowedForgotPasswordFields.includes(e)
  );

  return isUpdatePasswordAllowed;
};

module.exports = {
  validateSignupData,
  validateProfileEditData,
  validateForgotPasswordField,
};
