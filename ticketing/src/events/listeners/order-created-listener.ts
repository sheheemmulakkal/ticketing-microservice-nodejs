import { Listener, OrderCreatedEvent, Subjects } from "@ticketingservice/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";


export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
    queueGroupName = queueGroupName

    async onMessage( data: OrderCreatedEvent['data'], msg: Message) {
        // Find the ticket that the order is reserving
        console.log('hey tickets');
        
        const ticket = await Ticket.findById( data.ticket.id )

        console.log('ticket');
        // If no ticket throw error
        if( !ticket ) {
            throw new Error('Ticket not found')
        }

        // Mark the ticket as being reserved by setting its orderId property
        ticket.set({ orderId: data.id })
        console.log('set');

        // Save the ticket
        await ticket.save()
        console.log('saved');

        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            price: ticket.price,
            title: ticket.title,
            userId: ticket.userId,
            orderId: ticket.orderId,
            version: ticket.version 
        })
        
        msg.ack();
    }
}