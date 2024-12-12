import { validationResult } from 'express-validator'
import logger from '../util/logger'

const libName = '[valFields]'
export const valFields = (req, res, next) => {
  const fName = `${libName} [valFields]`
  logger.info(`${fName} Iniciando`)
  const valErrors = validationResult(req)
  if (!valErrors.isEmpty()) {
    let error = valErrors.errors
    logger.error(`${fName} ${error}`)
    return res.status(400).json({
      success: false,
      error,
    })
  }
  logger.info(`${fName} Terminado`)
  next()
}

const a = () => {}

export const b = () => {
  return a()
}
