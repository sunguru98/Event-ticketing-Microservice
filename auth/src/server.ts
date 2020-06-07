import express from "express";
import appRouter from "./app.router";
import errorHandler from "./middlewares/errorHandler";

const app = express();
const PORT = 9998;
app.use(express.json());
app.use("/api/users", appRouter);

// Error handler
app.use(errorHandler);
app.listen(PORT, () => console.log(`Auth service running on PORT: ${PORT}`));
