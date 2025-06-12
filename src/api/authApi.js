import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { OAuth2Client } from 'google-auth-library'

const prisma = new PrismaClient()
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

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
