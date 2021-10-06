import React from 'react'
import { Box } from '@chakra-ui/react'

import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'

import type { Accessor, WidgetProps } from '../../typing'
import { getAccessor, getCopyHandler } from '../utils/dataAccess'
import { ValueValidationWrapper } from '../../common/components/ValueValidationWrapper'
import { useCreateTestId } from '../../django-spa/aspects'

const TextValidationWidget = (props: WidgetProps & { validateValue?: Accessor<any> }): JSX.Element => {
  const {
    containerStore,
    style,
    helpText,
    description,
    useClipboard,
    copyValue,
    notifier,
    name,
    provider,
    mainDetailObject,
    notBlockingValidators = [],
    blockingValidators = [],
    validateValue,
  } = props

  const context = containerStore.getState()
  const { content } = useWidgetInitialization({ ...props, context })
  const value = getAccessor(validateValue, mainDetailObject, context)

  const { getDataTestId } = useCreateTestId()
  return (
    <WidgetWrapper
      name={name}
      style={style}
      helpText={helpText}
      description={description}
      useClipboard={useClipboard}
      copyValue={getCopyHandler(content, copyValue)}
      notifier={notifier}
      {...getDataTestId(props)}
    >
      <ValueValidationWrapper
        notBlockingValidators={notBlockingValidators}
        blockingValidators={blockingValidators}
        provider={provider}
        detailObject={mainDetailObject}
        context={context as Record<string, unknown>}
        value={value}
      >
        <Box borderWidth="1px" borderRadius="3px" borderColor="#cbd5e0" padding="5.4px" whiteSpace="pre-line">
          {content || '\u00a0'}
        </Box>
      </ValueValidationWrapper>
    </WidgetWrapper>
  )
}

export { TextValidationWidget }
