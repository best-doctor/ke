import { getFaviconElement, setFavicon } from './Favicon'

afterEach(() => {
  document.getElementsByTagName('html')[0].innerHTML = ''
})

test('Get existing favicon element', () => {
  const link = document.createElement('link')
  link.rel = 'icon'
  link.id = 'some-id'
  document.getElementsByTagName('head')[0].appendChild(link)

  const resultElement = getFaviconElement()

  expect(resultElement.id).toBe('some-id')
})

test('Get new favicon element', () => {
  const resultElement = getFaviconElement()

  expect(resultElement.id).toBe('favicon-element')
})

test('Set favicon', () => {
  const link = getFaviconElement()
  link.href = 'helloWorld.png'

  setFavicon('/some/link/to/img.png')

  expect(link.href).toBe('http://localhost/some/link/to/img.png')
})
