const { check, validationResult } = require("express-validator");

const validateSignUpUser = [
  check("username")
    .trim()
    .not()
    .isEmpty()
    .withMessage("username field cannot be empty")
    .isString()
    .withMessage("provide a valid name")
    .isLength({ min: 4, max: 20 })
    .withMessage("Name must be within 4 to 20 characters"),
  check("email").normalizeEmail().isEmail().withMessage("invalid email!"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("password is empty")
    .isLength({ min: 4, max: 20 })
    .withMessage("password must be 4 t0 20 characters long"),
  check("confirmPassword")
    .trim()
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("password confirmation failed");
      }
      return true;
    }),
];

const userValidation = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();

  const error = result[0].msg;
  res.json({ success: false, message: error });
};

const validateUserSignIn = [
  check("email").trim().isEmail().withMessage("invalid email"),
  check("password").trim().not().isEmpty().withMessage("invalid password"),
];

module.exports = { userValidation, validateUserSignIn, validateSignUpUser };
