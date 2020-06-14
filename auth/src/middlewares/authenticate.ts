import { Request, Response, NextFunction } from "express";
import AuthorizationError from "../utils/errors/AuthorizationError";
import { verify } from "jsonwebtoken";
import { convertMsToString } from "../utils/expiresIn";

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

interface JWTPayload {
  email: string;
  id: string;
  exp: number | string;
  iat?: number;
}

export default (req: Request, _: Response, next: NextFunction) => {
  if (!req.session?.accessToken)
    return next(new AuthorizationError("Invalid Credentials"));
  try {
    const payload = verify(
      req.session.accessToken,
      process.env.JWT_KEY!
    ) as JWTPayload;
    delete payload.iat;
    payload.exp = convertMsToString(payload.exp as number, { long: true });
    req.user = payload;
    next();
  } catch (err) {
    next(new AuthorizationError(err.message));
  }
};
