import { Request, Response } from "express";
import { NotFoundError, BadRequestError } from "@scrtickets/common";
import Ticket, { ITicket } from "./models/Ticket";
import { TicketCreatePublisher } from "./events/publisher/TicketCreatePublisher";
import { natsWrapper } from "./utils/natsWrapper";
import { TicketUpdatePublisher } from "./events/publisher/TicketUpdatePublisher";

interface TicketRes {
  id: string;
  title: string;
  price: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface TicketErrorRes {
  errors: [{ message: string; field?: string }];
}

interface TicketReq {
  title: string;
  price: number;
}

export const createTicket = async (
  req: Request<any, TicketRes | TicketErrorRes, TicketReq>,
  res: Response<TicketRes | TicketErrorRes>
) => {
  const { title, price } = req.body;
  const ticket = Ticket.build({ title, price });
  ticket.userId = req.user!.id;
  await ticket.save();
  new TicketCreatePublisher(natsWrapper.client).publish({
    title: ticket.title,
    price: ticket.price,
    userId: ticket.userId,
    id: ticket.id
  });
  res.status(201).json(ticket);
};

export const updateTicket = async (
  req: Request<{ id: string }, TicketRes | TicketErrorRes, TicketReq>,
  res: Response<TicketRes | TicketErrorRes>
) => {
  try {
    const { title, price } = req.body;
    const { id } = req.params;
    const ticket = await Ticket.findOneAndUpdate(
      { userId: req.user!.id, _id: id },
      { $set: { title, price } },
      { new: true }
    );
    if (!ticket) throw new Error("Ticket not found");
    const response = await new TicketUpdatePublisher(
      natsWrapper.client
    ).publish({
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      id: ticket.id
    });
    console.log(response);
    res.status(202).json(ticket);
  } catch (err) {
    if (err.name === "CastError")
      throw new BadRequestError("Invalid ticket ID");
    else if (err.message === "Ticket not found")
      throw new NotFoundError(err.message);
    throw new Error(err.message);
  }
};

export const getTicketById = async (
  req: Request<{ id: string }, TicketRes | TicketErrorRes, TicketReq>,
  res: Response<TicketRes | TicketErrorRes>
) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findById(id);
    if (!ticket) throw "Ticket not found";
    return res.json(ticket);
  } catch (err) {
    if (err.name === "CastError")
      throw new BadRequestError("Invalid ticket ID");
    else if (err.message === "Ticket not found")
      throw new NotFoundError(err.message);
    throw new Error(err.message);
  }
};

export const getTickets = async (
  _: Request<any, TicketRes | TicketErrorRes, TicketReq>,
  res: Response<ITicket[] | TicketErrorRes>
) => {
  const tickets = await Ticket.find({});
  return res.json(tickets);
};
