// This shit is stolen from several libs like react-table
// because I could not find a normal way in the official documentation!!!

const isClassComponent = (objectToCheck: any): boolean =>
  typeof objectToCheck === 'function' &&
  (() => {
    const proto: { prototype?: { isReactComponent: boolean } } = Object.getPrototypeOf(objectToCheck)
    return proto.prototype?.isReactComponent || false
  })()

const isFunctionalComponent = (objectToCheck: any): boolean =>
  typeof objectToCheck === 'function' &&
  String(objectToCheck).includes('return') &&
  String(objectToCheck).includes('.createElement')

const isExoticComponent = (objectToCheck: { $$typeof?: { description?: string } }): boolean =>
  typeof objectToCheck === 'object' &&
  typeof objectToCheck.$$typeof === 'symbol' &&
  ['react.memo', 'react.forward_ref'].includes(objectToCheck?.$$typeof?.description || '-')

const isValidComponent = (objectToCheck: object): boolean =>
  isClassComponent(objectToCheck) || isFunctionalComponent(objectToCheck) || isExoticComponent(objectToCheck)

export { isValidComponent }
