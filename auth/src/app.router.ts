import { Router } from "express";
import { check, validationResult } from "express-validator";
import { sign } from "jsonwebtoken";
import RequestValidationError from "./utils/RequestValidationError";
import User, { UserReqSignUp, UserReq } from "./models/User";
import BadRequestError from "./utils/BadRequestError";

interface UserRes {
  email: string;
  name: string;
}

interface UserErrorRes {
  errors: [{ message: string; field?: string }];
}

const router = Router();

// @route - GET /api/users/currentuser
// @desc - Get current user data
// @auth - Private
router.get<{}, UserRes | UserErrorRes>("/currentuser", (req, res) => {
  res.json({ name: "", email: "" });
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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new RequestValidationError(errors.array());
    const { email, name, password } = req.body;
    let user = await User.findOne({ email });
    if (user) throw new BadRequestError("Email already exists");
    user = User.build({ email, name, password });
    await user.save();
    const accessToken = sign({ id: user.id, email: user.email }, "eventTicket");
    req.session!.accessToken = accessToken;
    res.status(201).send({ name, email });
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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new RequestValidationError(errors.array());
    const { email, password } = req.body;
    res.status(202).send({
      name: "Sundeep",
      email
    });
  }
);

// @route - DELETE /api/users/signout
// @desc - Logout user
// @auth - Private
router.delete<any, string | UserErrorRes, null>("/signout", (req, res) => {
  res.status(202).send("Logged out successfully");
});

export default router;
