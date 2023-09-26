import request from 'supertest'
import { app } from '../../app'

it ('returns a 201 on successfull signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email : "test@test.com",
            password : 'password'
        })
        .expect(201);
})

it ('returns a 400 on Invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email : "tesom",
            password : 'password'
        })
        .expect(400);
})

it ('returns a 400 on Invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email : "tesoW@gmail.cm",
            password : 'pa'
        })
        .expect(400);
})

it ('returns a 400 on Invalid email or password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email : "tesoW@gmail.cm"
        })
        .expect(400);
    await request(app)
        .post('/api/users/signup')
        .send({
            password : 'password'
        })
        .expect(400);
})

it ( 'disallows duplicate emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email : "test@test.com",
            password : 'password'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signup')
        .send({
            email : "test@test.com",
            password : 'password'
        })
        .expect(400);
})

it ( 'set cookie after succesfull signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email : "test@test.com",
            password : 'password'
        })
        .expect(201);
    expect( response.get( 'Set-Cookie' )).toBeDefined()
} ) 