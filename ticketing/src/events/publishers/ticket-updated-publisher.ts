import { Subjects, Publisher, TicketUpdatedEvent } from "@ticketingservice/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
}