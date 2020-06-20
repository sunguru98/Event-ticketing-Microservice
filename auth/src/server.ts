import app from "./app";

const PORT = 9998;

if (!process.env.JWT_KEY) throw new Error("JWT_KEY is not defined");
if (!process.env.MONGO_DB_URI) throw new Error("MONGO_DB_URI is not defined");

app.listen(PORT, () => {
  console.log(`Auth service running on PORT: ${PORT}`);
  require("./utils/db");
});
