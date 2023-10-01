import { Subjects, Publisher, TicketCreatedEvent } from "@ticketingservice/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
}       