import jwt from 'jsonwebtoken'
import logger from '../util/logger'

export const generateAppToken = (payload) => {
  logger.info(`[jwtSing] Generando appToken`)
  return jwt.sign(payload, process.env.LAUNCH_SECRET, { expiresIn: '12h' })
}
