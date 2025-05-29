import express from 'express'
import { loginLocal, loginGoogle } from '../controllers/auth.controller.js'

const router = express.Router()

// Login local
router.post('/login', loginLocal)
// Login con Google
router.post('/google', loginGoogle)

export default router
