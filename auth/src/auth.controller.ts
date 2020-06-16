import { Response, Request } from "express";
import { sign } from "jsonwebtoken";
import User from "./models/User";
import BadRequestError from "./utils/errors/BadRequestError";
import AuthorizationError from "./utils/errors/AuthorizationError";
import { expiresIn } from "./utils/expiresIn";

interface UserRes {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserErrorRes {
  errors: [{ message: string; field?: string }];
}

// User request object - Login
interface UserReq {
  email: string;
  password: string;
}

// User request object - Signup
interface UserReqSignUp extends UserReq {
  name: string;
}

const signIn = async (
  req: Request<any, UserRes | UserErrorRes, UserReq>,
  res: Response<UserRes | UserErrorRes>
) => {
  const { email, password } = req.body;
  const user = await User.findUserByEmailAndPassword(email, password);
  if (!user) throw new AuthorizationError("Invalid Credentials");
  const accessToken = sign(
    { id: user.id, email: user.email },
    process.env.JWT_KEY!,
    { expiresIn: expiresIn("15m") }
  );
  req.session!.accessToken = accessToken;
  res.status(202).json(user);
};

const getCurrentUser = (
  req: Request<any, { email: string; id: string }, null>,
  res: Response<{ email: string; id: string }>
) => {
  res.send(req.user);
};

const register = async (
  req: Request<any, UserRes | UserErrorRes, UserReqSignUp>,
  res: Response<UserRes | UserErrorRes>
) => {
  const { email, password, name } = req.body;
  let user = await User.findOne({ email });
  if (user) throw new BadRequestError("Email already exists", "email");
  user = User.build({ email, name, password });
  await user.save();
  const accessToken = sign(
    { id: user.id, email: user.email },
    process.env.JWT_KEY!,
    { expiresIn: expiresIn("15m") }
  );
  req.session!.accessToken = accessToken;
  res.status(201).json(user);
};

const signOut = (
  req: Request<any, string | UserErrorRes, null>,
  res: Response<string | UserErrorRes>
) => {
  req.session = null;
  res.status(202).send("Logged out successfully");
};

export { signIn, register, signOut, getCurrentUser };
