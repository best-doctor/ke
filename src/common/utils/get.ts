/*
Extracted from lodash, but simplified
 */
export function get(obj: DataRecord, path: string | string[], defaultValue?: unknown): unknown {
  const result = obj == null ? undefined : baseGet(obj, path)
  return result === undefined ? defaultValue : result
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DataRecord = Record<string, any>

const rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g
const reEscapeChar = /\\(\\)?/g

const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/
const reIsPlainProp = /^\w*$/

function baseGet(obj: DataRecord, path: string | string[]): unknown {
  const castedPath = castPath(path, obj)
  const { length } = castedPath

  let index = 0
  let root = obj
  while (root && index < length) {
    root = root[castedPath[index++]]
  }
  return index && index === length ? root : undefined
}

function castPath(value: string | string[], obj: object): string[] {
  if (Array.isArray(value)) {
    return value
  }
  return isKey(value, obj) ? [value] : stringToPath(value)
}

function isKey(value: string, obj: object): boolean {
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || (obj != null && value in Object(obj))
}

function stringToPath(str: string): string[] {
  const result = []
  if (str.charCodeAt(0) === 46 /* . */) {
    result.push('')
  }
  str.replace(rePropName, (match, number, quote, subString): string => {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : number || match)
    return ''
  })
  return result
}
