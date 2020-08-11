import { Publisher, TicketCreateEvent, Subjects } from "@scrtickets/common";

export class TicketCreatePublisher extends Publisher<TicketCreateEvent> {
  subject: Subjects.TicketCreate = Subjects.TicketCreate;
}
