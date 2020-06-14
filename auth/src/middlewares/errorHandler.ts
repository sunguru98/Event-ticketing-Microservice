import { Request, NextFunction, Response } from "express";
import CustomError from "../utils/errors/CustomError";

export default (err: Error, _: Request, res: Response, __: NextFunction) => {
  if (err instanceof CustomError)
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  return res.status(400).send({
    errors: [{ message: "Something went wrong" }]
  });
};
