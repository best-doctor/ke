import React, { ElementType, PropsWithChildren, FunctionComponentElement } from 'react'
import { Box, FormLabel } from '@chakra-ui/core'

import type { NodeProps } from './types'
import { useNodeState } from './Forms.context'
import { LayoutComponent, makeSlots, makeWithLayout, SlotsData } from '../Layouts'
import { MessagesBlock } from '../../common/components/MessagesBlock'

const DefaultFormFieldLayout = makeSlots(
  {
    Label: ({ children }: PropsWithChildren<{}>) => <>{children}</>,
    Value: ({ children }: PropsWithChildren<{}>) => <>{children}</>,
    Errors: ({ children }: PropsWithChildren<{}>) => <>{children}</>,
  },
  (slotElements) => (
    <Box>
      <FormLabel mt={5}>{slotElements.Label}</FormLabel>
      <Box>{slotElements.Value}</Box>
      <Box>{slotElements.Errors}</Box>
    </Box>
  )
)

export function FormField<T, P extends ControlProps<T>>({
  name,
  as,
  label,
  layout = DefaultFormFieldLayout,
  ...other
}: FieldProps<T, P>): FunctionComponentElement<FieldProps<T, P>> {
  const [field, setField] = useNodeState(name)

  const messages: string[] = []

  // Don't found why, but type declaration necessary here https://github.com/microsoft/TypeScript/issues/28631#issuecomment-477240245
  const ValueComponent: ElementType = as

  const FieldComponent = makeWithLayout(
    () => ({
      Label: label,
      Value: <ValueComponent value={field} onChange={setField} {...other} />,
      Errors: <MessagesBlock messages={messages} messageType="error" />,
    }),
    layout
  )

  return <FieldComponent />
}

interface ControlProps<T> {
  value: T
  onChange: (val: T) => void
}

interface BaseFieldProps<T, P> extends NodeProps {
  as: ElementType<P & ControlProps<T>>
  label?: string
  layout?: LayoutComponent<
    SlotsData<{
      Label: LayoutComponent<string | JSX.Element>
      Value: LayoutComponent<string | JSX.Element>
      Errors: LayoutComponent<string | JSX.Element>
    }>
  >
}

type FieldProps<T, P> = BaseFieldProps<T, P> & Omit<P, keyof BaseFieldProps<T, P> | keyof ControlProps<T>>
