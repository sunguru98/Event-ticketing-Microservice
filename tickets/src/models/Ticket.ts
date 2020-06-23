import { Schema, model, Document, Model } from "mongoose";

// Ticket Schema
interface ITicketSchema extends Document {
  title: string;
  price: number;
  userId: string;
}

// Ticket Methods
interface ITicketBase extends ITicketSchema {
  toJSON: () => ITicket;
}

// Ticket document
export interface ITicket extends ITicketBase {
  id: string;
  title: string;
  userId: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

// Ticket Statics
export interface ITicketModel extends Model<ITicket> {
  build: (ticket: { title: string; price: number }) => ITicket;
}

const ticketSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId
    }
  },
  { timestamps: true, versionKey: false }
);

ticketSchema.methods.toJSON = function () {
  const ticket = this.toObject();
  ticket.id = ticket._id;
  delete ticket._id;
  return ticket;
};

ticketSchema.statics.build = (ticket: { title: string; price: string }) =>
  new Ticket(ticket);

const Ticket = model<ITicket, ITicketModel>("ticket", ticketSchema);

export default Ticket;
