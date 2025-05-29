import { PrismaClient } from '@prisma/client'
import logger from '../util/logger'
import { isRowId } from '../util'
import { valKeys } from '../functions/arrayFunctions'

const prisma = new PrismaClient()

const libName = '[metaData Api]'

///////////////Get Functions

export const getMetaDataApp = async (metaDataApp) => {
  const fName = `${libName} [getMetaDataApp]`
  
  if (!isRowId(metaDataApp.params.idApplication)) {
    const error = 'No idApplication type (uuId)'
    logger.error(`${fName} ${error}`)
    return {
      success: false,
      error,
    }
  }
  try{
    const data = await prisma.platMetaDataApplication.findMany({
      where: {
        idApplication: metaDataApp.params.idApplication
      }
    })
    logger.info(`${fName} Ejecutando consulta`)
    return {
      success: true,
      data,
    }
  } catch (err) {
    const error = 'Error al obtener metaData'
    logger.error(`${fName} ${error}`)
    console.error(fName, err)
    return {
      success: false,
      error,
      exception: err.message
    }
  }
}

export const getMetaDataParam = async (metaDataApp) => {
  const fName = `${libName} [getMetaDataParam]`

  try{
    const { paramName, paramValue } = metaDataApp.params
    const data = await prisma.platMetaDataApplication.findMany({
      where: {
        [paramName]: paramValue
      }
    })
    logger.info(`${fName} Ejecutando consulta`)
    return {
      success: true,
      data,
    }
  } catch (err) {
    const error = 'Error al obtener metaData'
    logger.error(`${fName} ${error}`)
    console.error(fName, err)
    return {
      success: false,
      error,
      exception: err.message
    }
  }
}

//////////////////Post Functions

export const postMetaDataApp = async (metaDataApp) => {
  const fName = `${libName} [postMetaDataApp]`
  let error = {}
  if (!valKeys(metaDataApp.body, ['idApplication', 'owner', 'tableName', 'columnName', 'languageCode'], error)) {
    return {
      success: false,
      error,
    }
  }

  try {
    logger.info(`${fName} Insertando metaData`)
    const data = await prisma.PlatMetaDataApplication.create({
      data: metaDataApp.body,
    })
    logger.info(`${fName} Insertado`)
    return {
      success: true,
      data,
    }
  } catch (err) {
    const error = 'Error al insertar metaData'
    logger.error(`${fName} ${error}`)
    console.error(fName, err)
    return {
      success: false,
      error,
      exception: err
    }
  }
}

///////////   Put functions

export const putMetaDataApp = async (metaDataApp) => {
  const fName = `${libName} [putMetaDataApp]`
  if (!isRowId(metaDataApp.params.id)) {
    const error = 'No id type (uuId)'
    logger.error(`${fName} ${error}`)
    return {
      success: false,
      error,
    }
  }

  try {
    logger.info(`${fName} Actualizando metaData`)
    const { id } = metaDataApp.params
    const data = await prisma.platMetaDataApplication.update({
      where: {
        id
      },
      data: metaDataApp.body,
    })
    logger.info(`${fName} Actualizado`)
    return {
      success: true,
      data,
    }
  } catch (err) {
    const error = 'Error al actualizar metaData'
    logger.error(`${fName} ${error}`)
    console.error(fName, err)
    return {
      success: false,
      error,
      exception: err
    }
  }
}
