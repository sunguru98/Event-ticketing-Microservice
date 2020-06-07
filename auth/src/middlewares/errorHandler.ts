import { Response, Request, NextFunction } from "express";
import RequestValidationError from "../utils/RequestValidationError";
import DatabaseConnectionError from "../utils/DatabaseConnectionError";

export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`Error: ${err.message}`);
  if (err instanceof RequestValidationError) {
    return res.status(400).send({
      errors: err.errors.map(({ msg, param }) => ({
        message: msg,
        field: param
      }))
    });
  } else if (err instanceof DatabaseConnectionError) {
    return res.status(500).send({
      errors: [
        {
          message: err.reason
        }
      ]
    });
  }

  return res.status(400).send({
    errors: [{ message: "Something went wrong" }]
  });
};
