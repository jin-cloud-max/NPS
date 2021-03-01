import { Request, Response } from 'express'

import { getCustomRepository } from 'typeorm'
import UserRepository from '../repositories/UserRepository'

import * as yup from 'yup'

import userView from '../views/user_view'

export default class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body

    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
    })

    try {
      await schema.validate(request.body, { abortEarly: false })
    } catch (err) {
       return response.status(400).json({
        error: err
      })
    }

    const userRepository = getCustomRepository(UserRepository)

    const userAlreadyExist = await userRepository.findOne({
      where: {
        email
      }
    })

    if (userAlreadyExist) {
      return response.status(400).json({
        error: 'User already exist'
      })
    }

    const user = userRepository.create({
      name,
      email
    })

    await userRepository.save(user)

    return response.status(201).json(userView.render(user))
  }
}
