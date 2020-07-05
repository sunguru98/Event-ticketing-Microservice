import nats from "node-nats-streaming";
import TicketCreatePublisher from "./events/TicketCreatePublisher";

const stan = nats.connect("eventticket", "abc", {
  url: "http://localhost:4222"
});

stan.on("connect", async () => {
  console.log("Publisher: Connected to NATS :)");
  const ticketCreate = new TicketCreatePublisher(stan);
  console.log(
    await ticketCreate.publish({
      title: "Ticket for another check",
      price: 41,
      userId: "5ef33d287783e00025524728",
      id: "5ef33d2d4ca59700256e8533"
    })
  );
});
