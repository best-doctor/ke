import { ChakraProvider, ChakraProviderProps, extendTheme, Theme, theme as chakraTheme } from '@chakra-ui/react'

import React from 'react'
import { SelectWidgtet } from './theme/SelectWidget'

export const defaultTheme = extendTheme({
  colors: {
    brand: chakraTheme.colors.teal,
  },
  components: {
    Label: {
      part: ['label', 'asterisk'],
      baseStyle: {
        label: {
          fontWeight: '500',
        },
        asterisk: {
          color: '#E53E3E',
        },
      },
    },
    SelectWidget: SelectWidgtet,
  },
})

interface ThemeProviderProps extends Omit<ChakraProviderProps, 'theme'> {
  theme?: Theme
}

export const ThemeProvider = ({ theme = defaultTheme, ...props }: ThemeProviderProps): JSX.Element => (
  <ChakraProvider {...props} theme={theme} />
)
