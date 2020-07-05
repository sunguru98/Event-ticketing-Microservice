import nats from "node-nats-streaming";
import { randomBytes } from "crypto";
import TicketCreateListener from "./events/TicketCreateListener";

const stan = nats.connect("eventticket", randomBytes(5).toString("hex"), {
  url: "http://localhost:4222"
});

stan.on("connect", () => {
  console.log("Listener: Connected to NATS :)");

  stan.on("close", () => {
    console.log("Listener: Shutting down");
    process.exit();
  });

  new TicketCreateListener(stan).listen();
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
