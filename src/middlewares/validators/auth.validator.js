import { body } from "express-validator";

export const registerValidator = [
  body("username")
    .notEmpty()
    .withMessage("username is required")
    .isString()
    .withMessage("username must be string")
    .isLength({ min: 2 })
    .withMessage("username must be at least 2 characters"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isString()
    .withMessage("password must be string")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters")
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/)
    .withMessage(
      'password must contain at least one uppercase, at least one lowercase, at least one number, at least one special character from this list "#?!@$%^&*-" and total length must be between 8 to 16 characters'
    ),
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
    .withMessage("password must be string"),
];

export const refreshTokensValidator = [
  body("refreshTokens")
    .notEmpty()
    .withMessage("refresh-tokens is required")
    .isString()
    .withMessage("refresh-tokens must be string"),
];
