import { PrismaClient } from '@prisma/client'
import { getCompApp, getComp } from './componentApi'
import { getMenuApp } from './menuApi'
import { generateAppToken } from '../middlewares/jwtSign'
import logger from '../util/logger'
import { keyExists } from '../functions/arrayFunctions'

const prisma = new PrismaClient()
const libName = '[applicationApi]'

const selectApp = {
  id: true,
  shortName: true,
  fullName: true,
  urlLogo: true,
  urlMain: true,
  idCompany: true,
}

const selectApp3 = {
  idCompany: true,
  idApplication: true,
  description: true,
  PlatApplication: {
    select: {
      id: true,
      shortName: true,
      fullName: true,
      urlLogo: true,
      urlMain: true,
      idCompany: true,
    },
  },
}

///////////////Get Functions

export const getAppCriteria = async (app, criteria) => {
  const fName = `${libName} [getAppCriteria]`

  let data
  if (!keyExists(app.params, 'id')) {
    const error = `${fName} No id criteria`
    logger.error(error)
    return {
      success: false,
      error,
    }
  }

  try {
    logger.info(`${fName} Obteniendo [${criteria}]: ${app}`)
    data = await prisma.PlatApplication.findMany({
      where: {
        [criteria]: app.params.id,
      },
      select: selectApp,
    })
    logger.info(`${fName} Obtenido`)
    return {
      success: true,
      data,
    }
  } catch (error) {
    logger.error(`${fName} Error al obtener informacion de base de datos`)
    return {
      success: false,
      error,
    }
  }
}

export const getAppCli = async (app) => {
  const fName = `${libName} [getAppCli]`

  let data
  if (!keyExists(app.params, 'id')) {
    const error = `${fName} No id`
    logger.error(error)
    return {
      success: false,
      error,
    }
  }

  try {
    logger.info(`${fName} Obteniendo app: ${app}`)
    data = await prisma.PlatApplication.findMany({
      where: {
        PlatClient: {
          some: {
            idCompany: app.params.id,
          },
        },
      },
      select: selectApp,
    })
    logger.info(`${fName} Obtenido`)
    return {
      success: true,
      data,
    }
  } catch (error) {
    logger.error(`${fName} Error al obtener informacion de base de datos`)
    return {
      success: false,
      error,
    }
  }
}

export const getAppShortN = async (app) => {
  const fName = `${libName} [getAppShortN]`

  let data

  if (!keyExists(app.params, 'shortName')) {
    const error = `${fName} No shortName`
    logger.error(error)
    return {
      success: false,
      error,
    }
  }

  try {
    logger.info(`${fName} Obteniendo app: ${app.params.shortName}`)
    data = await prisma.PlatApplication.findMany({
      where: {
        shortName: app.params.shortName,
      },
      select: {
        id: true,
        shortName: true,
        fullName: true,
        urlLogo: true,
        urlMain: true,
        applicationSpecs: true,
        PlatClient: {
          select: {
            id: true,
            description: true,
            idCompany: true,
            clientSpecs: true,
            PlatCompany: {
              select: {
                shortName: true,
                name: true,
                description: true,
                urlLogo: true,
              },
            },
          },
        },
      },
    })
    logger.info(`${fName} Obtenido`)
    return {
      success: true,
      data,
    }
  } catch (error) {
    logger.error(`${fName} Error al obtener informacion de base de datos`)
    console.error(error)
    return {
      success: false,
      error,
    }
  }
}

export const getAppShortNCli = async (app) => {
  const fName = `${libName} [getAppShortNCli]`
  let data
  if (!keyExists(app.params, 'shortName')) {
    const error = `${fName} No shortName`
    logger.error(error)
    return {
      success: false,
      error,
    }
  }
  if (!keyExists(app.params, 'shortClient')) {
    const error = `${fName} No shorClient`
    logger.error(error)
    return {
      success: false,
      error,
    }
  }

  try {
    logger.info(`${fName} Obteniendo app: ${app.params.shortName} - ${app.params.shortClient}`)
    data = await prisma.PlatApplication.findMany({
      where: {
        shortName: app.params.shortName,
        PlatClient: {
          some: {
            PlatCompany: {
              shortName: app.params.shortClient,
            },
          },
        },
      },
      select: {
        id: true,
        shortName: true,
        fullName: true,
        urlLogo: true,
        urlMain: true,
        applicationSpecs: true,
        PlatClient: {
          where: {
            PlatCompany: {
              shortName: app.params.shortClient,
            },
          },
          select: {
            id: true,
            description: true,
            idCompany: true,
            clientSpecs: true,
            PlatCompany: {
              select: {
                shortName: true,
                name: true,
                description: true,
                urlLogo: true,
              },
            },
          },
        },
      },
    })
    if (data[0].PlatClient?.length === 0) {
      logger.error(`${fName} No client info`)
      return {
        success: false,
        error: 'No client info',
      }
    }
    data[0].clientDescription = data[0].PlatClient[0].PlatCompany
    data[0].clientDescription.idClient = data[0].PlatClient[0].id
    data[0].launchSpecs = { ...data[0].applicationSpecs, ...data[0].PlatClient[0].clientSpecs }
    delete data[0].applicationSpecs
    delete data[0].PlatClient

    logger.info(`${fName} Obtenido`)
    return {
      success: true,
      data,
    }
  } catch (error) {
    logger.error(`${fName} Error al obtener informacion de base de datos`)
    console.error(error)
    return {
      success: false,
      error,
    }
  }
}

export const getAppUsr = async (app) => {
  const fName = `${libName} [getAppUsr]`

  let data
  if (!keyExists(app.params, 'id')) {
    const error = `${fName} No id`
    logger.error(error)
    return {
      success: false,
      error,
    }
  }

  try {
    logger.info(`${fName} Obteniendo app: ${app}`)
    data = await prisma.PlatClient.findMany({
      where: {
        PlatUserClient: {
          some: {
            idUser: app.params.id,
          },
        },
      },
      select: selectApp3,
    })
    //Se coloca este segmento en comentario, por cambio en endpoint de servicio users  auth/login
    /*
    let comps
    for (let compCli in data) {
      for (comps in app.user[0].companies) {
        if (data[compCli].idCompany === app.user[0].companies[comps].company.id) {
          data[compCli].companyName = app.user[0].companies[comps].company.companyName
        }
      }
    }*/
    logger.info(`${fName} Obtenido`)
    return {
      success: true,
      data,
    }
  } catch (error) {
    logger.error(`${fName} Error al obtener informacion de base de datos`)
    console.error(error)
    return {
      success: false,
      error,
    }
  }
}

export const getAppUsrCli = async (app) => {
  const fName = `${libName} [getAppUsrCli]`

  let data

  if (!keyExists(app.params, 'idUser')) {
    const error = `${fName} No idUser`
    logger.error(error)
    return {
      success: false,
      error,
    }
  }

  if (!keyExists(app.params, 'idCompany')) {
    const error = `${fName} No idCompany`
    logger.error(error)
    return {
      success: false,
      error,
    }
  }

  try {
    logger.info(`${fName} Obteniendo app: ${app}`)
    data = await prisma.PlatApplication.findMany({
      where: {
        PlatClient: {
          some: {
            idCompany: app.params.idCompany,
            PlatUserClient: {
              some: {
                idUser: app.params.idUser,
              },
            },
          },
        },
      },
      select: selectApp,
    })
    for (let objsApp in data) {
      data[objsApp].idCompanyProvider = data[objsApp].idCompany
      delete data[objsApp].idCompany
    }
    logger.info(`${fName} Obtenido`)
    return {
      success: true,
      data,
    }
  } catch (error) {
    logger.error(`${fName} Error al obtener informacion de base de datos`)
    console.error(error)
    return {
      success: false,
      error,
    }
  }
}

export const getAppEst = async (app) => {
  const fName = `${libName} [getAppEst]`
  logger.info(`${fName} Iniciando`)

  let data = {}
  if (!keyExists(app.params, 'id')) {
    const error = `${fName} No id`
    logger.error(error)
    return {
      success: false,
      error,
    }
  }

  //Componentes
  let ret = await getCompApp(app)

  if (!ret?.success) {
    logger.error(`${fName} Bad call component`)
    return {
      success: false,
      error: 'Bad call component',
    }
  }
  if (ret.success === false) {
    logger.error(`${fName} Error load Components`)
    data.components = 'Error load Components'
  }
  data.components = ret.data
  // Menú
  ret = await getMenuApp(app)
  if (!ret?.success) {
    logger.error(`${fName} Bad call menu`)
    return {
      success: false,
      error: 'Bad call menu',
    }
  }
  if (ret.success === false) {
    logger.error(`${fName} Error load menu`)
    data.components = 'Error load menu'
  }
  data.menu = ret.data

  logger.info(`${fName} Terminado`)
  return {
    success: true,
    data,
  }
}

export const getAppRunnerEst = async (app) => {
  const fName = `${libName} [getAppRunnerEst]`

  let data = {}
  if (!keyExists(app.params, 'id')) {
    const error = `${fName} No id`
    logger.error(error)
    return {
      success: false,
      error,
    }
  }

  try {
    logger.info(`${fName} Obteniendo appRunnerEst: ${app}`)
    data = await prisma.PlatApplication.findUnique({
      where: {
        id: app.params.id,
      },
    })
    // Menú
    let ret = await getMenuApp(app)
    if (!ret?.success) {
      logger.error(`${fName} Bad call menu`)
      return {
        success: false,
        error: 'Bad call menu',
      }
    }
    data.menu = ret.data

    logger.info(`${fName} Obtenido`)
    return {
      success: true,
      data,
    }
  } catch (error) {
    logger.error(`${fName} Error al obtener informacion de base de datos`)
    console.error(error)
    return {
      success: false,
      error,
    }
  }
}

//////////////////Post Functions

export const postApp = async (app) => {
  const fName = `${libName} [postApp]`

  try {
    logger.info(`${fName} Insertando app: ${app}`)
    const data = await prisma.PlatApplication.create({
      data: app.body,
    })
    logger.info(`${fName} App insertada`)
    return {
      success: true,
      data,
    }
  } catch (error) {
    logger.error(`${fName} Error al insertar en base de datos`)
    console.error(error)
    return {
      success: false,
      data: error,
    }
  }
}

export const postAppLaunch = async (app) => {
  const fName = `${libName} [postAppLaunch]`

  try {
    logger.info(`${fName} appLunch`)
    return {
      success: true,
      data: generateAppToken(app.body),
    }
  } catch (error) {
    logger.error(`${fName} Error`)
    console.error(error)
    return {
      success: false,
      data: error,
    }
  }
}

//////////////////// Put Functions

export const putApp = async (app) => {
  const fName = `${libName} [postApp]`

  if (!keyExists(app.params, 'id')) {
    const error = `${fName} No id`
    logger.error(error)
    return {
      success: false,
      error,
    }
  }

  const { id } = app.params
  try {
    logger.info(`${fName} Realizando PUT`)
    app.body.updatedAt = new Date()
    const data = await prisma.PlatApplication.update({
      where: {
        id,
      },
      data: app.body,
    })
    logger.info(`${fName} PUT realizado`)
    return {
      success: true,
      data,
    }
  } catch (error) {
    logger.error(`${fName} Error al realizar PUT`)
    console.error(error)
    return {
      success: false,
      data: error,
    }
  }
}
