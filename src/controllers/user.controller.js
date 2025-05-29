import {
  findAllUsers,
  findUserById,
  createNewUser,
  updateUserById,
  deleteUserById,
} from '../api/userApi.js'

export const getUsers = async (req, res) => {
  const result = await findAllUsers()
  if (result.success) return res.json(result.data)
  res.status(500).json({ error: result.error })
}

export const getUserById = async (req, res) => {
  const result = await findUserById(req.params.id)
  if (result.success) return res.json(result.data)
  res.status(404).json({ error: result.error })
}

export const createUser = async (req, res) => {
  const result = await createNewUser(req.body)
  if (result.success) return res.status(201).json(result.data)
  res.status(400).json({ error: result.error })
}

export const updateUser = async (req, res) => {
  const result = await updateUserById(req.params.id, req.body)
  if (result.success) return res.json(result.data)
  res.status(400).json({ error: result.error })
}

export const deleteUser = async (req, res) => {
  const result = await deleteUserById(req.params.id)
  if (result.success) return res.json({ message: result.message })
  res.status(400).json({ error: result.error })
}
