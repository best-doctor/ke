import { ComponentStyleConfig } from '@chakra-ui/react'

export const ReadOnlyWidget: ComponentStyleConfig = {
  parts: ['widgetWrapper', 'labelWrapper', 'label', 'description', 'controlWrapper', 'control'],
  baseStyle: {
    widgetWrapper: {
      pt: 2,
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
    controlWrapper: {
      mt: 2,
    },
    control: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',

      width: '100%',
      minWidth: 0,
      outline: 0,
      position: 'relative',
      transitionProperty: 'common',
      transitionDuration: 'normal',
      border: '1px solid',
      borderColor: 'inherit',
      padding: '5.4px',
      whiteSpace: 'pre-line',
    },
  },
  sizes: {
    lg: {
      control: {
        fontSize: 'lg',
        px: 4,
        minHeight: 12,
        borderRadius: 'md',
      },
    },
    md: {
      control: {
        fontSize: 'md',
        px: 4,
        minHeight: 10,
        borderRadius: 'md',
      },
    },
    sm: {
      control: {
        fontSize: 'sm',
        px: 3,
        minHeight: 8,
        borderRadius: 'sm',
      },
    },
    xs: {
      control: {
        fontSize: 'xs',
        px: 2,
        minHeight: 6,
        borderRadius: 'sm',
      },
    },
  },

  variants: {
    default: {
      control: {
        color: 'black',
      },
    },
    disabled: {
      control: {
        color: 'gray.700',
        borderColor: 'gray.200',
        _hover: {
          borderColor: 'gray.300',
        },
      },
    },
    outline: {
      label: {
        color: 'blackAlpha.600',
      },
      controlWrapper: {
        mt: 0,
      },
      control: {
        border: '0px',
        padding: 0,
        paddingInlineStart: 0,
        paddingInlineEnd: 0,
      },
    },
  },

  defaultProps: {
    variant: 'outline',
    size: 'md',
  },
}
