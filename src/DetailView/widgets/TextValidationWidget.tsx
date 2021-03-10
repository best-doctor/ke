import React from 'react'
import { Text } from '@chakra-ui/core'

import { useWidgetInitialization } from '../../common/hooks/useWidgetInitialization'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'

import type { Accessor, WidgetProps } from '../../typing'
import { getAccessor, getCopyHandler } from '../utils/dataAccess'
import { ValueValidationWrapper } from '../../common/components/ValueValidationWrapper'
import { StyledTextWidget } from './TextWidget'

const TextValidationWidget = (props: WidgetProps & { validateValue?: Accessor<any> }): JSX.Element => {
  const {
    containerStore,
    style,
    helpText,
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

  return (
    <WidgetWrapper
      name={name}
      style={style}
      helpText={helpText}
      useClipboard={useClipboard}
      copyValue={getCopyHandler(content, copyValue)}
      notifier={notifier}
    >
      <ValueValidationWrapper
        notBlockingValidators={notBlockingValidators}
        blockingValidators={blockingValidators}
        provider={provider}
        detailObject={mainDetailObject}
        value={value}
      >
        <StyledTextWidget>
          <Text>{content || '\u00a0'}</Text>
        </StyledTextWidget>
      </ValueValidationWrapper>
    </WidgetWrapper>
  )
}

export { TextValidationWidget }
