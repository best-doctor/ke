import React from 'react'

import { Avatar } from '@chakra-ui/react'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { useTestId } from '../../django-spa/aspects/test-id'
import { TestIdGenerationProps } from '../../django-spa/aspects/test-id/hooks/useTestId'

interface AvatarWidgetProps extends Omit<TestIdGenerationProps, 'name'> {
  name: string
  helpText: string
  style: object
  description?: string | JSX.Element
}

/**
 * Render initials "BD" styled like avatar image
 *
 * @param helpText - label
 * @param style - CSSProperties data
 * @param name - name-attribute
 * @param description - description
 */
const AvatarWidget = (props: AvatarWidgetProps): JSX.Element => {
  const dataTestId = useTestId(props)
  const { helpText, style, name, description } = props
  return (
    <WidgetWrapper data-test-id={dataTestId} name={name} style={style} helpText={helpText} description={description}>
      <Avatar name="BD" src="" />
    </WidgetWrapper>
  )
}

export { AvatarWidget }
