import { Message, Stan, SubscriptionOptions } from "node-nats-streaming";
import Subjects from "./Subjects";

interface Event {
  subject: Subjects;
  data: any;
}

abstract class Listener<T extends Event> {
  abstract subject: T["subject"];
  abstract queueGroupName: string;
  abstract onMessage: (data: T["data"], msg: Message) => void;

  constructor(private client: Stan, protected ackWait: number = 5000) {}

  generateSubscriptionOptions(): SubscriptionOptions {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.generateSubscriptionOptions()
    );

    subscription.on("message", (msg: Message) => {
      console.log("Received a message", this.subject, "/", this.queueGroupName);
      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }

  parseMessage(msg: Message): object {
    const data = msg.getData();
    return JSON.parse(typeof data === "string" ? data : data.toString("utf-8"));
  }
}

export default Listener;
