import { ComponentStyleConfig } from '@chakra-ui/react'

export const LinkWidget: ComponentStyleConfig = {
  parts: ['widgetWrapper', 'labelWrapper', 'label', 'description', 'controlWrapper', 'control'],
  baseStyle: {
    widgetWrapper: {
      pt: 1,
    },
    labelWrapper: {
      mt: 5,
      alignItems: 'center',
      flexShrink: 0,
    },
    description: {
      mt: 2,
      fontSize: 'sm',
      lineHeight: '5',
      color: 'gray.500',
    },
  },

  variants: {
    default: {
      controlWrapper: {
        borderWidth: '1px',
        borderRadius: '3px',
        borderColor: '#cbd5e0',
        padding: '5.4px',
      },
      control: {
        color: 'brand.500',
      },
    },
    outline: {
      label: {
        color: 'blackAlpha.600',
      },
      controlWrapper: {
        mt: 0,
        borderWidth: 0,
        padding: 0,
      },
      control: {
        border: '0px',
        padding: 0,
        paddingInlineStart: 0,
        paddingInlineEnd: 0,
        color: 'blue.500',
      },
    },
  },

  defaultProps: {
    variant: 'outline',
  },
}
