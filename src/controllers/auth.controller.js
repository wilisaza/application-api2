import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { OAuth2Client } from 'google-auth-library'

const prisma = new PrismaClient()
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export const loginLocal = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password)
    return res.status(400).json({ error: 'Usuario y contraseña requeridos' })
  const user = await prisma.platUser.findFirst({
    where: { username, authProvider: 'local', isEnabled: true, isDeleted: false },
  })
  if (!user || !user.password) return res.status(401).json({ error: 'Credenciales inválidas' })
  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return res.status(401).json({ error: 'Credenciales inválidas' })
  await prisma.platUser.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } })
  const token = jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '12h' }
  )
  res.json({ token })
}

export const loginGoogle = async (req, res) => {
  const { token: googleToken } = req.body
  if (!googleToken) return res.status(400).json({ error: 'Token de Google requerido' })
  let payload
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
    payload = ticket.getPayload()
  } catch (err) {
    return res.status(401).json({ error: 'Token de Google inválido' })
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
  res.json({ token })
}
