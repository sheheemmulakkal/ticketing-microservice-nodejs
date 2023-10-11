import { Ticket } from "../ticket";
it('implements optimistic cuncurrency control', async () => {
    // Create instance of a ticket 
    const ticket = Ticket.build({
        title: 'concert',
        price: 5,
        userId: '132'
    })

    // Save ticket to the database
    ticket.save()

    //fetch the ticket twice 
    const firstInstance = await Ticket.findById( ticket.id )
    const secondInstance = await Ticket.findById( ticket.id )


    // make two seperate changes to the tickets we fetched
    firstInstance!.set({ price: 10 })
    secondInstance!.set({ price: 15 })

    // save the first fetched ticket
    await firstInstance!.save()
    
    // save the second fetched ticket
    try {
        await secondInstance!.save()
    } catch (error) {
        return;
    }
    
    throw new Error('Should not reach this point ')

})

it('increments the version number on multiple saves', async() => {
    const ticket = Ticket.build({
        title: 'ticket',
        price: 20,
        userId: '12432'
    })
    await ticket.save()
    expect(ticket.version).toEqual(0)
    await ticket.save()
    expect(ticket.version).toEqual(1)
    await ticket.save()
    expect(ticket.version).toEqual(2)
})