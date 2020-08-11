import app from "./app";
import { natsWrapper } from "./utils/natsWrapper";

const PORT = 9997;

if (!process.env.JWT_KEY) throw new Error("JWT_KEY is not defined");
if (!process.env.MONGO_DB_URI) throw new Error("MONGO_DB_URI is not defined");
if (!process.env.NATS_CONNECTION_URL)
  throw new Error("NATS_CONNECTION_URL is not defined");
if (!process.env.NATS_CLUSTER_ID)
  throw new Error("NATS_CLUSTER_ID is not defined");
if (!process.env.NATS_CLIENT_ID)
  throw new Error("NATS_CLIENT_ID is not defined");

app.listen(PORT, () => {
  console.log(`Tickets service running on PORT: ${PORT}`);
  require("./utils/db");
  console.log(process.env);
  natsWrapper.connect(
    process.env.NATS_CLUSTER_ID!,
    process.env.NATS_CLIENT_ID!,
    process.env.NATS_CONNECTION_URL!
  );
  natsWrapper.client.on("close", () => {
    console.log(`Goodbye !! NATS is shutting down`);
    natsWrapper.client.close();
  });
});

process.on("SIGTERM", () => natsWrapper.client.close());
process.on("SIGINT", () => natsWrapper.client.close());
