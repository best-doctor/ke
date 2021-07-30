import { ComponentStyleConfig } from '@chakra-ui/react'

export const ReadOnlyWidget: ComponentStyleConfig = {
  baseStyle: {
    display: 'flex',
    alignItems: 'center',

    width: '100%',
    minWidth: 0,
    outline: 0,
    position: 'relative',
    transitionProperty: 'common',
    transitionDuration: 'normal',
    border: '1px solid',
    borderColor: 'inherit',
  },
  sizes: {
    lg: {
      fontSize: 'lg',
      px: 4,
      minHeight: 12,
      borderRadius: 'md',
    },

    md: {
      fontSize: 'md',
      px: 4,
      minHeight: 10,
      borderRadius: 'md',
    },

    sm: {
      fontSize: 'sm',
      px: 3,
      minHeight: 8,
      borderRadius: 'sm',
    },

    xs: {
      fontSize: 'xs',
      px: 2,
      minHeight: 6,
      borderRadius: 'sm',
    },
  },

  variants: {
    default: {
      color: 'black',
    },
    disabled: {
      color: 'blackAlpha.700',
      borderColor: 'gray.200',
      _hover: {
        borderColor: 'gray.300',
      },
    },
  },

  defaultProps: {
    variant: 'disabled',
    size: 'md',
  },
}
