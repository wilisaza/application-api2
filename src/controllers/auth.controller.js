import { loginLocalApi, loginGoogleApi, loginDbApi } from '../api/authApi.js'

export const loginLocal = async (req, res) => {
  const { username, password } = req.body
  const result = await loginLocalApi(username, password)
  if (result.success) return res.json({ token: result.token })
  res.status(401).json({ error: result.error })
}

export const loginGoogle = async (req, res) => {
  const { token: googleToken } = req.body
  const result = await loginGoogleApi(googleToken)
  if (result.success) return res.json({ token: result.token })
  res.status(401).json({ error: result.error })
}

export const loginDb = async (req, res) => {
  const result = await loginDbApi(req)
  if (result.success) return res.json({ result })
  res.status(401).json({ error: result.error })
}
