import { Request, Response, NextFunction } from "express";
import Ticket from "./models/Ticket";

interface TicketRes {
  // id: string;
  // title: string;
  // price: string;
  // createdAt: Date;
  // updatedAt: Date;
}

interface TicketErrorRes {
  errors: [{ message: string; field?: string }];
}

interface TicketReq {
  title: string;
  price: string;
}

export const createTicket = async (
  req: Request<any, TicketRes | TicketErrorRes, TicketReq>,
  res: Response<TicketRes | TicketErrorRes>
) => {
  const { title, price } = req.body;
  const ticket = Ticket.build({ title, price });
  ticket.userId = req.user!.id;
  await ticket.save();
  res.status(201).json(ticket);
};

export const updateTicket = async (
  req: Request<any, TicketRes | TicketErrorRes, TicketReq>,
  res: Response<TicketRes | TicketErrorRes>
) => {
  const { title, price } = req.body;
  res.json({});
};

export const getTicket = async (
  req: Request<any, TicketRes | TicketErrorRes, TicketReq>,
  res: Response<TicketRes | TicketErrorRes>
) => {
  res.json({});
};

export const getTickets = async (
  req: Request<any, TicketRes | TicketErrorRes, TicketReq>,
  res: Response<TicketRes | TicketErrorRes>
) => {
  res.json({});
};
