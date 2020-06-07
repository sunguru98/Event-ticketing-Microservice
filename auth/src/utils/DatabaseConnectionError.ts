export default class DatabaseConnectionError extends Error {
  constructor(public reason: string) {
    super();
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
