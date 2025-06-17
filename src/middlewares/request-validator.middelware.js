import { validationResult } from "express-validator";

export default function requestValidator(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({
      message: errors.array().map((err) => err.msg),
      statusCode: 400,
    });

  next();
}
