/* eslint-disable react/jsx-props-no-spreading */
/* Это legacy */
import React from 'react'

import { Avatar } from '@chakra-ui/react'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'
import { TestIdGenerationProps, useCreateTestId } from '../../django-spa/aspects/test-id/TestIdProvider'

interface AvatarWidgetProps extends Omit<TestIdGenerationProps, 'name'> {
  name: string
  helpText: string
  style?: object
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
  const { helpText, style, name, description } = props
  const { getDataTestId } = useCreateTestId()
  return (
    <WidgetWrapper name={name} style={style} helpText={helpText} description={description} {...getDataTestId(props)}>
      <Avatar name="BD" src="" />
    </WidgetWrapper>
  )
}

export { AvatarWidget }
