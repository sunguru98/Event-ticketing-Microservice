import Subjects from "../events/Subjects";

export default interface TicketCreateEvent {
  subject: Subjects.TicketCreate;
  data: {
    title: string;
    price: number;
    userId: string;
    id: string;
  };
}
