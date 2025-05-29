import { Router } from 'express'

import {
  validateTokenFull,
  validateTokenSingle,
} from '../middlewares/jwtValidate.js'

export const applicationRouter = Router()

import { appController } from '../controllers/application.controller.js'

applicationRouter.get('/provider/:id', validateTokenSingle, appController.getAppProvider,) //aplicaciones por compañia proveedora/fabricante

applicationRouter.get('/client/:id', validateTokenSingle, appController.getAppClient,) //aplicaciones por compañia cliente

applicationRouter.get('/shortName/:shortName', appController.getAppShortName) //aplicación por shortName

applicationRouter.get('/shortName/:shortName/:shortClient', appController.getAppShortNameClient) //aplicación por shortName y shortClient

applicationRouter.get('/user/:id', validateTokenFull, appController.getAppUser) //aplicaciones por usuario

applicationRouter.get('/userclient/:idUser/:idCompany', validateTokenSingle, appController.getAppUserClient,) //aplicaciones por usuario y compañía

applicationRouter.get('/:id', validateTokenSingle, appController.getApplication) // aplicacion por id

applicationRouter.get('/struct/:id', validateTokenSingle, appController.getAppEstruct,) // estructura de la aplicacion por idApp

applicationRouter.get('/runnerStruct/:id', validateTokenSingle, appController.getAppRunnerEstruct,) // estructura de la aplicacion para el runner

/////////////////////////////////////////////////////////////////////////////
applicationRouter.post('/', validateTokenSingle, appController.postApplication,)

applicationRouter.post('/launch', validateTokenSingle, appController.postApplicationLaunch,) //Retorno del id para lanzar una aplicación
////////////////////////////////////////////////////////////////////////

applicationRouter.put('/:id', validateTokenSingle, appController.putApplication)
