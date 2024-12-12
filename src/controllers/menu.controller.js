
import { getMenuApp, postMenuApp, putMenuApp, deleteMenuApp } from '../api/menuApi.js'

export const menuController = {
  getMenuApplication : async (req, res) => {
    let outData = await getMenuApp(req)
    res.json(outData)
  },

  postMenuApplication : async (req, res) => {
    let outData = await postMenuApp(req)
    res.json(outData)
  },

  putMenuApplication : async (req, res) => {
    let outData = await putMenuApp(req)
    res.json(outData)
  },

  deleteMenuApplication : async (req, res) => {
    let outData = await deleteMenuApp(req)
    res.json(outData)
  }
}
