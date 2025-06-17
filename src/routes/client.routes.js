import { Router } from 'express'

import { validateTokenFull, validateTokenSingle } from '../middlewares/jwtValidate.js'

export const clientRouter = Router()

import { cliController } from '../controllers/client.controller.js'

clientRouter.get('/alternateUser/:altUser', cliController.getAltCliUser) //compañias por usuario alterno

clientRouter.get('/user/:id', validateTokenFull, cliController.getCliUser) //compañias por usuario

clientRouter.get('/noPlatUser/:idClient', cliController.getNoPlatUser) //el cliente posee gestión de usuarios no plataforma

clientRouter.post('/', validateTokenSingle, cliController.postClient)

clientRouter.post('/userclient', validateTokenSingle, cliController.postUserClient)
