import CustomError from "./CustomError";

export default class DatabaseConnectionError extends CustomError {
  statusCode: number;
  constructor(public reason: string, message?: string) {
    super(message);
    this.statusCode = 500;
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
