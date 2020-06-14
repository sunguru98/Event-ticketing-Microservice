import { Router } from "express";
import { check, validationResult } from "express-validator";
import { sign } from "jsonwebtoken";
import RequestValidationError from "./utils/errors/RequestValidationError";
import User, { UserReqSignUp, UserReq } from "./models/User";
import BadRequestError from "./utils/errors/BadRequestError";
import AuthorizationError from "./utils/errors/AuthorizationError";
import validateRequest from "./middlewares/validateRequest";

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

const router = Router();

// @route - GET /api/users/currentuser
// @desc - Get current user data
// @auth - Private
router.get<{}, UserRes | UserErrorRes>("/currentuser", (req, res) => {
  res.json();
});

// @route - POST /api/users/signup
// @desc - Register new user
// @auth - Public
router.post<any, UserRes | UserErrorRes, UserReqSignUp>(
  "/signup",
  check("email", "Email is required").not().isEmpty(),
  check("password", "Password is required").not().isEmpty(),
  check("name", "Name is required").not().isEmpty(),
  check("email", "Invalid Email").isEmail(),
  check("password", "Password should be minimum 8 characters").trim().isLength({
    min: 8
  }),
  validateRequest,
  async (req, res) => {
    const { email, name, password } = req.body;
    let user = await User.findOne({ email });
    if (user) throw new BadRequestError("Email already exists");
    user = User.build({ email, name, password });
    await user.save();
    const accessToken = sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    );
    req.session!.accessToken = accessToken;
    res.status(201).json(user);
  }
);

// @route - POST /api/users/signin
// @desc - Login user
// @auth - Public
router.post<any, UserRes | UserErrorRes, UserReq>(
  "/signin",
  check("email", "Email is required").not().isEmpty(),
  check("password", "Password is required").not().isEmpty(),
  check("email", "Invalid Email").isEmail(),
  validateRequest,
  async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findUserByEmailAndPassword(email, password);
    if (!user) throw new AuthorizationError("Invalid Credentials");
    const accessToken = sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    );
    req.session!.accessToken = accessToken;
    res.status(202).json(user);
  }
);

// @route - DELETE /api/users/signout
// @desc - Logout user
// @auth - Private
router.delete<any, string | UserErrorRes, null>("/signout", (req, res) => {
  res.status(202).send("Logged out successfully");
});

export default router;
