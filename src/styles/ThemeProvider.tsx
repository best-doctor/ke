import { ChakraProvider, ChakraProviderProps, extendTheme, Theme, theme as chakraTheme } from '@chakra-ui/react'

import React from 'react'

export const defaultTheme = extendTheme({
  colors: {
    brand: chakraTheme.colors.teal,
  },
})

interface ThemeProviderProps extends Omit<ChakraProviderProps, 'theme'> {
  theme?: Theme
}

export const ThemeProvider = ({ theme = defaultTheme, ...props }: ThemeProviderProps): JSX.Element => (
  <ChakraProvider {...props} theme={theme} />
)
