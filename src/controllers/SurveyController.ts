import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import SurveyRepository from '../repositories/SurveyRepository'
import surveyView from '../views/survey_view'

export default class SurveyController {
  async create(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body

    const surveyRepository = getCustomRepository(SurveyRepository)


    const survey = surveyRepository.create({
      title,
      description
    })

    await surveyRepository.save(survey)

    return response.status(201).json(surveyView.render(survey))
  }

  async index(_request: Request, response: Response): Promise<Response> {
    const surveyRepository = getCustomRepository(SurveyRepository)

    const listSurveys = await surveyRepository.find()

    return response.json(surveyView.renderMany(listSurveys))
  }
}
