import {
  getAppCriteria,
  getAppCli,
  getAppShortN,
  getAppShortNCli,
  getAppUsr,
  getAppUsrCli,
  getAppEst,
  getAppRunnerEst,
  postApp,
  postAppLaunch,
  putApp,
} from '../api/applicationApi.js'

export const appController = {
  getAppProvider : async (req, res) => {
    let outData = await getAppCriteria(req, 'idCompany')
    res.json(outData)
  },

  getApplication : async (req, res) => {
    let outData = await getAppCriteria(req, 'id')
    res.json(outData)
  },

  getAppClient : async (req, res) => {
    let outData = await getAppCli(req)
    res.json(outData)
  },

  getAppShortName : async (req, res) => {
    let outData = await getAppShortN(req)
    res.json(outData)
  },
  
  getAppShortNameClient : async (req, res) => {
    let outData = await getAppShortNCli(req)
    res.json(outData)
  },

  getAppUser : async (req, res) => {
    let outData = await getAppUsr(req)
    res.json(outData)
  },

  getAppUserClient : async (req, res) => {
    let outData = await getAppUsrCli(req)
    res.json(outData)
  },

  getAppEstruct : async (req, res) => {
    let outData = await getAppEst(req)
    res.json(outData)
  },

  getAppRunnerEstruct : async (req, res) => {
    let outData = await getAppRunnerEst(req)
    res.json(outData)
  },

  postApplication : async (req, res) => {
    let outData = await postApp(req)
    res.json(outData)
  },

  postApplicationLaunch : async (req, res) => {
    let outData = await postAppLaunch(req)
    res.json(outData)
  },

  putApplication : async (req, res) => {
    let outData = await putApp(req)
    res.json(outData)
  }
}
