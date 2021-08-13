export function concatPath(base: string, lookupField?: string | number): string {
  let url = base
  if (!base.endsWith('/')) {
    url = base.concat('/')
  }
  if (typeof lookupField !== 'undefined') {
    let param = lookupField.toString()
    if (param.startsWith('/')) {
      param = param.slice(1)
    }
    url = url.concat(param)
  }
  if (!url.endsWith('/')) {
    url = url.concat('/')
  }
  return url
}
