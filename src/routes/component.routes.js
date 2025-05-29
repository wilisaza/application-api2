import { Router } from 'express'

import { validateTokenSingle } from '../middlewares/jwtValidate.js'

export const componentRouter = Router()

import { compController } from '../controllers/component.controller.js'

componentRouter.get('/app/:id', validateTokenSingle, compController.getComponents) // Componentes por aplicacion

componentRouter.get('/:id', validateTokenSingle, compController.getComponent) // componente por id

componentRouter.get('/:id/:version', validateTokenSingle, compController.getCompVersion,) // componente por id

componentRouter.get('/ticomponent/properties/:component', validateTokenSingle, compController.getPropComponent,)

componentRouter.get('/ticomponent/:component', validateTokenSingle, compController.getTIComponent,)

/////////////////////////////////////////////////////////////////////////
componentRouter.post('/', validateTokenSingle, compController.postComponent,)

componentRouter.post('/validate/:component', validateTokenSingle, compController.postValidateComponent)

componentRouter.post('/ticomponent/properties', validateTokenSingle, compController.postPropComponent,)

componentRouter.post('/ticomponent', validateTokenSingle, compController.postTIComponent)

///////////////////////////////////////////////////////////////////////////////
componentRouter.put('/:id', validateTokenSingle, compController.putComponent)
