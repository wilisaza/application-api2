import express from 'express'
import {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
} from '../controllers/company.controller.js'
import { validateTokenSingle } from '../middlewares/jwtValidate.js'
import { valFields } from '../middlewares/valFields.js'

const router = express.Router()

router.get('/', validateTokenSingle, getCompanies)
router.get('/:id', validateTokenSingle, getCompanyById)
router.post('/', validateTokenSingle, valFields, createCompany)
router.put('/:id', validateTokenSingle, valFields, updateCompany)
router.delete('/:id', validateTokenSingle, deleteCompany)

export default router
