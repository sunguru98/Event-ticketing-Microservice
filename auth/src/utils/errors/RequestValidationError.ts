import { ValidationError } from "express-validator";
import CustomError from "./CustomError";

export default class RequestValidationError extends CustomError {
  statusCode: number;
  constructor(private errors: ValidationError[], message?: string) {
    super(message);
    this.statusCode = 400;
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map(({ msg, param }) => ({
      message: msg,
      field: param
    }));
  }
}
