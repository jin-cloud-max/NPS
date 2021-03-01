import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import SurveyUserRepository from "../repositories/SurveyUserRepository";

export default class AnswersController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { value } = request.params
    const { u } = request.query

    const surveysUsersReposiotry = getCustomRepository(SurveyUserRepository)

    const surveyUser = await surveysUsersReposiotry.findOne({
      where: {
        id: String(u)
      }
    })

    if (!surveyUser) {
      return response.status(400).json({
        error: 'Survey User does not exists!'
      })
    }

    surveyUser.value = Number(value)

    await surveysUsersReposiotry.save(surveyUser)
    
    return response.json(surveyUser)
  }
}
