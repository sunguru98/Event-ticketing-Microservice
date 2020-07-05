import Listener from "./BaseListener";
import { Message } from "node-nats-streaming";
import TicketCreateEvent from "../event-types/TicketCreate";
import Subjects from "./Subjects";

class TicketCreateListener extends Listener<TicketCreateEvent> {
  readonly subject: Subjects.TicketCreate = Subjects.TicketCreate;
  queueGroupName = "payments-srv";
  onMessage = (data: TicketCreateEvent["data"], msg: Message) => {
    console.log(`Data: ${JSON.stringify(data)}`);
    msg.ack();
  };
}

export default TicketCreateListener;
