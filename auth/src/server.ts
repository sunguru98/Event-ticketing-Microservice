import express from "express";
import appRouter from "./app.router";

const app = express();
const PORT = 9998;
app.use(express.json());
app.use("/api/users", appRouter);

app.listen(PORT, () => console.log(`Auth service running on PORT: ${PORT}`));
