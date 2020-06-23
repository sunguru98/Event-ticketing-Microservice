import { Router } from "express";
import { check } from "express-validator";
import { authenticate, validateRequest } from "@scrtickets/common";
import {
  createTicket,
  updateTicket,
  getTickets,
  getTicketById
} from "./tickets.controller";

const router = Router();

// @route - POST /api/tickets
// @desc - Create a new event ticket
// @auth - Private
router.post(
  "/",
  authenticate,
  [
    check("price", "Price is required").not().isEmpty(),
    check("title", "Title is required").not().isEmpty(),
    check("price", "Price is invalid").custom(val => val > 0)
  ],
  validateRequest,
  createTicket
);

// @route - PUT /api/tickets/:id
// @desc - Update an event ticket
// @auth - Private
router.put(
  "/:id",
  authenticate,
  [
    check("price", "Price is required").not().isEmpty(),
    check("title", "Title is required").not().isEmpty(),
    check("price", "Price is invalid").isFloat({ gt: 0 })
  ],
  validateRequest,
  updateTicket
);

// @route - GET /api/tickets/:id
// @desc - Get a certain event ticket
// @auth - Public
router.get("/:id", authenticate, getTicketById);

// @route - GET /api/tickets
// @desc - GET all event tickets
// @auth - Private
router.get("/", authenticate, getTickets);

export default router;
