import {
  getAppCriteria,
  getAppCli,
  getAppShortN,
  getAppUsr,
  getAppUsrCli,
  getAppEst,
  getAppRunnerEst,
  postApp,
  postAppLaunch,
  putApp,
} from '../api/applicationApi.js'
import {
  getCompApp,
  getComp,
  getCompVers,
  getTIComp,
  getPropComp,
  postComp,
  postTIComp,
  postPROPComp,
  putComp,
} from '../api/componentApi.js'
import { getMenuApp, postMenuApp } from '../api/menuApi.js'
import { getAltCliUsr, getCliUsr, postCli, postUsrCli } from '../api/clientApi.js'

export const getAltCliUser = async (req, res) => {
  let outData = await getAltCliUsr(req)
  res.json(outData)
}

export const getAppProvider = async (req, res) => {
  let outData = await getAppCriteria(req, 'idCompany')
  res.json(outData)
}

export const getApplication = async (req, res) => {
  let outData = await getAppCriteria(req, 'id')
  res.json(outData)
}

export const getAppClient = async (req, res) => {
  let outData = await getAppCli(req)
  res.json(outData)
}

export const getAppShortName = async (req, res) => {
  let outData = await getAppShortN(req)
  res.json(outData)
}

export const getAppUser = async (req, res) => {
  let outData = await getAppUsr(req)
  res.json(outData)
}

export const getAppUserClient = async (req, res) => {
  let outData = await getAppUsrCli(req)
  res.json(outData)
}

export const getAppEstruct = async (req, res) => {
  let outData = await getAppEst(req)
  res.json(outData)
}

export const getAppRunnerEstruct = async (req, res) => {
  let outData = await getAppRunnerEst(req)
  res.json(outData)
}

export const getCliUser = async (req, res) => {
  let outData = await getCliUsr(req)
  res.json(outData)
}

export const getComponents = async (req, res) => {
  let outData = await getCompApp(req)
  res.json(outData)
}

export const getComponent = async (req, res) => {
  let outData = await getComp(req)
  res.json(outData)
}

export const getCompVersion = async (req, res) => {
  let outData = await getCompVers(req)
  res.json(outData)
}

export const getMenuApplication = async (req, res) => {
  let outData = await getMenuApp(req)
  res.json(outData)
}

export const getTIComponent = async (req, res) => {
  let outData = await getTIComp(req)
  res.json(outData)
}

export const getPropComponent = async (req, res) => {
  let outData = await getPropComp(req)
  res.json(outData)
}

export const postApplication = async (req, res) => {
  let outData = await postApp(req)
  res.json(outData)
}

export const postApplicationLaunch = async (req, res) => {
  let outData = await postAppLaunch(req)
  res.json(outData)
}

export const postClient = async (req, res) => {
  let outData = await postCli(req)
  res.json(outData)
}

export const postUserClient = async (req, res) => {
  let outData = await postUsrCli(req)
  res.json(outData)
}

export const postComponent = async (req, res) => {
  let outData = await postComp(req)
  res.json(outData)
}

export const postTIComponent = async (req, res) => {
  let outData = await postTIComp(req)
  res.json(outData)
}

export const postPropComponent = async (req, res) => {
  let outData = await postPROPComp(req)
  res.json(outData)
}

export const postMenuApplication = async (req, res) => {
  let outData = await postMenuApp(req)
  res.json(outData)
}

export const putApplication = async (req, res) => {
  let outData = await putApp(req)
  res.json(outData)
}

export const putComponent = async (req, res) => {
  let outData = await putComp(req)
  res.json(outData)
}
