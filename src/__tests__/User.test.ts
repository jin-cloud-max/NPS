import request from 'supertest'
import app from '../app'

import createConnection from '../database'

describe('Users', () => {
  beforeAll(async () => {
    const connection = await createConnection()

    await connection.runMigrations()
  })

  afterAll(async () => {
    const connection = await createConnection()
    await connection.dropDatabase()
    await connection.close()
  })

  it('Should be able to create a new user', async () => {
    const user = await request(app).post('/user')
    .send({
      email: 'user@example.com',
      name: 'User'
    })

    expect(user.status).toBe(201) 
  })

  it('Should not be able to create a new user with exists e-mail', async () => {
    const user = await request(app).post('/user')
    .send({
      email: 'user@example.com',
      name: 'User'
    })

    expect(user.status).toBe(400) 
  })
})
