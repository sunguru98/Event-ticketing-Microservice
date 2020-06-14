import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import appRouter from "./auth.router";
import errorHandler from "./middlewares/errorHandler";
import NotFoundError from "./utils/errors/NotFoundError";

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

app.use("/api/users", appRouter);
app.all("*", async req => {
  throw new NotFoundError(`${req.url} not found`);
});

// Error handler
app.use(errorHandler);
export default app;
