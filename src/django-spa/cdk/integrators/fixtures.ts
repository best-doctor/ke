import { fc } from 'jest-fast-check'

export const innersArbitrary = fc
  .array(fc.lorem({ mode: 'words' }))
  .map((keys) => Object.fromEntries(keys.map((key) => [key, jest.fn()])))

export const rootResultArbitrary = fc.lorem()
