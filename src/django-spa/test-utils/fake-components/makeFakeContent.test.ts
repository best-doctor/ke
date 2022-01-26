import { testProp } from 'jest-fast-check'

import { componentNameArbitrary, orderedPropsArbitrary, propsArbitrary } from './fixtures'
import { makeFakeContent } from './makeFakeContent'

testProp('Результат стабилен', [componentNameArbitrary, propsArbitrary], (componentName, props) => {
  const originContent = makeFakeContent(componentName, props)
  const fromCopyContent = makeFakeContent(componentName, { ...props })

  expect(originContent).toBe(fromCopyContent)
})

testProp('В результате есть имя компонента', [componentNameArbitrary, propsArbitrary], (componentName, props) => {
  const content = makeFakeContent(componentName, props)

  expect(content).toContain(componentName)
})

testProp('В результате учтены props', [componentNameArbitrary, orderedPropsArbitrary], (componentName, props) => {
  const content = makeFakeContent(componentName, props)

  expect(content).toContain(JSON.stringify(props))
})
