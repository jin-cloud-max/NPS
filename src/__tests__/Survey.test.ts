import request from 'supertest'
import app from '../app'

import createConnection from '../database'

describe('Survey', () => {
  beforeAll(async () => {
    const connection = await createConnection()

    await connection.runMigrations()
  })

  afterAll(async () => {
    const connection = await createConnection()
    await connection.dropDatabase()
    await connection.close()
  })

  it('Should be able to create a new survey', async () => {
    const survey = await request(app).post('/survey')
    .send({
      title: 'Title example',
      description: 'Example'
    })

    expect(survey.status).toBe(201)
    expect(survey.body).toHaveProperty('id')
  })

  
})
