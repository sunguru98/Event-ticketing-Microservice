import { Request, NextFunction, Response } from "express";
import CustomError from "../utils/CustomError";

export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.message);
  if (err instanceof CustomError)
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  return res.status(400).send({
    errors: [{ message: "Something went wrong" }]
  });
};
