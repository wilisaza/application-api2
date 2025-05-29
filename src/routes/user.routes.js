import express from 'express'
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/user.controller.js'
import { validateTokenSingle } from '../middlewares/jwtValidate.js'
import { valFields } from '../middlewares/valFields.js'

const router = express.Router()

router.get('/', validateTokenSingle, getUsers)
router.get('/:id', validateTokenSingle, getUserById)
router.post('/', validateTokenSingle, valFields, createUser)
router.put('/:id', validateTokenSingle, valFields, updateUser)
router.delete('/:id', validateTokenSingle, deleteUser)

export default router
