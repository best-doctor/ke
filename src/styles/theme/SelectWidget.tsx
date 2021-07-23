import { theme as chakraTheme } from '@chakra-ui/react'

function fieldToControlFunction(fn: Function): Function {
  return (props: Record<string, any>) => {
    const { field } = fn(props)
    return { control: field }
  }
}

export const SelectWidgtet = {
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
  },
  sizes: Object.fromEntries(
    Object.entries(chakraTheme.components.Input.sizes).map(([key, { field, ...rest }]) => [
      key,
      { control: field, ...rest },
    ])
  ),
}
