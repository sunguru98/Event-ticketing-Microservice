import { Router } from "express";

interface User {
  name: string;
  email: string;
}

interface UserReq extends User {
  password: string;
}

const router = Router();

// @route - GET /api/users/currentuser
// @desc - Get current user data
// @auth - Private
router.get<{}, { statusCode: number; user: User }>(
  "/currentuser",
  (req, res) => {
    res.json({
      statusCode: 200,
      user: {
        name: "Sundeep Charan Ramkumar",
        email: "webdevdesign@sundeepcharan.com",
      },
    });
  }
);

// @route - POST /api/users/signup
// @desc - Register new user
// @auth - Public
router.post<any, { statusCode: number; user: User }, UserReq>(
  "/signup",
  (req, res) => {
    const { email, name, password } = req.body;
    res.status(201).send({ statusCode: 201, user: { name, email } });
  }
);

// @route - POST /api/users/signin
// @desc - Login user
// @auth - Public
router.post<
  any,
  { statusCode: number; user: User },
  { email: string; password: string }
>("/signin", (req, res) => {
  const { email } = req.body;
  res.status(202).send({ statusCode: 201, user: { name: "Sundeep", email } });
});

// @route - DELETE /api/users/signout
// @desc - Logout user
// @auth - Private
router.delete<any, string, null>("/signout", (req, res) => {
  res.status(202).send("Logged out successfully");
});

export default router;
