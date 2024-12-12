import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import logger from '../util/logger'
import { getTICompRec } from './tIComponentApi'
import { valComponentSpecs } from '../functions/valComponentFunctions'
import { valKeys } from '../functions/arrayFunctions'

const prisma = new PrismaClient()

///////////////Get Functions

const libName = '[componentApi]'

/** Obtener los compoentes de una aplicación */
export const getCompApp = async (comp) => { 
  const fName = `${libName} [getCompApp]`

  let data
  try {
    if (comp?.params?.id) {
      logger.info(`${fName} Obteniendo componentes de app`)
      data = await prisma.PlatComponent.findMany({
        where: {
          PlatApplication: {
            is: {
              id: comp.params.id,
            },
          },
        },
        distinct: ['idComponent'],
        orderBy: { version: 'desc' },
      })

      logger.info(`${fName} Obtenido`)
      return {
        success: true,
        data,
      }
    } else {
      logger.error(`${fName} No params`)
      return {
        success: false,
        error: 'No params',
      }
    }
  } catch (error) {
    logger.error(`${fName} Error al obtener informacion de la base de datos`)
    console.error(error)
    return {
      success: false,
      data: error,
    }
  }
}

export const getComp = async (comp) => {
  const fName = `${libName} [getComp]`

  let data
  try {
    if (comp?.params?.id) {
      logger.info(`${fName} Obteniendo componente`)
      data = await prisma.PlatComponent.findMany({
        where: {
          idComponent: comp.params.id,
        },
        orderBy: { version: 'desc' },
        take: 1,
        select: {
          id: true,
          description: true,
          idComponent: true,
          componentType: true,
          version: true,
          specification: true,
        },
      })
      logger.info(`${fName} Obtenido`)
      return {
        success: true,
        data,
      }
    } else {
      logger.error(`${fName} No params`)
      return {
        success: false,
        error: 'No params',
      }
    }
  } catch (error) {
    logger.error(`${fName} Error al obtener informacion de la base de datos`)
    console.error(error)
    return {
      success: false,
      data: error,
    }
  }
}

///get props of the comps

export const getPropComp = async (propComp) => {
  const fName = `${libName} [getPropComp]`

  let data
  try {
    if (propComp?.params?.component) {
      logger.info(`${fName} Obteniendo propComponent de app`)
      data = await prisma.PlatTIComponentProperty.findMany({
        where: {
          PlatTIComponent: {
            componentName: propComp.params.component,
          },
        },
        select: {
          id: true,
          propertyName: true,
          propertyType: true,
          description: true,
          componentPropertySpecs: true
        },
      })
      logger.info(`${fName} Obtenido`)
      return {
        success: true,
        data,
      }
    } else {
      logger.error(`${fName} No params`)
      return {
        success: false,
        error: 'No params',
      }
    }
  } catch (error) {
    logger.error(`${fName} Error al obtener informacion de la base de datos`)
    console.error(error)
    return {
      success: false,
      data: error,
    }
  }
}

export const getCompVers = async (comp) => {
  const fName = `${libName} [getCompVers]`

  let data
  try {
    if (comp?.params?.id && comp?.params?.version) {
      logger.info(`${fName} Obteniendo version de compania de app`)
      data = await prisma.PlatComponent.findMany({
        where: {
          AND: [{ version: Number(comp.params.version) }, { idComponent: comp.params.id }],
        },
        select: {
          id: true,
          description: true,
          idComponent: true,
          componentType: true,
          version: true,
          specification: true,
        },
      })
      logger.info(`${fName} Obtenido`)
      return {
        success: true,
        data,
      }
    } else {
      logger.error(`${fName} No params`)
      return {
        success: false,
        error: 'No params',
      }
    }
  } catch (error) {
    logger.error(`${fName} Error al obtener informacion de la base de datos`)
    console.error(error)
    return {
      success: false,
      data: error,
    }
  }
}

///////////////Get TIComponent Functions

export const getTIComp = async (tIComp) => {
  const fName = `${libName} [getTIComp]`

  let data
  try {
    if (!tIComp?.params?.component) {
      logger.error(`${fName} No params`)
      return {
        success: false,
        error: 'No params',
      }
    }
    data = await getTIcomponentRec(tIComp.params.component, null)
    logger.info(`${fName} Obtenido`)
    return {
      success: true,
      data,
    }
  } catch (error) {
    logger.error(`${fName} Error al obtener informacion de la base de datos`)
    console.error(error)
    return {
      success: false,
      data: error,
    }
  }
}

///// Para obtener el menú de manera recursiva
export const getTIcomponentRec = async (componentName, idParent) => {
  const fName = `${libName} [getTIcomponentRec]`

  try {
    logger.info(`${fName} Obteniendo TIcomponentRec`)
    let data = await prisma.PlatTIComponent.findMany({
      where: {
        OR: [{ componentName }, { idParent }],
      },
      select: {
        id: true,
        componentName: true,
        description: true,
      },
    })
    logger.info(`${fName} Obtenido`)
    if (Object.keys(data).length) {
      //El elemento existe
      for (let i = 0; i < Object.keys(data).length; i++) {
        //console.log(data[i]);
        //data[i].subMenu =[];
        data[i].subComponent = await getTIcomponentRec(undefined, data[i].id)
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

//// Para obtener el valor del consecutivo de versión
export const getMaxVersion = async (idComp) => {
  const fName = `${libName} [getMaxVersion]`
  try {
    logger.info(`${fName} Obteniendo maxVersion`)
    let data = await prisma.PlatComponent.aggregate({
      _max: { version: true },
      where: {
        idComponent: idComp,
      },
    })
    let { version } = data._max
    logger.info(`${fName} Obtenido`)
    return version
  } catch (error) {
    logger.error(`${fName} Error al obtener informacion de la base de datos`)
    console.error(error)
    return -1
  }
}

//////////////////Post Functions

export const postComp = async (comp) => {
  const fName = `${libName} [postComp]`

  try {
    logger.info(`${fName} Insertando componente`)
    comp.body.idComponent = uuidv4()
    comp.body.version = 1
    const data = await prisma.PlatComponent.create({
      data: comp.body,
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

export const postTIComp = async (tIComp) => {
  const fName = `${libName} [postTIComp]`
  try {
    logger.info(`${fName} Insertando TIcompania`)
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

export const postPROPComp = async (propComp) => {
  const fName = `${libName} [postPROPComp]`

  try {
    logger.info(`${fName} Insertando propiedad de componente`)
    const data = await prisma.PlatComponentProperty.create({
      data: propComp.body,
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

export const postValidateComp = async (tIComp) => {
  const fName = `${libName} [postValidateComp]`
  let error = {}
  if (!valKeys(tIComp.body, [ 'componentStruct' ], error)) {
    return {
      success: false,
      error,
    }
  }
  try {
    logger.info(`${fName} Validando Component ${tIComp.params.component}`)
    let tIComponentStruct = await getTICompRec(tIComp)
    if (tIComponentStruct.success && !tIComponentStruct?.data?.length) {
      logger.error(`${fName} No se encontró el componente`)
      return {
        success: false,
        error: 'No se encontró el componente',
      }
    }
    if (!tIComponentStruct.success) {
      logger.error(`${fName} Error al obtener información del componente`)
      return {
        success: false,
        error: 'Error al obtener información del componente',
      }
    }
    let vCS = valComponentSpecs(tIComponentStruct.data[0], tIComp.body.componentStruct) 
    if (!vCS[0]){
      logger.error(`${fName} Error al validar estructura de componente`)
      return {
        success: false,
        error: vCS[1],
      }
    }
    logger.info(`${fName} Componente validado`)
    return {
      success: true,
      data: 'Componente validado',
    }
  } catch (error) {
    logger.error(`${fName} Error al validar estructura de componente`)
    //console.error(error)
    return {
      success: false,
      data: error,
    }
  }
}

//////////////////// Put Functions

export const putComp = async (comp) => {
  const fName = `${libName} [putComp]`
  //Para guardar una nueva versión del componente
  if (comp?.params?.id) {
    const { id } = comp.params
    try {
      comp.body.updatedAt = new Date()
      comp.body.version = (await getMaxVersion(id)) + 1
      logger.info(`${fName} PUT componente`)
      const data = await prisma.PlatComponent.create({
        data: comp.body,
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
        error,
      }
    }
  } else {
    logger.error(`${fName} No component id`)
    return {
      success: false,
      error: 'No component id',
    }
  }
}
