import { Router } from 'express'

import { validateTokenSingle } from '../middlewares/jwtValidate.js'

export const menuRouter = Router()

import { menuController } from '../controllers/menu.controller.js'

menuRouter.get('/:id', validateTokenSingle, menuController.getMenuApplication) // menú por id de aplicacion
//////////////////////////////////////////////////////
menuRouter.post('/', validateTokenSingle, menuController.postMenuApplication,)
//////////////////////////////////////////////////////
menuRouter.put('/:id', validateTokenSingle, menuController.putMenuApplication,)
//////////////////////////////////////////////////////
menuRouter.delete('/:id', validateTokenSingle, menuController.deleteMenuApplication,)