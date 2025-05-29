
import { getAltCliUsr, getCliUsr, postCli, postUsrCli } from '../api/clientApi.js'

export const cliController = {
  getAltCliUser : async (req, res) => {
    let outData = await getAltCliUsr(req)
    res.json(outData)
  },

  getCliUser : async (req, res) => {
    let outData = await getCliUsr(req)
    res.json(outData)
  },

  postClient : async (req, res) => {
    let outData = await postCli(req)
    res.json(outData)
  },

  postUserClient : async (req, res) => {
    let outData = await postUsrCli(req)
    res.json(outData)
  }
}
