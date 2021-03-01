import { Request, Response } from 'express'

import { getCustomRepository } from 'typeorm'

import path from 'path'

import SurveyRepository from '../repositories/SurveyRepository'
import SurveyUserRepository from '../repositories/SurveyUserRepository'
import UserRepository from '../repositories/UserRepository'
import SendMailsService from '../service/SendMailsService'

import surveyUserView from '../views/survey_user_view'

export default class SendMailController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { email, survey_id } = request.body

    const userRepository = getCustomRepository(UserRepository)
    const surveyRepository = getCustomRepository(SurveyRepository)
    const surveyUserRepository = getCustomRepository(SurveyUserRepository)
    const npsPath = path.resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs') 


    
    const checkUser = await userRepository.findOne({
      where: {
        email
      }
    })

    if (!checkUser) {
      return response.status(404).json({
        error: 'This e-mail does not exist'
      })
    }

    const checkSurvey = await surveyRepository.findOne({
      id: survey_id
    })

    if (!checkSurvey) {
      return response.status(404).json({
        error: 'This survey does not exist'
      })
    }

    const variables = {
      name: checkUser.name,
      title: checkSurvey.title,
      description: checkSurvey.description,
      id: "",
      link: process.env.URL_MAIL
    }

    const surveyUserAlreadyExist = await surveyUserRepository.findOne({
      where: { user_id: checkUser.id , value: null },
      relations: ['user', 'survey']
    })

    if (surveyUserAlreadyExist) {
      variables.id = surveyUserAlreadyExist.id

      await SendMailsService.execute(
        email,
        checkSurvey.title,
        variables,
        npsPath
      )

      return response.json(surveyUserView.render(surveyUserAlreadyExist))
    }

    const surveyUser = surveyUserRepository.create({
      user_id: checkUser.id,
      survey_id
    })

    await surveyUserRepository.save(surveyUser)

    variables.id = surveyUser.id    

    await SendMailsService.execute(
      email,
      checkSurvey.title,
      variables,
      npsPath,
    )

    return response.json(surveyUserView.render(surveyUser))
  }
}
