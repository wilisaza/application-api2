import cors from 'cors'
import passport from '../passport/index.js'

const origin = JSON.parse(process.env.CORS_ORIGINS ?? '"*"')

export const corsMiddleware = cors({
  origin,
  optionsSuccessStatuts: 200,
})

export const authToken = [passport.authenticate('jwt', { session: false })]
