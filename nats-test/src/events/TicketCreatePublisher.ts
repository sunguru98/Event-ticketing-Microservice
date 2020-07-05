import Publisher from "./BasePublisher";
import Subjects from "./Subjects";
import TicketCreateEvent from "../event-types/TicketCreate";

class TicketCreatePublisher extends Publisher<TicketCreateEvent> {
  readonly subject: Subjects.TicketCreate = Subjects.TicketCreate;
}

export default TicketCreatePublisher;
