import { Subjects, Publisher, ExpirationCompleteEvent } from "@ticketingservice/common";

export class ExpirationCompletePublisher extends Publisher< ExpirationCompleteEvent > {
    readonly subject = Subjects.ExpirationComplete
}