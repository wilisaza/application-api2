import { Router } from 'express'
import { validateTokenSingle } from '../middlewares/jwtValidate.js'
import { tICompController } from '../controllers/tICcomponent.controller.js'

export const tIComponentRouter = Router()
///////////////////////////////////////////////////////////////////////////////

tIComponentRouter.get('/:component', validateTokenSingle, tICompController.getTIComponent,)

tIComponentRouter.get('/recursive/:component', validateTokenSingle, tICompController.getTIComponentRec,)

/////////////////////////////////////////////////////////////////////////

tIComponentRouter.post('/', validateTokenSingle, tICompController.postTIComponent)

///////////////////////////////////////////////////////////////////////////////
