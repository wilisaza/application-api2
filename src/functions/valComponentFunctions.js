import logger from '../util/logger'
import { keyExists } from './arrayFunctions'

const libName = '[valComponentFunctions]'

export const valComponentSpecs = (tICompStruct, compStruct ) => {
  const fName = `${libName} [valComponentSpecs]`
  let countError = 0
  let error = {}
  let vCS= []
  let propertyFound = false
  let required = false
  let content = ''
  let contentFound = false
  let compStructKeys = Object.keys(compStruct)
  logger.info(`${fName} Validando ${tICompStruct.componentName}`)
  for (let i in tICompStruct.componentSpecs) {
    propertyFound = false
    required = tICompStruct.componentSpecs[i].required ?? false
    if (compStructKeys.includes(i)) { //Encuentra la propiedad
      switch (tICompStruct.componentSpecs[i].type) {
        case 'array':
          if (typeof compStruct[i] === 'object') {
            if (!Array.isArray(compStruct[i])) {
              countError++
              error[`${tICompStruct.componentName}-${compStruct.name ?? 'noName'}-${i}`] = `Property '${i}' type is not ${tICompStruct.componentSpecs[i].type} as expected`   
            }
          }
          //Evaluar content
          content = tICompStruct.componentSpecs[i].content ?? 'NONE'
          contentFound = false
          if (content !== 'NONE') {
            for (let j in tICompStruct.subComponent) {
              if (content === tICompStruct.subComponent[j].componentName) {
                contentFound = true
                error[`${tICompStruct.componentName}-${compStruct.name ?? 'noName'}-${i}`] = []
                for (let k in compStruct[i]) {
                  vCS = valComponentSpecs(tICompStruct.subComponent[j], compStruct[i][k])
                  if (!vCS[0]) {
                    countError++
                    error[`${tICompStruct.componentName}-${compStruct.name ?? 'noName'}-${i}`].push(vCS[1])
                  }
                }
              }
            }
          }
          if (content === 'NONE' || !contentFound) {
            countError++
            error[`${tICompStruct.componentName}-${compStruct.name ?? 'noName'}-${i}`] = `Property '${i}' content '${content}' not found`
          }
          break
        default:
          if (!(typeof compStruct[i] === tICompStruct.componentSpecs[i].type)) {
            countError++
            error[`${tICompStruct.componentName}-${compStruct.name ?? 'noName'}-${i}`] = `Property '${i}' (${typeof compStruct[i]}) type is not ${tICompStruct.componentSpecs[i].type} as expected`
          }
          break
      }
      propertyFound = true
    }
    if(!propertyFound && required){
      countError++
      error[`${tICompStruct.componentName}-${compStruct.name ?? 'noName'}-${i}`] = `Property '${i}' (required) not found`
    }
  }
  // Validar propiedades no definidas en la especificación del componente
  for (let i in compStructKeys) {
    if (!keyExists(tICompStruct.componentSpecs, compStructKeys[i])) {
      console.log(compStructKeys[i])
      countError++
      error[`${tICompStruct.componentName}-${compStruct.name ?? 'noName'}-${compStructKeys[i]}`] = `Property '${compStructKeys[i]}' not defined in component - ${tICompStruct.componentName}`
    }
  }
  if (countError) {
    return [false, error] 
  } 
  return [true, {}]
}
