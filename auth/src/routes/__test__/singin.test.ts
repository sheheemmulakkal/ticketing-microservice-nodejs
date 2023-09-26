import request from 'supertest'
import { app } from '../../app'

it ('Fails when a email that does not exist is entered', async () => {
    return request(app)
        .post('/api/users/signin')
        .send({
            email : "test@test.com",
            password : 'password'
        })
        .expect(400);
})

it ('Fails when enter an incorrect password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email : "test@test.com",
            password : 'password'
        })
        .expect(201);
 
    await request(app)
        .post('/api/users/signin')
        .send({
            email : "test@test.com",
            password : '36654654'
        })
        .expect(400);
})


it ('Response with a cookie when give valid email and password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email : "test@test.com",
            password : 'password'
        })
        .expect(201);
    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email : "test@test.com",
            password : 'password'
        })
        .expect(200);
    expect( response.get( 'Set-Cookie')).toBeDefined()
})