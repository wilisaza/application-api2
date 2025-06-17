import { PrismaClient } from '@prisma/client'
import logger from '../util/logger'
import { use } from 'passport'

const prisma = new PrismaClient()

///////////////Get Functions

const libName = '[clientApi]'

export const getAltCliUsr = async (usr) => {
  const fName = `${libName} [getAltCliUsr]`

  if (!usr?.params?.altUser) {
    //No trae parametro altUser
    logger.info(`${fName} No altUser`)
    return {
      success: false,
      error: 'No altUser',
    }
  }
  let data

  try {
    logger.info(`${fName} Verificando usuario : ${usr.params.altUser}`)
    data = await prisma.PlatUserClient.findMany({
      select: {
        idUser: true,
        idClient: true,
        PlatClient: {
          select: {
            description: true,
            idApplication: true,
            idCompany: true,
            clientSpecs: true,
          },
        },
      },
      where: {
        alternateUser: usr.params.altUser,
      },
    })

    logger.info(`${fName} Obtenido`)
    return {
      success: true,
      data,
    }
  } catch (error) {
    logger.error(`${fName} Error al obtener informacion de la base de datos`)
    console.error(error)
    return {
      success: false,
      error,
    }
  }
}

export const getCliUsr = async (cli) => {
  const fName = `${libName} [getCliUsr]`

  if (!cli?.params?.id) {
    //No trae parametro id
    return {
      success: false,
      error: 'No id',
    }
  }
  let data

  try {
    logger.info(`${fName} Obteniendo usuario cliente: ${cli.params.id}`)
    data = await prisma.PlatClient.groupBy({
      by: ['idCompany'],
      where: {
        PlatUserClient: {
          some: {
            idUser: cli.params.id,
          },
        },
      },
      _count: {
        idApplication: true,
      },
    })
    let compCli
    let compProc
    let nData = {}
    let data2 = []

    for (let comps in cli.user[0].companies) {
      for (compCli in data) {
        if (data[compCli].idCompany === cli.user[0].companies[comps].company.id) {
          data[compCli].companyName = cli.user[0].companies[comps].company.companyName
          if (data[compCli]?._count) {
            data[compCli].countApplications = data[compCli]._count.idApplication
            delete data[compCli]._count
          }

          for (compProc in cli.user[0].companies[comps].roles) {
            if (
              cli.user[0].companies[comps].roles[compProc].roleType === 'COMPANY' &&
              cli.user[0].companies[comps].roles[compProc].roleName === 'PROCESS_EXEC'
            ) {
              data[compCli].processEnabled = true
            }
          }
          if (!data[compCli]?.processEnabled) {
            data[compCli].processEnabled = false
          }
        } else {
          for (compProc in cli.user[0].companies[comps].roles) {
            if (
              cli.user[0].companies[comps].roles[compProc].roleType === 'COMPANY' &&
              cli.user[0].companies[comps].roles[compProc].roleName === 'PROCESS_EXEC'
            ) {
              if (
                !data2.some((dat) => dat.idCompany === cli.user[0].companies[comps].company.id) &&
                !data.some((dat) => dat.idCompany === cli.user[0].companies[comps].company.id)
              ) {
                nData.idCompany = cli.user[0].companies[comps].company.id
                nData.companyName = cli.user[0].companies[comps].company.companyName
                nData.countApplications = 0
                nData.processEnabled = true
                data2.push(nData)
                nData = {}
              }
            }
          }
        }
      }
    }
    logger.info(`${fName} Obtenido`)
    return {
      success: true,
      data: data.concat(data2),
    }
  } catch (error) {
    logger.error(`${fName} Error al obtener informacion de la base de datos`)
    console.error(error)
    return {
      success: false,
      error,
    }
  }
}

export const getNoPlatUsr = async (cli) => {
  const fName = `${libName} [getNoPlatUsr]`

  if (!cli?.params?.idClient) {
    return {
      success: false,
      error: 'No idClient',
    }
  }
  let data

  try {
    logger.info(`${fName} Validando usuario NoPlat: ${cli.params.idClient}`)
    data = await prisma.PlatUserClient.findMany({
      where: {
        idClient: cli.params.idClient,
        PlatUser: {
          username: 'noplatuser',
        },
      },
      select: {
        PlatUser: {
          select: {
            id: true,
          },
        },
      },
    })
    logger.info(`${fName} Obtenido`)
    return {
      success: true,
      data,
    }
  } catch (error) {
    logger.error(`${fName} Error al obtener informacion de la base de datos`)
    console.error(error)
    return {
      success: false,
      error,
    }
  }
}

//////////////////Post Functions

export const postCli = async (cli) => {
  try {
    const data = await prisma.PlatClient.create({
      data: cli.body,
    })
    return {
      success: true,
      data,
    }
  } catch (error) {
    console.log('Error', error)
    return {
      success: false,
      data: error,
    }
  }
}

export const postUsrCli = async (usrCli) => {
  const fName = `${libName} [getCliUsr]`
  try {
    logger.info(`${fName} Insertando usuario cliente`)
    const data = await prisma.PlatUserClient.create({
      data: usrCli.body,
    })
    logger.info(`${fName} Insertado`)
    return {
      success: true,
      data,
    }
  } catch (error) {
    logger.error(`${fName} Error al insertar en la base de datos`)
    console.error('Error', error)
    return {
      success: false,
      data: error,
    }
  }
}
