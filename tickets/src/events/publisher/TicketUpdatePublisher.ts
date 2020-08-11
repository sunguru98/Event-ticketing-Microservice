import { TicketUpdateEvent, Subjects, Publisher } from "@scrtickets/common";

export class TicketUpdatePublisher extends Publisher<TicketUpdateEvent> {
  subject: Subjects.TicketUpdate = Subjects.TicketUpdate;
}
