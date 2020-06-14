import CustomError from "./CustomError";

class AuthorizationError extends CustomError {
  statusCode = 401;
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

export default AuthorizationError;
