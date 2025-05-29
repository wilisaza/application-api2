import { Router } from 'express'

import { validateTokenSingle } from '../middlewares/jwtValidate.js'

export const metaDataRouter = Router()

import { metaDataController } from '../controllers/metaData.controller.js'

metaDataRouter.get('/:idApplication', validateTokenSingle, metaDataController.getMetaDataApplication) // metaData por id de aplicacion

metaDataRouter.get('/:paramName/:paramValue', validateTokenSingle, metaDataController.getMetaDataParameter) // metaData por parámetro

//////////////////////////////////////////////////////

metaDataRouter.post('/', validateTokenSingle, metaDataController.postMetaDataApplication) // insertar metaData

//////////////////////////////////////////////////////

metaDataRouter.put('/:id', validateTokenSingle, metaDataController.putMetaDataApplication) // editar metaData
