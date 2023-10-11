import { Message } from 'node-nats-streaming'
import mongoose from 'mongoose'
import { Subjects, Listener, TicketUpdatedEvent } from '@ticketingservice/common'
import { Ticket } from '../../models/ticket'
import { queueGroupName } from './queue-group-name'

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent>{
    readonly subject = Subjects.TicketUpdated
    queueGroupName = queueGroupName
    async onMessage (data: TicketUpdatedEvent['data'], msg: Message ) {
        // const id  =  mongoose.Types.ObjectId(data.id)
        
        const ticket = await Ticket.findOne( {_id: new mongoose.Types.ObjectId(data.id)} )
        if( !ticket ) {
            throw new Error('Ticket not found')
        }

        const { title, price } = data
        ticket.set({ title, price })
        await ticket.save()

        msg.ack()
    }
}