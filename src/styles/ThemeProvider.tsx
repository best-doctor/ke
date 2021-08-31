import { ChakraProvider, extendTheme, Theme, theme as chakraTheme } from '@chakra-ui/react'
import type { ChakraProviderProps } from '@chakra-ui/provider'

import React from 'react'
import { SelectWidget } from './theme/SelectWidget'
import { ReadOnlyWidget } from './theme/ReadOnlyWidget'
import { LinkWidget } from './theme/LinkWidget'
import { ChipInput } from './theme/ChipInput'

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
    SelectWidget,
    ReadOnlyWidget,
    LinkWidget,
    ChipInput,
  },
}) as Theme

interface ThemeProviderProps extends Omit<ChakraProviderProps, 'theme'> {
  theme?: Theme
}

export const ThemeProvider = ({ theme = defaultTheme, ...props }: ThemeProviderProps): JSX.Element => (
  <ChakraProvider {...props} theme={theme} />
)
