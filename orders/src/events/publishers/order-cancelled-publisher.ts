import { Publisher, OrderCancelledEvent, Subjects } from "@ticketingservice/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;
}

