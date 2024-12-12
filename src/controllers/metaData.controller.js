
import { getMetaDataApp, getMetaDataParam, postMetaDataApp, putMetaDataApp } from '../api/metaDataApi.js'

export const metaDataController = {
  getMetaDataApplication : async (req, res) => {
    let outData = await getMetaDataApp(req)
    res.json(outData)
  },

  getMetaDataParameter : async (req, res) => {
    let outData = await getMetaDataParam(req)
    res.json(outData)
  },

  postMetaDataApplication : async (req, res) => {
    let outData = await postMetaDataApp(req)
    res.json(outData)
  },

  putMetaDataApplication : async (req, res) => {
    let outData = await putMetaDataApp(req)
    res.json(outData)
  },

}
