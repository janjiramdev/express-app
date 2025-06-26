import { body } from "express-validator";

export const registerValidator = [
  body("username")
    .notEmpty()
    .withMessage("username is required")
    .isString()
    .withMessage("username must be string")
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z]).{4,12}$/)
    .withMessage(
      "username must contain at least one uppercase, at least one lowercase and total length must be between 4 to 12 characters"
    ),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isString()
    .withMessage("password must be string")
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/)
    .withMessage(
      'password must contain at least one uppercase, at least one lowercase, at least one number, at least one special character from this list "#?!@$%^&*-" and total length must be between 8 to 16 characters'
    )
];

export const loginValidator = [
  body("username")
    .notEmpty()
    .withMessage("username is required")
    .isString()
    .withMessage("username must be string"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isString()
    .withMessage("password must be string")
];

export const refreshTokensValidator = [
  body("refreshToken")
    .notEmpty()
    .withMessage("refreshToken is required")
    .isString()
    .withMessage("refreshToken must be string")
];
