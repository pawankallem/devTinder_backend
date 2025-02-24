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

module.exports = {
  validateSignupData,
};
