import CustomError from "./CustomError";

class BadRequestError extends CustomError {
  statusCode = 400;
  constructor(public message: string, private field?: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [
      { message: this.message, field: this.field ? this.field : undefined }
    ];
  }
}

export default BadRequestError;
