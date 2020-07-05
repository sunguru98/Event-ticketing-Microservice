import { Stan } from "node-nats-streaming";

interface Event {
  subject: string;
  data: any;
}

abstract class Publisher<T extends Event> {
  abstract readonly subject: T["subject"];
  constructor(private client: Stan) {}

  publish(data: T["data"]): Promise<string> {
    return new Promise((res, rej) => {
      this.client.publish(this.subject, JSON.stringify(data), err => {
        if (err) rej(err);
        res(`Published ${this.subject} event successfully`);
      });
    });
  }
}

export default Publisher;
