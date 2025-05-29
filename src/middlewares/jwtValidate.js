import jwt from 'jsonwebtoken'

import { getAuthUserInfo } from '../integrations/users-api'
import { isEmpty } from '../util'
import logger from '../util/logger'

const libName = '[jwtValidate]'

export const validateTokenSingle = async (req, res, next) => {
  const fName = `${libName} [validateTokenSingle]`
  logger.info(`${fName} Iniciando`)

  if (!req.headers?.authorization) {
    logger.error(`${fName} No Token`)
    return res.status(400).json({
      success: false,
      error: 'No Token',
    })
  }

  let token = req.headers.authorization

  if (token.startsWith('Bearer ')) {
    token = token.substring(7, token.length)
  }
  // Este llamado a futro se reemplazará por passport
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      logger.error(`${fName} ${err}`)
      return res.status(400).json({
        success: false,
        error: err,
      })
    }

    const user = {
      id: decoded.id,
    }
    logger.info(`${fName} Terminado`)
    req.user = user
    next()
  })
}

export const validateTokenFull = async (req, res, next) => {
  const fName = `${libName} [validateTokenFull]`
  logger.info(`${fName} Iniciando`)

  if (!req.headers?.authorization) {
    logger.error(`${fName} No Token`)
    return res.status(400).json({
      success: false,
      error: 'No Token',
    })
  }

  let token = req.headers.authorization

  if (token.startsWith('Bearer ')) {
    token = token.substring(7, token.length)
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err) => {
    if (err) {
      logger.error(`${fName} ${err}`)
      return res.status(400).json({
        success: false,
        error: err,
      })
    }
    const user = await getAuthUserInfo(token)
    if (isEmpty(user?.data)) {
      logger.error(`${fName} No User Info`)
      return res.status(400).json({
        success: false,
        error: 'No User Info',
      })
    }
    logger.info(`${fName} Terminado`)
    req.user = user.data
    next()
  })
}
