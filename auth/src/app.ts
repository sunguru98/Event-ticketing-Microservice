import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import authRouter from "./auth.router";
import { errorHandler, NotFoundError } from "@scrtickets/common";

const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    sameSite: true,
    secure: process.env.NODE_ENV !== "test",
    signed: false
  })
);

app.use("/api/users", authRouter);
app.all("*", async req => {
  throw new NotFoundError(`${req.url} not found`);
});

// Error handler
app.use(errorHandler);
export default app;
