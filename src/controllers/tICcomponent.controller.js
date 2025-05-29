import {
  
  getTIComp,
  getTICompRec,
  postTIComp,
} from '../api/tIComponentApi.js'

export const tICompController = {

  getTIComponent : async (req, res) => {
    let outData = await getTIComp(req)
    res.json(outData)
  },

  getTIComponentRec : async (req, res) => {
    let outData = await getTICompRec(req)
    res.json(outData)
  },
  
  postTIComponent : async (req, res) => {
    let outData = await postTIComp(req)
    res.json(outData)
  },
 
}
