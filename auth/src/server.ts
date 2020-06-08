import express from "express";
import "express-async-errors";
import appRouter from "./app.router";
import errorHandler from "./middlewares/errorHandler";
import NotFoundError from "./utils/NotFoundError";

const app = express();
const PORT = 9998;
app.use(express.json());
app.use("/api/users", appRouter);
app.all("*", async req => {
  throw new NotFoundError(`${req.url} not found`);
});

// Error handler
app.use(errorHandler);
app.listen(PORT, () => console.log(`Auth service running on PORT: ${PORT}`));
