
import request from 'supertest'
import { app } from '../../app'
import mongoose, { set } from 'mongoose'
// import { Ticket } from '../../models/ticket'
import { natsWrapper } from '../../nats-wrapper'

it( 'returns a 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin() )
    .send({
        title: 'fjsd',
        price : 30
    })
        .expect(404)
    })
it( 'returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: 'fjsd',
            price : 30
        })
        .expect(401)
        
})
it( 'returns a 401 if the user doesnot own the ticket', async () => {
    const response = await request(app)
        .post(`/api/tickets`)
        .set('Cookie', global.signin() )
        .send({
            title: 'fjsd',
            price : 30
        })
    
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set( 'Cookie', global.signin())
        .send({
            title: 'fdhisij',
            price: 20
        })
        .expect( 401 )
})
it( 'returns a 400 if the user provided invalid title or price', async () => {
    const cookie = global.signin()
    
    const response = await request(app)
        .post(`/api/tickets`)
        .set('Cookie', cookie )
        .send({
            title: 'dsfshfuo',
            price : 30
        })

        
    await request(app)
        .put(`/api/tickets/${ response.body.id }`)
        .set('Cookie', cookie )
        .send({
            title: 'fdsjofj',
            price: -20
        })
        .expect(400)
})
it( 'updates the tickets provided valid inputs', async () => {
    const cookie = global.signin()
    
    const response = await request(app)
        .post(`/api/tickets`)
        .set('Cookie', cookie )
        .send({
            title: 'dsfshfuo',
            price : 30
        });
        
    await request(app)
        .put(`/api/tickets/${ response.body.id }`)
        .set('Cookie', cookie)
        .send({
            title: 'new ticket',
            price: 100
        })
        .expect(200)
    
    const ticketResponse = await request(app)
        .get(`/api/tickets/${ response.body.id }`)
        .send()
        .expect(200)
    expect(ticketResponse.body.title).toEqual('new ticket')
    expect(ticketResponse.body.price).toEqual(100)
})

it('publishes an event', async() => {
    const cookie = global.signin()
    
    const response = await request(app)
        .post(`/api/tickets`)
        .set('Cookie', cookie )
        .send({
            title: 'dsfshfuo',
            price : 30
        });
        
    await request(app)
        .put(`/api/tickets/${ response.body.id }`)
        .set('Cookie', cookie)
        .send({
            title: 'new ticket',
            price: 100
        })
        .expect(200)
    expect(natsWrapper.client.publish).toHaveBeenCalled()
})