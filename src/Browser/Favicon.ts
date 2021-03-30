export const getFaviconElement = (): HTMLLinkElement => {
  let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement
  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    link.id = 'favicon-element'
    document.getElementsByTagName('head')[0].appendChild(link)
  }
  return link
}

export const setFavicon = (source: string): void => {
  const link = getFaviconElement()
  link.href = source
}
