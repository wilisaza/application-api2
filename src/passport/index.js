import passport from 'passport'
import PassportJWT from 'passport-jwt'
import logger from '../util/logger'

const JWTStrategy = PassportJWT.Strategy
const ExtractJWT = PassportJWT.ExtractJwt

const libName = '[passport/index]'
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        logger.info(`${libName} ${payload}`)
        return done(null, payload)
      } catch (error) {
        logger.error(`${libName} Error: ${error}`)
        return done(error, null)
      }
    }
  )
)

export default passport
