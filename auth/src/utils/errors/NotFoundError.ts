import CustomError from "./CustomError";

export default class NotFoundError extends CustomError {
  statusCode: number;
  constructor(message?: string) {
    super(message);
    this.statusCode = 404;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors(): { message: string; field?: string }[] {
    return [{ message: "Not found" }];
  }
}
