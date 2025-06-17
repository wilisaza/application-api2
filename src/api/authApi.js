import bcrypt from 'bcrypt'
import jwt, { decode } from 'jsonwebtoken'
import logger from '../util/logger'
import { decodeString } from '../functions/encodeDecodeFunctions.js'
import { PrismaClient } from '@prisma/client'
import { OAuth2Client } from 'google-auth-library'

const prisma = new PrismaClient()
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const libName = '[authApi]'

export const loginLocalApi = async (username, password) => {
  if (!username || !password) {
    return { success: false, error: 'Usuario y contraseña requeridos' }
  }
  const user = await prisma.platUser.findFirst({
    where: { username, authProvider: 'local', isEnabled: true, isDeleted: false },
  })
  if (!user || !user.password) return { success: false, error: 'Credenciales inválidas' }
  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return { success: false, error: 'Credenciales inválidas' }
  await prisma.platUser.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } })
  const token = jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '12h' }
  )
  return { success: true, token }
}

export const loginGoogleApi = async (googleToken) => {
  if (!googleToken) return { success: false, error: 'Token de Google requerido' }
  let payload
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
    payload = ticket.getPayload()
  } catch (err) {
    return { success: false, error: 'Token de Google inválido' }
  }
  let user = await prisma.platUser.findFirst({
    where: { providerId: payload.sub, authProvider: 'google' },
  })
  if (!user) {
    user = await prisma.platUser.create({
      data: {
        username: payload.email,
        email: payload.email,
        fullName: payload.name,
        authProvider: 'google',
        providerId: payload.sub,
        providerData: payload,
        isEnabled: true,
        isDeleted: false,
        lastLoginAt: new Date(),
      },
    })
  } else {
    await prisma.platUser.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } })
  }
  const token = jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '12h' }
  )
  return { success: true, token }
}

export const loginDbApi = async (logInfo) => {
  const fName = `${libName} [loginDbApi]`
  let logHeader = {}
  const logBody = logInfo.body

  if (!logBody) {
    return { success: false, error: 'Cuerpo de solicitud requerido' }
  }
  if (!logBody?.iterations) {
    return { success: false, error: 'No se encontró factor decoder' }
  }
  if (!logBody?.username || !logBody?.password) {
    return { success: false, error: 'Usuario y contraseña requeridos' }
  }
  if (!logBody?.idClient) {
    return { success: false, error: 'Identificador de cliente requerido' }
  }

  let data
  try {
    logger.info(`${fName} Buscando conexión DB`)
    data = await prisma.PlatClient.findUnique({
      where: {
        id: logBody.idClient,
      },
      select: {
        idApplication: true,
        idCompany: true,
        clientSpecs: true,
      },
    })
    if (data.clientSpecs?.length === 0) {
      return { success: false, error: 'No se encontró información de conexión para el cliente' }
    }
    logHeader = {
      dbuser: logBody.username,
      dbpassword: logBody.password,
      dbHost: data.clientSpecs.connection.dbHost,
      dbsid: data.clientSpecs.connection.dbName,
      dbport: data.clientSpecs.connection.dbPort,
      iterations: decodeString(20, logBody.iterations),
    }
    console.log(logHeader)
  } catch (error) {
    logger.error(`${fName} Error al obtener información de la base de datos`)
    //console.error(error)
    return { success: false, error }
  }

  const iterationFactor = decodeString(20, logBody.iterations)

  logBody.username = decodeString(iterationFactor, logBody.username)
  logBody.password = decodeString(iterationFactor, logBody.password)
  logger.info(`${fName} Decode info`)
  console.log(data.clientSpecs, iterationFactor)
  return {
    success: true,
    data: {
      username: logBody.username,
      password: logBody.password,
      iterations: iterationFactor,
      client: logBody.idClient,
    },
  }
}
