import app from "./app";

const PORT = 9997;

if (!process.env.JWT_KEY) throw new Error("JWT_KEY is not defined");
app.listen(PORT, () => {
  console.log(`Tickets service running on PORT: ${PORT}`);
  require("./utils/db");
});
