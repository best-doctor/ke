// This shit is stolen from several libs like react-table
// because I could not find a normal way in the official documentation!!!

const FUNCTION_REGEX = /react(\d+)?./i

const isClassComponent = (objectToCheck: any): boolean => {
  return (
    typeof objectToCheck === 'function' &&
    (() => {
      const proto = Object.getPrototypeOf(objectToCheck)
      return proto.prototype && proto.prototype.isReactComponent
    })()
  )
}

const isFunctionalComponent = (objectToCheck: any): boolean => {
  return (
    typeof objectToCheck === 'function' &&
    String(objectToCheck).includes('return') &&
    !!FUNCTION_REGEX.exec(String(objectToCheck)) &&
    String(objectToCheck).includes('.createElement')
  )
}

const isExoticComponent = (objectToCheck: any): boolean => {
  return (
    typeof objectToCheck === 'object' &&
    typeof objectToCheck.$$typeof === 'symbol' &&
    ['react.memo', 'react.forward_ref'].includes(objectToCheck.$$typeof.description)
  )
}

const isValidComponent = (objectToCheck: any): boolean => {
  return isClassComponent(objectToCheck) || isFunctionalComponent(objectToCheck) || isExoticComponent(objectToCheck)
}

export { isValidComponent }
