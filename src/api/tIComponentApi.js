import { PrismaClient } from '@prisma/client'
import logger from '../util/logger'

const prisma = new PrismaClient()

///////////////Get Functions

const libName = '[tIComponentApi]'

//////Get TIComponent Functions
export const getTIComp = async (tIComp) => {
  const fName = `${libName} [getTIComp]`
  if (!tIComp?.params?.component) {
    logger.error(`${fName} No params`)
    return {
      success: false,
      error: 'No params',
    }
  }
  let data
  try {
    data = await prisma.PlatTIComponent.findMany({
      where: {
        componentName: tIComp.params.component,
      },
      select: {
        id: true,
        componentName: true,
        description: true,
        componentSpecs: true,
      },
    })
    logger.info(`${fName} Obtenido`)
    return {
      success: true,
      data,
    }
  } catch (error) {
    logger.error(`${fName} Error al obtener información de la base de datos`)
    console.error(error)
    return {
      success: false,
      error,
    }
  }
}

export const getTICompRec = async (tIComp) => {
  const fName = `${libName} [getTICompRec]`
  if (!tIComp?.params?.component) {
    logger.error(`${fName} No params`)
    return {
      success: false,
      error: 'No params',
    }
  }
  try {
    let data = await getTIcomponentRec(tIComp.params.component, null, 0)
    logger.info(`${fName} Obtenido`)
    if (!data.length) {
      return {
        success: false,
        error: 'Not found',
      }
    }
    return {
      success: true,
      data,
    }
  } catch (error) {
    logger.error(`${fName} Error al obtener información de la base de datos`)
    console.error(error)
    return {
      success: false,
      error,
    }
  }
}

///// Para obtener TIComponents manera recursiva
export const getTIcomponentRec = async (componentName, idParent, factor) => {
  const fName = `${libName} [getTIcomponentRec]`
  try {
    let data
    factor ?
      data = await prisma.PlatTIComponent.findMany({
        where: {
          idParent
        },
        select: {
          id: true,
          componentName: true,
          description: true,
          componentSpecs: true,
        },
      }) :
      data = await prisma.PlatTIComponent.findMany({
        where: {
          componentName
        },
        select: {
          id: true,
          componentName: true,
          description: true,
          componentSpecs: true,
        },
      })
    if (Object.keys(data).length) {
      //El elemento existe
      for (let i = 0; i < Object.keys(data).length; i++) {
        data[i].subComponent = await getTIcomponentRec(undefined, data[i].id, 1)
      }
      return data
    } else {
      return data
    }
  } catch (error) {
    logger.error(`${fName} Error al obtener informacion de la base de datos`)
    return {
      data: [],
    }
  }
}

//////////////////Post Functions

export const postTIComp = async (tIComp) => {
  const fName = `${libName} [postTIComp]`
  try {
    logger.info(`${fName} Insertando TIComponent`)
    const data = await prisma.PlatTIComponent.create({
      data: tIComp.body,
    })
    logger.info(`${fName} Insertado`)
    return {
      success: true,
      data,
    }
  } catch (error) {
    logger.error(`${fName} Error al insertar informacion de la base de datos`)
    console.error(error)
    return {
      success: false,
      data: error,
    }
  }
}

//////////////////// Put Functions
