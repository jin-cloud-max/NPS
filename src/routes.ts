import { Router } from 'express'
import UserController from './controllers/UserController'
import SurveyController from './controllers/SurveyController'
import SendMailController from './controllers/SendMailController'
import AnswersController from './controllers/AnswersController'
import NPSController from './controllers/NPSController'

const router = Router()

const userController = new UserController()
const suveryControlller = new SurveyController()
const sendMailController = new SendMailController()
const answersController = new AnswersController()
const npsController = new NPSController()

router.post('/user', userController.create)

router.post('/survey', suveryControlller.create)
router.get('/survey', suveryControlller.index)

router.post('/send-mail', sendMailController.execute)

router.get('/answers/:value', answersController.execute)

router.get('/nps/:survey_id', npsController.execute)

export default router
