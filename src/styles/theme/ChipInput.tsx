import { ComponentStyleConfig } from '@chakra-ui/react'

export const ChipInput: ComponentStyleConfig = {
  parts: ['container', 'input', 'chip', 'chipLabel'],
  baseStyle: {
    container: {
      position: 'relative',

      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      width: '100%',
      minWidth: 0,

      outline: 0,
      border: '1px solid',
      borderColor: 'inherit',
      bg: 'inherit',
      borderRadius: 'md',

      py: 0.5,
      px: 1,
      minH: 10,

      _hover: {
        borderColor: 'gray.300',
      },
      _readOnly: {
        boxShadow: 'none !important',
        userSelect: 'all',
      },
      _disabled: {
        cursor: 'not-allowed',
      },
      _invalid: {
        borderColor: 'red.500',
        boxShadow: `0 0 0 1px red.500`,
      },
      _focus: {
        zIndex: 1,
        borderColor: 'blue.500',
        boxShadow: `0 0 0 1px blue.500`,
      },
    },
    input: {
      transitionProperty: 'common',
      transitionDuration: 'normal',
      appearance: 'none',
      width: '100%',
      minWidth: 0,
      outline: 0,
    },

    chip: {
      m: 0.5,
      backgroundColor: 'blackAlpha.100',
    },
    chipLabel: {
      color: 'gray.700',
      fontSize: 'md',
      fontWeight: 400,
    },
  },
}
