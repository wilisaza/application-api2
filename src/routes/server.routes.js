import { Router } from 'express'

export const router = Router()

router.get('/', function (req, res) {
  res.status(200).json({
    success: true,
    message: 'Service Running',
  })
})
