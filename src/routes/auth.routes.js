import express from 'express'
import { loginLocal, loginGoogle, loginDb } from '../controllers/auth.controller.js'

const router = express.Router()

// Login local
router.post('/login', loginLocal)
// Login con Google
router.post('/google', loginGoogle)
// Login con usuario DB
router.post('/db', loginDb)

export default router
