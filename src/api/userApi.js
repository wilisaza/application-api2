import { PrismaClient } from '@prisma/client'
import logger from '../util/logger.js'
import { isRowId } from '../util/index.js'
import { valKeys } from '../functions/arrayFunctions.js'

const prisma = new PrismaClient()
const libName = '[userApi]'

export const findAllUsers = async () => {
  try {
    const users = await prisma.platUser.findMany()
    return { success: true, data: users }
  } catch (error) {
    logger.error(`${libName} Error al obtener usuarios: ${error.message}`)
    return { success: false, error: error.message }
  }
}

export const findUserById = async (id) => {
  if (!isRowId(id)) {
    const error = 'ID de usuario inválido'
    logger.error(`${libName} ${error}`)
    return { success: false, error }
  }
  try {
    const user = await prisma.platUser.findUnique({ where: { id } })
    if (!user) return { success: false, error: 'Usuario no encontrado' }
    return { success: true, data: user }
  } catch (error) {
    logger.error(`${libName} Error al obtener usuario: ${error.message}`)
    return { success: false, error: error.message }
  }
}

export const createNewUser = async (data) => {
  const required = ['username']
  let err = {}
  if (!valKeys(data, required, err)) {
    return { success: false, error: err }
  }
  try {
    const user = await prisma.platUser.create({ data })
    return { success: true, data: user }
  } catch (error) {
    logger.error(`${libName} Error al crear usuario: ${error.message}`)
    return { success: false, error: error.message }
  }
}

export const updateUserById = async (id, data) => {
  if (!isRowId(id)) {
    const error = 'ID de usuario inválido'
    logger.error(`${libName} ${error}`)
    return { success: false, error }
  }
  try {
    const user = await prisma.platUser.update({ where: { id }, data })
    return { success: true, data: user }
  } catch (error) {
    logger.error(`${libName} Error al actualizar usuario: ${error.message}`)
    return { success: false, error: error.message }
  }
}

export const deleteUserById = async (id) => {
  if (!isRowId(id)) {
    const error = 'ID de usuario inválido'
    logger.error(`${libName} ${error}`)
    return { success: false, error }
  }
  try {
    await prisma.platUser.delete({ where: { id } })
    return { success: true, message: 'Usuario eliminado' }
  } catch (error) {
    logger.error(`${libName} Error al eliminar usuario: ${error.message}`)
    return { success: false, error: error.message }
  }
}
