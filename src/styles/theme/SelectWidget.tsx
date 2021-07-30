import { theme as chakraTheme } from '@chakra-ui/react'

function fieldToControlFunction(fn: Function): Function {
  return (props: Record<string, any>) => {
    const { field } = fn(props)
    return { control: field }
  }
}

const sizes = {
  lg: {
    fontSize: 'lg',
    pl: 4,
    pr: 1,
    minHeight: 12,
    borderRadius: 'md',
  },

  md: {
    fontSize: 'md',
    pl: 4,
    pr: 1,
    minHeight: 10,
    borderRadius: 'md',
  },

  sm: {
    fontSize: 'sm',
    pl: 3,
    pr: 1,
    minHeight: 8,
    borderRadius: 'sm',
  },

  xs: {
    fontSize: 'xs',
    pl: 2,
    pr: 1,
    minHeight: 6,
    borderRadius: 'sm',
  },
}

type Sizes = keyof typeof sizes

export const SelectWidget = {
  part: ['control', 'dropdownIndicator'],
  defaultProps: chakraTheme.components.Input.defaultProps,
  variants: {
    outline: fieldToControlFunction(chakraTheme.components.Input.variants.outline),
    filled: fieldToControlFunction(chakraTheme.components.Input.variants.filled),
    flushed: fieldToControlFunction(chakraTheme.components.Input.variants.flushed),
    unstyled: { control: chakraTheme.components.Input.variants.unstyled.field },
  },
  baseStyle: {
    control: chakraTheme.components.Input.baseStyle.field,
    dropdownIndicator: {
      color: 'gray.700',
      w: 5,
      h: 'auto',
    },
    multiValueContainer: {
      bgColor: 'blackAlpha.100',
      borderRadius: 'md',
      '& + &': {
        ml: 2,
      },
    },
    multiValueLabel: {
      fontSize: 'md',
      fontWeight: '400',
    },
    multiValueRemove: {
      borderRadius: 'md',
    },
  },
  sizes: Object.fromEntries(Object.entries(sizes).map(([key]) => [key, { control: sizes[key as Sizes] }])),
}
