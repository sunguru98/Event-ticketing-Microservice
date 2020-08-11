import nats, { Stan } from "node-nats-streaming";
class NatsWrapper {
  private _client?: Stan;

  get client() {
    if (this._client) return this._client;
    else throw new Error("Cannot fetch client before connecting");
  }

  connect(clusterName: string, clientId: string, url: string) {
    this._client = nats.connect(clusterName, clientId, { url });
    return new Promise((res, rej) => {
      this.client.on("connect", response => {
        console.log("Connected to NATS");
        res(response);
      });
      this.client.on("error", err => rej(err));
    });
  }
}

export const natsWrapper = new NatsWrapper();
