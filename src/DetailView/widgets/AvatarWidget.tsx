import React from 'react'

import { Avatar } from '@chakra-ui/core'
import { WidgetWrapper } from '../../common/components/WidgetWrapper'

type AvatarWidgetProps = {
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
const AvatarWidget = ({ helpText, style, name, description }: AvatarWidgetProps): JSX.Element => (
  <WidgetWrapper name={name} style={style} helpText={helpText} description={description}>
    <Avatar name="BD" src="" />
  </WidgetWrapper>
)

export { AvatarWidget }
