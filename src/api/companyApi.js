import { PrismaClient } from '@prisma/client'
import logger from '../util/logger.js'
import { isRowId } from '../util/index.js'
import { valKeys } from '../functions/arrayFunctions.js'

const prisma = new PrismaClient()
const libName = '[companyApi]'

export const findAllCompanies = async () => {
  try {
    const companies = await prisma.platCompany.findMany()
    return { success: true, data: companies }
  } catch (error) {
    logger.error(`${libName} Error al obtener compañías: ${error.message}`)
    return { success: false, error: error.message }
  }
}

export const findCompanyById = async (id) => {
  if (!isRowId(id)) {
    const error = 'ID de compañía inválido'
    logger.error(`${libName} ${error}`)
    return { success: false, error }
  }
  try {
    const company = await prisma.platCompany.findUnique({ where: { id } })
    if (!company) return { success: false, error: 'Compañía no encontrada' }
    return { success: true, data: company }
  } catch (error) {
    logger.error(`${libName} Error al obtener compañía: ${error.message}`)
    return { success: false, error: error.message }
  }
}

export const createNewCompany = async (data) => {
  const required = ['name']
  let err = {}
  if (!valKeys(data, required, err)) {
    return { success: false, error: err }
  }
  try {
    const company = await prisma.platCompany.create({ data })
    return { success: true, data: company }
  } catch (error) {
    logger.error(`${libName} Error al crear compañía: ${error.message}`)
    return { success: false, error: error.message }
  }
}

export const updateCompanyById = async (id, data) => {
  if (!isRowId(id)) {
    const error = 'ID de compañía inválido'
    logger.error(`${libName} ${error}`)
    return { success: false, error }
  }
  try {
    const company = await prisma.platCompany.update({ where: { id }, data })
    return { success: true, data: company }
  } catch (error) {
    logger.error(`${libName} Error al actualizar compañía: ${error.message}`)
    return { success: false, error: error.message }
  }
}

export const deleteCompanyById = async (id) => {
  if (!isRowId(id)) {
    const error = 'ID de compañía inválido'
    logger.error(`${libName} ${error}`)
    return { success: false, error }
  }
  try {
    await prisma.platCompany.delete({ where: { id } })
    return { success: true, message: 'Compañía eliminada' }
  } catch (error) {
    logger.error(`${libName} Error al eliminar compañía: ${error.message}`)
    return { success: false, error: error.message }
  }
}
