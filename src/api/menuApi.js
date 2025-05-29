import { PrismaClient } from '@prisma/client'
import logger from '../util/logger'

const prisma = new PrismaClient()

const libName = '[menuApi]'

///////////////Get Functions

export const getMenuApp = async (menuApp) => {
  const fName = `${libName} [getMenuApp]`

  let data
  try {
    if (!menuApp?.params?.id) {
      logger.error(`${fName} No params`)
      return {
        success: false,
        error: 'No params',
      }
    }
    data = await getMenuAppRec(menuApp.params.id, null)
    return {
      success: true,
      data,
    }
  } catch (error) {
    logger.error(`${fName} Error al obtener menu de la app`)
    console.error(error)
    return {
      success: false,
      data: error,
    }
  }
}

///// Para obtener el menú de manera recursiva
export const getMenuAppRec = async (idApp, idParent) => {
  const fName = `${libName} [getMenuAppRec]`

  try {
    logger.info(`${fName} Obteniendo menu application`)
    let data = await prisma.PlatMenuApplication.findMany({
      where: {
        AND: [{ idApplication: idApp }, { idParent }],
      },
      select: {
        id: true,
        menuGroup: true,
        idParent: true,
        optionName: true,
        description: true,
        execType: true,
        execCall: true,
        execParams: true,
      },
    })
    logger.info(`${fName} Obtenido`)
    if (Object.keys(data).length) {
      //El elemento existe
      for (let i = 0; i < Object.keys(data).length; i++) {
        //console.log(data[i]);
        //data[i].subMenu =[];
        data[i].subMenu = await getMenuAppRec(data[i].idApplication, data[i].id)
      }
      return data
    } else {
      return data
    }
  } catch (error) {
    logger.error(`${fName} Error al obtener informacion de la base de datos`)
    console.error(error)
    return {
      data: [],
    }
  }
}

//////////////////Post Functions

export const postMenuApp = async (menuApp) => {
  const fName = `${libName} [postMenuApp]`

  try {
    logger.info(`${fName} Insertando menu application`)
    const data = await prisma.PlatMenuApplication.create({
      data: menuApp.body,
    })
    logger.info(`${fName} POST ejecutado`)
    return {
      success: true,
      data,
    }
  } catch (error) {
    logger.error(`${fName} Error al insertar menu application`)
    console.error(error)
    return {
      success: false,
      data: error,
    }
  }
}

//////////////////Put Functions

export const putMenuApp = async (menuApp) => {
  const fName = `${libName} [putMenuApp]`
  const {id} = menuApp.params
  try {
    logger.info(`${fName} Actualizando menu application`)
    const data = await prisma.PlatMenuApplication.update({
      where: {
        id
      },
      data: menuApp.body,
    })
    logger.info(`${fName} PUT ejecutado`)
    return {
      success: true,
      data,
    }
  } catch (error) {
    logger.error(`${fName} Error al actualizar menu application`)
    console.error(error)
    return {
      success: false,
      data: error,
    }
  }
}

//////////////////Delete Functions

export const deleteMenuApp = async (menuApp) => {
  const fName = `${libName} [putMenuApp]`
  const {id} = menuApp.params
  try {
    logger.info(`${fName} Actualizando menu application`)
    const data = await prisma.PlatMenuApplication.delete({
      where: {
        id
      }
    })
    logger.info(`${fName} DELETE ejecutado`)
    return {
      success: true,
      data,
    }
  } catch (error) {
    logger.error(`${fName} Error al eliminar menu application`)
    console.error(error)
    return {
      success: false,
      data: error,
    }
  }
}
