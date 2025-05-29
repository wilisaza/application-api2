import {
  findAllCompanies,
  findCompanyById,
  createNewCompany,
  updateCompanyById,
  deleteCompanyById,
} from '../api/companyApi.js'

export const getCompanies = async (req, res) => {
  const result = await findAllCompanies()
  if (result.success) return res.json(result.data)
  res.status(500).json({ error: result.error })
}

export const getCompanyById = async (req, res) => {
  const result = await findCompanyById(req.params.id)
  if (result.success) return res.json(result.data)
  res.status(404).json({ error: result.error })
}

export const createCompany = async (req, res) => {
  const result = await createNewCompany(req.body)
  if (result.success) return res.status(201).json(result.data)
  res.status(400).json({ error: result.error })
}

export const updateCompany = async (req, res) => {
  const result = await updateCompanyById(req.params.id, req.body)
  if (result.success) return res.json(result.data)
  res.status(400).json({ error: result.error })
}

export const deleteCompany = async (req, res) => {
  const result = await deleteCompanyById(req.params.id)
  if (result.success) return res.json({ message: result.message })
  res.status(400).json({ error: result.error })
}
