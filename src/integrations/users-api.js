import fetch from 'node-fetch'
import logger from '../util/logger'

/*
 * Function that calls the users-api service to get the complete information
 * for the authenticated User
 */
const libName = '[users-api]'

export const getAuthUserInfo = async (token) => {
  const fName = `${libName} [getAuthUserInfo]`
  logger.info(`${fName} Iniciando`)

  let resp
  try {
    logger.info(`${fName} Realizando peticion para autenticacion de usuario`)
    const httpResponse = await fetch(`${process.env.USERS_API_URL}/auth/user`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const toJson = await httpResponse.json()
    resp = { success: true, data: toJson?.data }
    logger.info(`${fName} Peticion terminada`)
  } catch (err) {
    const error = `${fName} Error de autenticación`
    logger.error(error)
    resp = { success: false, error: `${err?.name} - ${err?.message}`, exception: err }
  }

  logger.info(`${fName} Terminado - success: ${resp.success}`)
  return resp
}
