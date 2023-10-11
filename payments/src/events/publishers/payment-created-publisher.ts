import { Subjects, PaymentCreatedEvent, Publisher } from "@ticketingservice/common";

export class PaymentCreatedPublisher extends Publisher< PaymentCreatedEvent > {
    readonly subject = Subjects.PaymentCreated
}