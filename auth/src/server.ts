import express from "express";
const app = express();
const PORT = 9998;
app.use(express.json());

app.listen(PORT, () => console.log(`Auth service running on PORT: ${PORT}`));
