import {
  getCompApp,
  getComp,
  getCompVers,
  getTIComp,
  getPropComp,
  postComp,
  postTIComp,
  postPROPComp,
  postValidateComp,
  putComp,
} from '../api/componentApi.js'

export const compController = {
  getComponents : async (req, res) => {
    let outData = await getCompApp(req)
    res.json(outData)
  },

  getComponent : async (req, res) => {
    let outData = await getComp(req)
    res.json(outData)
  },

  getCompVersion : async (req, res) => {
    let outData = await getCompVers(req)
    res.json(outData)
  },

  getTIComponent : async (req, res) => {
    let outData = await getTIComp(req)
    res.json(outData)
  },

  getPropComponent : async (req, res) => {
    let outData = await getPropComp(req)
    res.json(outData)
  },

  postComponent : async (req, res) => {
    let outData = await postComp(req)
    res.json(outData)
  },

  postTIComponent : async (req, res) => {
    let outData = await postTIComp(req)
    res.json(outData)
  },

  postPropComponent : async (req, res) => {
    let outData = await postPROPComp(req)
    res.json(outData)
  },

  postValidateComponent : async (req, res) => {
    let outData = await postValidateComp(req)
    res.json(outData)
  },

  putComponent : async (req, res) => {
    let outData = await putComp(req)
    res.json(outData)
  }
}
