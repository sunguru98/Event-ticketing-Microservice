import { Router } from "express";

const router = Router();

router.get<{}, { statusCode: number; user: { name: string; email: string } }>(
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

export default router;
