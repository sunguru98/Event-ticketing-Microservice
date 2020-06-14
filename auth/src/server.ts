import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import appRouter from "./auth.router";
import errorHandler from "./middlewares/errorHandler";
import NotFoundError from "./utils/errors/NotFoundError";

const PORT = 9998;

const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    sameSite: "strict",
    secure: true,
    signed: false
  })
);

app.use("/api/users", appRouter);
app.all("*", async req => {
  throw new NotFoundError(`${req.url} not found`);
});

// Error handler
app.use(errorHandler);
if (!process.env.JWT_KEY) throw new Error("JWT_KEY is not defined");
app.listen(PORT, () => {
  console.log(`Auth service running on PORT: ${PORT}`);
  require("./utils/db");
});
