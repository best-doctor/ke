import * as React from 'react'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'

import { LayoutComposer } from './LayoutComposer'

export const App = (): JSX.Element => (
  <ThemeProvider>
    <CSSReset />
    <LayoutComposer />
  </ThemeProvider>
)
