import { Router } from "express";
import { check } from "express-validator";
import validateRequest from "./middlewares/validateRequest";
import authenticate from "./middlewares/authenticate";
import { signIn, register, signOut, getCurrentUser } from "./auth.controller";

const router = Router();

// @route - GET /api/users/currentuser
// @desc - Get current user data
// @auth - Private
router.get("/currentuser", authenticate, getCurrentUser);

// @route - POST /api/users/signup
// @desc - Register new user
// @auth - Public
router.post(
  "/signup",
  [
    check("email", "Email is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    check("name", "Name is required").not().isEmpty(),
    check("email", "Invalid Email").isEmail(),
    check("password", "Password should be minimum 8 characters")
      .trim()
      .isLength({
        min: 8
      })
  ],
  validateRequest,
  register
);

// @route - POST /api/users/signin
// @desc - Login user
// @auth - Public
router.post(
  "/signin",
  check("email", "Email is required").not().isEmpty(),
  check("password", "Password is required").not().isEmpty(),
  check("email", "Invalid Email").isEmail(),
  validateRequest,
  signIn
);

// @route - DELETE /api/users/signout
// @desc - Logout user
// @auth - Private
router.delete("/signout", authenticate, signOut);

export default router;
